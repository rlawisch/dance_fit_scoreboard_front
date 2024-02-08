import { ReactNode } from "react";
import { PlayerProvider } from "./Players";
import { DashboardProvider } from "./Dashboard";
import { EventProvider } from "./Events";
import { ScoreProvider } from "./Scores";

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return (
    <PlayerProvider>
      <EventProvider>
        <ScoreProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </ScoreProvider>
      </EventProvider>
    </PlayerProvider>
  );
};
