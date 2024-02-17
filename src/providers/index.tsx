import { ReactNode } from "react";
import { PlayerProvider } from "./Players";
import { DashboardProvider } from "./Dashboard";
import { EventsProvider } from "./Events";
import { ScoreProvider } from "./Scores";
import { EventProvider } from "./Event";

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return (
    <PlayerProvider>
      <EventsProvider>
        <EventProvider>
          <ScoreProvider>
            <DashboardProvider>{children}</DashboardProvider>
          </ScoreProvider>
        </EventProvider>
      </EventsProvider>
    </PlayerProvider>
  );
};
