import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JwtPayload, jwtDecode } from "jwt-decode";

export interface IPlayerContext {
  accToken: string;
  decodedPlayerInfo: JwtPayload;
  playerLogin: (formData: ILogin) => void;
  playerSignup: (formData: ISignup) => void;
  playerLogout: () => void;
  hasAdminRights: () => void;
}

export interface ILogin {
  nickname: string;
  password: string;
}

export interface ISignup {
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface IPlayer {
  player_id: string;
  nickname: string;
  password: string;
  role: string;
}

export interface IUnauthorizedException {
  message: string;
  error: string;
  statusCode: number;
}

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [accToken, setAccToken] = useState<string>(localStorage.getItem("@DFS/PlayerToken") || "");

  const currentPlayer = localStorage.getItem("@DFS/Player") || "{}";
  const [decodedPlayerInfo, setDecodedPlayerInfo] = useState<JwtPayload>(
    JSON.parse(currentPlayer)
  );

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
        if (!!err) {
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
        toast("Até a próxima!")
      })
      .catch((err) => {
        console.log(err);
        toast("Até a próxima! ;)");
      });
  };

  const hasAdminRights = () => {
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
        playerLogin,
        playerSignup,
        playerLogout,
        hasAdminRights,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
