import { ReactNode } from "react";
import { PlayerProvider } from "./Players";
import { DashboardProvider } from "./Dashboard";

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return (
    <PlayerProvider>
      <DashboardProvider>{children}</DashboardProvider>
    </PlayerProvider>
  );
};
