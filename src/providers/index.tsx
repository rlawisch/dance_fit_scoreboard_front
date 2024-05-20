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

interface IAppProvider {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return (
    <PlayerProvider>
      <EventsProvider>
        <CategoryProvider>
          <PhasesProvider>
            <ComfortLevelProvider>
              <SongListProvider>
                <MusicsProvider>
                  <ScoreProvider>
                    <DashboardProvider>{children}</DashboardProvider>
                  </ScoreProvider>
                </MusicsProvider>
              </SongListProvider>
            </ComfortLevelProvider>
          </PhasesProvider>
        </CategoryProvider>
      </EventsProvider>
    </PlayerProvider>
  );
};
