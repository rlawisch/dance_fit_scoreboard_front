import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import {
  ChevronIcon,
  DynamicEventWrapper,
  GlobalContainer,
  NavigationContainer,
  NavigationHeaderWrapper,
  NavigationSelector,
  NavigationTitle,
  Title,
} from "../../../styles/global";
import Button from "../../../components/Button";
import RankingGeneral from "./RankingGeneral";
import RankingDouble from "./RankingDouble";
import RankingSingle from "./RankingSingle";
import SongList from "./SongList";
import PlayerList from "./PlayerList";
import { useEnrollments } from "../../../providers/Enrollments";
import { usePlayer } from "../../../providers/Players";
import RankingByMusic from "./RankingByMusic";
import RankingGeneralNoBar from "./RankingGeneralNoBar";
import RankingSingleNoBar from "./RankingSingleNoBar";
import RankingDoubleNoBar from "./RankingDoubleNoBar";
import RankingByMusicNoBar from "./RankingByMusicNoBar";

interface EventType_DynamicProps {}

const EventType_Dynamic: FunctionComponent<EventType_DynamicProps> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const { eventData, getEventData } = useEvents();

  const { decodedPlayerInfo } = usePlayer();

  const { createEnrollment } = useEnrollments();

  const [isRankingsOpen, setRankingsOpen] = useState(false);

  const [isRankingsNoBarOpen, setRankingsNoBarOpen] = useState(false);

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  const [selectedView, setSelectedView] = useState("generalRanking");

  const handleView = (view: string) => {
    setSelectedView(view);
  };

  return (
    <GlobalContainer>
      <DynamicEventWrapper>
        <Button onClick={() => navigate("/dashboard/events")}>Voltar</Button>

        <Title>{!!eventData && eventData.name}</Title>

        {eventData?.players?.some(
          (player) => player.player_id === decodedPlayerInfo.player_id
        ) ? (
          <></>
        ) : (
          <Button
            onClick={() =>
              createEnrollment(
                Number(decodedPlayerInfo.player_id),
                Number(event_id)
              )
            }
          >
            Inscrição
          </Button>
        )}

        <NavigationHeaderWrapper>
        <NavigationTitle onClick={() => setRankingsOpen(!isRankingsOpen)}>
            RANKING OFICIAL <ChevronIcon size={20} open={isRankingsOpen} />
          </NavigationTitle>

          <NavigationContainer open={isRankingsOpen}>
            <NavigationSelector
              isSelected={selectedView === "generalRanking"}
              onClick={() => handleView("generalRanking")}
            >
              Geral
            </NavigationSelector>

            <NavigationSelector
              isSelected={selectedView === "singleRanking"}
              onClick={() => handleView("singleRanking")}
            >
              Single
            </NavigationSelector>

            <NavigationSelector
              isSelected={selectedView === "doubleRanking"}
              onClick={() => handleView("doubleRanking")}
            >
              Double
            </NavigationSelector>

            <NavigationSelector
              isSelected={selectedView === "rankingByMusic"}
              onClick={() => handleView("rankingByMusic")}
            >
              Por Música
            </NavigationSelector>
          </NavigationContainer>

          <NavigationTitle
            onClick={() => setRankingsNoBarOpen(!isRankingsNoBarOpen)}
          >
            RANKING NO BAR <ChevronIcon size={20} open={isRankingsNoBarOpen} />
          </NavigationTitle>

          <NavigationContainer open={isRankingsNoBarOpen}>
            <NavigationSelector
              isSelected={selectedView === "generalRankingNoBar"}
              onClick={() => handleView("generalRankingNoBar")}
            >
              Geral
            </NavigationSelector>

            <NavigationSelector
              isSelected={selectedView === "singleRankingNoBar"}
              onClick={() => handleView("singleRankingNoBar")}
            >
              Single
            </NavigationSelector>

            <NavigationSelector
              isSelected={selectedView === "doubleRankingNoBar"}
              onClick={() => handleView("doubleRankingNoBar")}
            >
              Double
            </NavigationSelector>
            <NavigationSelector
              isSelected={selectedView === "rankingByMusicNoBar"}
              onClick={() => handleView("rankingByMusicNoBar")}
            >
              Por Música
            </NavigationSelector>
          </NavigationContainer>

          <NavigationSelector
            isSelected={selectedView === "songListManagement"}
            onClick={() => handleView("songListManagement")}
          >
            Lista de Músicas
          </NavigationSelector>

          <NavigationSelector
            isSelected={selectedView === "playerList"}
            onClick={() => handleView("playerList")}
          >
            Lista de Jogadores
          </NavigationSelector>
        </NavigationHeaderWrapper>

        {selectedView === "generalRanking" && <RankingGeneral />}
        {selectedView === "singleRanking" && <RankingSingle />}
        {selectedView === "doubleRanking" && <RankingDouble />}
        {selectedView === "rankingByMusic" && <RankingByMusic />}

        {selectedView === "generalRankingNoBar" && <RankingGeneralNoBar />}
        {selectedView === "singleRankingNoBar" && <RankingSingleNoBar />}
        {selectedView === "doubleRankingNoBar" && <RankingDoubleNoBar />}
        {selectedView === "rankingByMusicNoBar" && <RankingByMusicNoBar />}

        {selectedView === "songListManagement" && <SongList />}
        {selectedView === "playerList" && <PlayerList />}
      </DynamicEventWrapper>
    </GlobalContainer>
  );
};

export default EventType_Dynamic;
