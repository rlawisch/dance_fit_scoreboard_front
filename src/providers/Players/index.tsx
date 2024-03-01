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
  playerLogin: (formData: ILogin) => void;
  playerSignup: (formData: ISignup) => void;
  playerLogout: () => void;
  hasAdminRights: () => void;
  hasValidSession: () => Promise<boolean>;
  getPlayerData: () => void;
  uploadProfilePicture: (formData: FormData) => void;
  isUploading: boolean;
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

  const [playerData, setPlayerData] = useState<IPlayer>();

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

      if (jwtPayload.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/dashboard/home");
      }
    } catch (err: any) {
      toast.error("Usuário ou senha incorretos");
    }
  };

  const playerSignup = async (formData: ISignup) => {
    try {
      await api.post("/players", formData);
      toast("Conta criada com sucesso, agora você pode fazer o Login!");
      navigate("/login");
    } catch (err: any) {
      console.log(err);
    }
  };

  const playerLogout = async () => {
    hasValidSession()

    try {
      await api.delete("/auth/logout", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
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
      toast("Até a próxima!");
    } catch (err: any) {
      console.log(err);
    }
  };

  const getPlayerData = async () => {
    hasValidSession()

    try {
      const res = await api.get(`/players/${decodedPlayerInfo.player_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      setPlayerData(res.data);
    } catch (err: any) {
      console.log(err);
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
      console.log(res.data);
    } catch (err: any) {
      toast.error("Algo deu errado");
      console.log(err);
    }
  };

  const hasValidSession = async () => {
    try {
      const res = await api.get("/auth/session", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.data === true) {
        return true;
      }
    } catch (err: any) {
      if (err.response.data.message === "Invalid token") {
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
        toast("Token inválido por favor faça o Login novamente");
      } else if (err.response.data.message === "Session expired") {
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
        toast("Sua sessão expirou, por favor faça o Login novamente");
      }
      return false;
    }
    return false;
  };

  const hasAdminRights = async () => {
    try {
      const res = await api.get("/auth/admin", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.data === true) {
        return true;
      } else {
        toast.error("Você não tem permissão para acessar este recurso!");
        return false;
      }
    } catch (err: any) {
      if (err.response.data.message === "Invalid token") {
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
        toast("Token inválido por favor faça o Login novamente");
      } else if (err.response.data.message === "Session expired") {
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
        toast("Sua sessão expirou, por favor faça o Login novamente");
      }
      return false;
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        accToken,
        decodedPlayerInfo,
        playerData,
        playerLogin,
        playerSignup,
        playerLogout,
        hasAdminRights,
        hasValidSession,
        getPlayerData,
        uploadProfilePicture,
        isUploading,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
