import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import {
  DynamicEventWrapper,
  GlobalContainer,
  NavigationHeaderWrapper,
  NavigationSelector,
  Title,
} from "../../../styles/global";
import Button from "../../../components/Button";
import GeneralRanking from "./GeneralRanking";
import SongList from "./SongList";
import DoubleRanking from "./DoubleRanking";
import SingleRanking from "./SingleRanking";
import PlayerList from "./PlayerList";
import { useEnrollments } from "../../../providers/Enrollments";
import { usePlayer } from "../../../providers/Players";

interface EventType_DynamicProps {}

const EventType_Dynamic: FunctionComponent<EventType_DynamicProps> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const { eventData, getEventData } = useEvents();

  const { decodedPlayerInfo } = usePlayer();

  const { createEnrollment } = useEnrollments();

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
          <NavigationSelector
            isSelected={selectedView === "generalRanking"}
            onClick={() => handleView("generalRanking")}
          >
            Ranking Geral
          </NavigationSelector>

          <NavigationSelector
            isSelected={selectedView === "singleRanking"}
            onClick={() => handleView("singleRanking")}
          >
            Ranking Single
          </NavigationSelector>

          <NavigationSelector
            isSelected={selectedView === "doubleRanking"}
            onClick={() => handleView("doubleRanking")}
          >
            Ranking Double
          </NavigationSelector>

          <NavigationSelector
            isSelected={selectedView === "songListManagement"}
            onClick={() => handleView("songListManagement")}
          >
            Músicas
          </NavigationSelector>

          <NavigationSelector
            isSelected={selectedView === "playerList"}
            onClick={() => handleView("playerList")}
          >
            Jogadores
          </NavigationSelector>

          <NavigationSelector
            isSelected={selectedView === "scoreValidation"}
            onClick={() => handleView("scoreValidation")}
          >
            Validação de Scores
          </NavigationSelector>
        </NavigationHeaderWrapper>

        {selectedView === "generalRanking" && <GeneralRanking />}
        {selectedView === "singleRanking" && <SingleRanking />}
        {selectedView === "doubleRanking" && <DoubleRanking />}
        {selectedView === "songListManagement" && <SongList />}
        {selectedView === "playerList" && <PlayerList />}
      </DynamicEventWrapper>
    </GlobalContainer>
  );
};

export default EventType_Dynamic;
