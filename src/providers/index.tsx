import { ReactNode } from "react";
import { PlayerProvider } from "./Players";
import { DashboardProvider } from "./Dashboard";
import { EventsProvider } from "./Events";
import { ScoreProvider } from "./Scores";
import { CategoryProvider } from "./Category";
import { PhasesProvider } from "./Phases";
import { MusicsProvider } from "./Musics";

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return (
    <PlayerProvider>
      <EventsProvider>
        <CategoryProvider>
          <PhasesProvider>
            <MusicsProvider>
              <ScoreProvider>
                <DashboardProvider>{children}</DashboardProvider>
              </ScoreProvider>
            </MusicsProvider>
          </PhasesProvider>
        </CategoryProvider>
      </EventsProvider>
    </PlayerProvider>
  );
};
