import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { ILogin, ISignup } from "../../types/form-types";
import { IPlayer } from "../../types/entity-types";

export interface IPlayerContext {
  accToken: string;
  decodedPlayerInfo: JwtPayload;
  playerData: IPlayer | undefined;
  players: IPlayer[] | undefined;
  playerRefreshTrigger: boolean;
  isUploading: boolean;
  isAdmin: () => boolean;
  isLoggedIn: () => boolean;
  getPlayers: () => void;
  getPlayerData: () => void;
  playerLogin: (formData: ILogin) => void;
  playerSignUp: (formData: ISignup) => void;
  publicPlayerSignUp: (formData: ISignup) => void;
  playerLogout: (message: string) => void;
  uploadProfilePicture: (formData: FormData) => void;
}

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [accToken, setAccToken] = useState(
    localStorage.getItem("@DFS/PlayerToken") || ""
  );

  const currentPlayer = localStorage.getItem("@DFS/Player") || "{}";

  const [decodedPlayerInfo, setDecodedPlayerInfo] = useState<JwtPayload>(
    JSON.parse(currentPlayer)
  );

  const [players, setPlayers] = useState<IPlayer[]>();

  const [playerData, setPlayerData] = useState<IPlayer>();

  const [playerRefreshTrigger, setPlayerRefresgTrigger] =
    useState<boolean>(false);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const playerLogin = async (formData: ILogin) => {
    try {
      const res = await api.post("/auth/login", formData);
      const access_token: string = res.data.access_token;
      setAccToken(access_token);

      const jwtPayload = jwtDecode(access_token);
      setDecodedPlayerInfo(jwtPayload);

      localStorage.setItem("@DFS/PlayerToken", access_token);
      localStorage.setItem("@DFS/Player", JSON.stringify(jwtPayload));

      toast("Sentimos sua falta!");

      navigate("/udashboard/home");
    } catch (err: any) {
      toast.error("Usuário ou senha incorretos");
    }
  };

  const isAdmin = () => {
    return decodedPlayerInfo?.role === "admin";
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("@DFS/PlayerToken");

    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token) as { exp: number };
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp > currentTime) {
        return true
      }

      else {
        playerLogout("Token inválido, fazer Login novamente!")
      }
     
      return decodedToken.exp > currentTime;

    } catch (error) {

      return false;
    }
  };

  const playerSignUp = async (formData: ISignup) => {
    try {
      await api.post("/players", formData);
      setPlayerRefresgTrigger(!playerRefreshTrigger);
      toast("Jogador cadastrado com sucesso!");
    } catch (err: any) {
      if ((err.response.data.message = "Nickname already in use")) {
        toast.error("Nickname não disponível, por favor escolha outro");
      }
    }
  };

  const publicPlayerSignUp = async (formData: ISignup) => {
    try {
      await api.post("/players", formData);
      setPlayerRefresgTrigger(!playerRefreshTrigger);
      toast("Jogador cadastrado com sucesso! Você já pode fazer o Login!");
      navigate("/login");
    } catch (err: any) {
      if ((err.response.data.message = "Nickname already in use")) {
        toast.error("Nickname não disponível, por favor escolha outro");
      }
    }
  };

  const playerLogout = async (message: string) => {
    try {
      setAccToken("");
      setPlayerData({} as IPlayer);
      setDecodedPlayerInfo({
        nickname: "",
        player_id: "",
        role: "",
        iat: -1,
        exp: -1,
      });
      navigate("/login");
      localStorage.removeItem("@DFS/PlayerToken");
      localStorage.removeItem("@DFS/Player");
      toast(message);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getPlayers = async () => {
    try {
      const res = await api.get(`/players`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      setPlayers(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getPlayerData = async () => {
    try {
      const res = await api.get(`/players/${decodedPlayerInfo.player_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      setPlayerData(res.data);
    } catch (err: any) {
      console.log(err);

      if (err.response && err.response.status === 401) {
        setAccToken("");
        setPlayerData({} as IPlayer);
        setDecodedPlayerInfo({
          nickname: "",
          player_id: "",
          role: "",
          iat: -1,
          exp: -1,
        });
        localStorage.removeItem("@DFS/PlayerToken");
        localStorage.removeItem("@DFS/Player");
        navigate("/login");
      }
    }
  };

  const uploadProfilePicture = async (formData: FormData) => {
    try {
      setIsUploading(true);
      const res = await api.post("/players/profile-picture", formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 201) {
        setIsUploading(false);
        toast.success(
          "Imagem do perfil atualizada, pode demorar alguns momentos até que ela mude"
        );
      } else {
        toast.error("Algo deu errado");
      }
    } catch (err: any) {
      toast.error("Algo deu errado");
      console.log(err);
      setIsUploading(false);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        accToken,
        decodedPlayerInfo,
        players,
        playerData,
        playerRefreshTrigger,
        isUploading,
        isAdmin,
        isLoggedIn,
        getPlayers,
        getPlayerData,
        playerLogin,
        playerSignUp,
        publicPlayerSignUp,
        playerLogout,
        uploadProfilePicture,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
