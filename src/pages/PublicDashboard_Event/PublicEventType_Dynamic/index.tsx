import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../../providers/Events";
import {
  GlobalContainer,
  NavigationHeaderWrapper,
  NavigationSelector,
  Title,
} from "../../../styles/global";
import Button from "../../../components/Button";
import PublicGeneralRanking from "./PublicGeneralRanking";
import PublicSingleRanking from "./PublicSingleRanking";
import PublicDoubleRanking from "./PublicDoubleRanking";
import PublicSongList from "./PublicSongList";
import PublicPlayerList from "./PublicPlayerList";

interface PublicEventType_DynamicProps {}

const PublicEventType_Dynamic: FunctionComponent<
  PublicEventType_DynamicProps
> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const { eventData, getEventData } = useEvents();

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
  const [isActivePlayerList, setIsActivePlayerList] = useState<boolean>(false);

  const handleViewGeneralRanking = () => {
    setIsActiveGeneralRanking(true);
    setIsActiveSingleRanking(false);
    setIsActiveDoubleRanking(false);
    setIsActiveSongListManagement(false);
    setIsActivePlayerList(false)
  };

  const handleViewSingleRanking = () => {
    setIsActiveGeneralRanking(false);
    setIsActiveSingleRanking(true);
    setIsActiveDoubleRanking(false);
    setIsActiveSongListManagement(false);
    setIsActivePlayerList(false)
  };

  const handleViewDoubleRanking = () => {
    setIsActiveGeneralRanking(false);
    setIsActiveSingleRanking(false);
    setIsActiveDoubleRanking(true);
    setIsActiveSongListManagement(false);
    setIsActivePlayerList(false)
  };

  const handleViewSongListManagement = () => {
    setIsActiveGeneralRanking(false);
    setIsActiveSingleRanking(false);
    setIsActiveDoubleRanking(false);
    setIsActiveSongListManagement(true);
    setIsActivePlayerList(false)
  };

  const handleViewPlayerList = () => {
    setIsActiveGeneralRanking(false);
    setIsActiveSingleRanking(false);
    setIsActiveDoubleRanking(false);
    setIsActiveSongListManagement(false);
    setIsActivePlayerList(true)
  }

  return (
    <GlobalContainer>
      <Button onClick={() => navigate("/public/events")}>Voltar</Button>

      <Title>{!!eventData && eventData.name}</Title>

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
        <NavigationSelector onClick={() => handleViewPlayerList()}>
          Lista de Jogadores
        </NavigationSelector>
      </NavigationHeaderWrapper>

      {!!isActiveGeneralRanking && <PublicGeneralRanking />}
      {!!isActiveSingleRanking && <PublicSingleRanking />}
      {!!isActiveDoubleRanking && <PublicDoubleRanking />}
      {!!isActiveSongListManagement && <PublicSongList />}
      {!!isActivePlayerList && <PublicPlayerList />}
    </GlobalContainer>
  );
};

export default PublicEventType_Dynamic;
