import { ReactNode } from "react";
import { PlayerProvider } from "./Players";
import { DashboardProvider } from "./Dashboard";
import { EventsProvider } from "./Events";
import { ScoreProvider } from "./Scores";
import { EventProvider } from "./Event";
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
        <EventProvider>
          <ScoreProvider>
            <CategoryProvider>
              <PhasesProvider>
                <MusicsProvider>
                  <DashboardProvider>{children}</DashboardProvider>
                </MusicsProvider>
              </PhasesProvider>
            </CategoryProvider>
          </ScoreProvider>
        </EventProvider>
      </EventsProvider>
    </PlayerProvider>
  );
};
