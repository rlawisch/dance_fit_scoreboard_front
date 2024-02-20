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
  playerData: IPlayer | undefined
  playerLogin: (formData: ILogin) => void;
  playerSignup: (formData: ISignup) => void;
  playerLogout: () => void;
  hasAdminRights: () => void;
  hasValidSession: () => boolean;
  getPlayerData: () => void;
}

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accToken, setAccToken] = useState(
    localStorage.getItem("@DFS/PlayerToken") || ""
  );

  const currentPlayer = localStorage.getItem("@DFS/Player") || "{}";
  const [decodedPlayerInfo, setDecodedPlayerInfo] = useState<JwtPayload>(
    JSON.parse(currentPlayer)
  );

  const [playerData, setPlayerData] = useState<IPlayer>();

  const navigate = useNavigate();

  const playerLogin = (formData: ILogin) => {
    api
      .post("/auth/login", formData)
      .then((res) => {
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
      })
      .catch((err) => {
        if (err) {
          toast.error("Usuário ou senha incorretos");
        }
      });
  };

  const playerSignup = (formData: ISignup) => {
    api
      .post("/players", formData)
      .then(() => {
        toast("Conta criada com sucesso, agora você pode fazer o Login!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const playerLogout = () => {
    hasValidSession();

    api
      .delete("/auth/logout", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then(() => {
        setAccToken("");
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPlayerData = () => {
    hasValidSession();

    api
      .get(`/players/${decodedPlayerInfo.player_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        setPlayerData(res.data)
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const hasValidSession = () => {
    api
      .get("/auth/session", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        if (res.data === true) {
          return true;
        }
      })
      .catch((err: any) => {
        if (err.response.data.message === "Invalid token") {
          setAccToken("");
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
          toast(
            "Parece que você fez login em outro dispositivo, para acessar a apliacação no dispositivo atual, faça login novamente"
          );
          return false;
        }

        if (err.response.data.message === "Session expired") {
          setAccToken("");
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
          toast(
            "Parece que sua sessão expirou, por favor, faça o login novamente"
          );
          return false;
        }

        return false;
      });
    return false;
  };

  const hasAdminRights = () => {
    hasValidSession();

    api
      .get("/auth/admin", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        if (res.data === true) {
          navigate("/admin/home");
        } else {
          toast.error("Você não tem permissão para acessar este recurso!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
