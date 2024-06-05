import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import { GlobalContainer, NavigationHeaderWrapper, NavigationSelector, Title } from "../../../styles/global";
import Button from "../../../components/Button";
import GeneralRanking from "./GeneralRanking";
import SongList from "./SongList";
import DoubleRanking from "./DoubleRanking";
import SingleRanking from "./SingleRanking";
import { useEnrollments } from "../../../providers/Enrollments";
import { usePlayer } from "../../../providers/Players";

interface EventType_DynamicProps {}

const EventType_Dynamic: FunctionComponent<EventType_DynamicProps> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const { eventData, getEventData } = useEvents();

  const { decodedPlayerInfo } = usePlayer()

  const { createEnrollment } = useEnrollments()

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  const [isActiveGeneralRanking, setIsActiveGeneralRanking] =
    useState<boolean>(true);
  const [isActiveSingleRanking, setIsActiveSingleRanking] =
    useState<boolean>(false);
  const [isActiveDoubleRanking, setIsActiveDoubleRanking] =
    useState<boolean>(false);
  const [isActiveSongListManagement, setIsActiveSongListManagement] =
    useState<boolean>(false);

  const handleViewGeneralRanking = () => {
    setIsActiveGeneralRanking(true);
    setIsActiveSingleRanking(false);
    setIsActiveDoubleRanking(false);
    setIsActiveSongListManagement(false);
  };

  const handleViewSingleRanking = () => {
    setIsActiveGeneralRanking(false);
    setIsActiveSingleRanking(true);
    setIsActiveDoubleRanking(false);
    setIsActiveSongListManagement(false);
  };

  const handleViewDoubleRanking = () => {
    setIsActiveGeneralRanking(false);
    setIsActiveSingleRanking(false);
    setIsActiveDoubleRanking(true);
    setIsActiveSongListManagement(false);
  };

  const handleViewSongListManagement = () => {
    setIsActiveGeneralRanking(false);
    setIsActiveSingleRanking(false);
    setIsActiveDoubleRanking(false);
    setIsActiveSongListManagement(true);
  };

  return (
    <GlobalContainer>
      <Button onClick={() => navigate("/dashboard/events")}>Voltar</Button>

      <Title>{!!eventData && eventData.name}</Title>

      <Button
        onClick={() => createEnrollment(Number(decodedPlayerInfo.player_id), Number(event_id))}
      >
        Inscrição
      </Button>

      <NavigationHeaderWrapper>
        <NavigationSelector onClick={() => handleViewGeneralRanking()}>
          Ranking Geral
        </NavigationSelector>
        <NavigationSelector onClick={() => handleViewSingleRanking()}>
          Ranking Single
        </NavigationSelector>
        <NavigationSelector onClick={() => handleViewDoubleRanking()}>
          Ranking Double
        </NavigationSelector>
        <NavigationSelector onClick={() => handleViewSongListManagement()}>
          Lista de Músicas
        </NavigationSelector>
      </NavigationHeaderWrapper>

      {!!isActiveGeneralRanking && <GeneralRanking />}
      {!!isActiveSingleRanking && <SingleRanking />}
      {!!isActiveDoubleRanking && <DoubleRanking />}
      {!!isActiveSongListManagement && <SongList />}
    </GlobalContainer>
  );
};

export default EventType_Dynamic;
