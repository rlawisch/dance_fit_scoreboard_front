import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export interface IPlayerContext {
  accToken: string;
  playerLogin: (formData: ILogin) => void;
  playerSignup: (formData: ISignup) => void;
  playerLogout: () => void;
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

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("@DFS/PlayerToken") || "";
  const [accToken, setAccToken] = useState<string>(token);

  const player = localStorage.getItem("@DFS/Player") || "";
  const [playerInfo, setPlayerInfo] = useState(player || {});

  const navigate = useNavigate();

  const playerLogin = (formData: ILogin) => {
    api
      .post("/auth/login", formData)
      .then((res) => {
        const { access_token } = res.data;
        setAccToken(access_token);

        const jwtPayload = jwtDecode(access_token);
        setPlayerInfo(jwtPayload);

        localStorage.setItem("@DFS/PlayerToken", JSON.stringify(access_token));
        localStorage.setItem("@DFS/Player", JSON.stringify(jwtPayload));

        toast("Sentimos sua falta!");
        navigate("/dashboard");
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
    setAccToken("");
    setPlayerInfo({});
    navigate("/login");
    localStorage.removeItem("@DFS/PlayerToken")
    localStorage.removeItem("@DFS/Player")

  };

  return (
    <PlayerContext.Provider
      value={{
        accToken,
        playerLogin,
        playerSignup,
        playerLogout,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
