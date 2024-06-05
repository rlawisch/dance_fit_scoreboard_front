import { ReactNode } from "react";
import { PlayerProvider } from "./Players";
import { DashboardProvider } from "./Dashboard";
import { EventsProvider } from "./Events";
import { ScoreProvider } from "./Scores";
import { CategoryProvider } from "./Category";
import { PhasesProvider } from "./Phases";
import { MusicsProvider } from "./Musics";
import { ComfortLevelProvider } from "./ComfortLevels";
import { SongListProvider } from "./SongLists";
import { EnrollmentsProvider } from "./Enrollments";

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return (
    <PlayerProvider>
      <EventsProvider>
        <CategoryProvider>
          <PhasesProvider>
            <EnrollmentsProvider>
              <ComfortLevelProvider>
                <SongListProvider>
                  <MusicsProvider>
                    <ScoreProvider>
                      <DashboardProvider>{children}</DashboardProvider>
                    </ScoreProvider>
                  </MusicsProvider>
                </SongListProvider>
              </ComfortLevelProvider>
            </EnrollmentsProvider>
          </PhasesProvider>
        </CategoryProvider>
      </EventsProvider>
    </PlayerProvider>
  );
};
