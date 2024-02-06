import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import { ILogin } from "../../pages/Login/index";
import { ISignup } from "../../pages/SignUp/index";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface IPlayerContext {
  accToken: string;
  playerLogin: (formData: ILogin) => void;
  playerSignup: (formData: ISignup) => void;
}

const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("@DFS/PlayerToken") || "";
  const [accToken, setAccToken] = useState<string>(token);

  const navigate = useNavigate();

  const playerLogin = (formData: ILogin) => {
    api
      .post("/auth/login", formData)
      .then((res) => {
        const { access_token } = res.data;

        setAccToken(access_token);

        localStorage.setItem("@DFS/PlayerToken", JSON.stringify(access_token));
        toast("Sentimos sua falta!")
        navigate("/dashboard");
      })
      .catch((err) => {
        if (!!err) {
					toast.error("Usuário ou senha incorretos")
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

  return (
    <PlayerContext.Provider
      value={{
        accToken,
        playerLogin,
        playerSignup,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
