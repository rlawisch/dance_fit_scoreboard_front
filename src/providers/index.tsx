import { ReactNode } from "react";
import { PlayerProvider } from "./Players";
import { DashboardProvider } from "./Dashboard";
import { EventsProvider } from "./Events";
import { ScoreProvider } from "./Scores";
import { EventProvider } from "./Event";
import { CategoryProvider } from "./Category";

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return (
    <PlayerProvider>
      <EventsProvider>
        <EventProvider>
          <ScoreProvider>
            <CategoryProvider>
              <DashboardProvider>{children}</DashboardProvider>
            </CategoryProvider>
          </ScoreProvider>
        </EventProvider>
      </EventsProvider>
    </PlayerProvider>
  );
};
