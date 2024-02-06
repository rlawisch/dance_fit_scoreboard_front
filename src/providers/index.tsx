import { ReactNode } from "react";
import { PlayerProvider } from "./Players";

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return <PlayerProvider>{children}</PlayerProvider>;
};
