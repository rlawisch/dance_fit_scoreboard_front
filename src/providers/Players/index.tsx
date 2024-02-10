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
  adminDashboardAccess: () => void;
  isValidSession: () => void;
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
  const token = localStorage.getItem("@DFS/PlayerToken") || "";
  const [accToken, setAccToken] = useState<string>(token);

  const currentPlayer = localStorage.getItem("@DFS/Player") || "{}";
  const [decodedPlayerInfo, setDecodedPlayerInfo] = useState<JwtPayload>(
    JSON.parse(currentPlayer)
  );

  const navigate = useNavigate();

  const playerLogin = (formData: ILogin) => {
    api
      .post("/auth/login", formData)
      .then((res) => {
        const token: string = res.data.access_token;
        setAccToken(token);

        const jwtPayload = jwtDecode(token);
        setDecodedPlayerInfo(jwtPayload);

        localStorage.setItem("@DFS/PlayerToken", JSON.stringify(token));
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

    isValidSession()

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
      })
      .catch((err) => {
        console.log(err);
        toast("Até a próxima! ;)");
      });
  };

  const isValidSession = () => {
    api
      .get("/auth/session", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        const response = res.data;

        if (response) {
          return true;
        } else if (response.message === "Session expired") {
          toast.error("Sua sessão expirou, faça login novamente");
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
        }
      });
  };

  const adminDashboardAccess = () => {
    api
      .get("/auth/admin")
      .then((res) => {
        if (res) {
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
        adminDashboardAccess,
        isValidSession,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
