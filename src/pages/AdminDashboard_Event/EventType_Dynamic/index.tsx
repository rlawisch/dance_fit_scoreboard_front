import { FunctionComponent, useEffect, useState } from "react";
import {
  GlobalContainer,
  NavigationHeaderWrapper,
  NavigationSelector,
  Title,
} from "../../../styles/global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { useEvents } from "../../../providers/Events";
import AdminGeneralRanking from "./AdminGeneralRanking";
import AdminSingleRanking from "./AdminSingleRaking";
import AdminDoubleRanking from "./AdminDoubleRanking";
import ListManagement from "./ListManagement";
import { useEnrollments } from "../../../providers/Enrollments";
import { usePlayer } from "../../../providers/Players";
import AdminPlayerList from "./AdminPlayerList";

interface AdminEventType_DynamicProps {}

const AdminEventType_Dynamic: FunctionComponent<
  AdminEventType_DynamicProps
> = () => {

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
  const [isActivePlayerList, setIsActivePlayerList] = useState<boolean>(false)

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
      <Button onClick={() => navigate("/admin/events")}>Voltar</Button>

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
        <NavigationSelector onClick={() => handleViewPlayerList()}>
          Lista de Jogadores
        </NavigationSelector>
      </NavigationHeaderWrapper>

      {!!isActiveGeneralRanking && <AdminGeneralRanking />}
      {!!isActiveSingleRanking && <AdminSingleRanking />}
      {!!isActiveDoubleRanking && <AdminDoubleRanking />}
      {!!isActiveSongListManagement && <ListManagement />}
      {!!isActivePlayerList && <AdminPlayerList />}
      

    </GlobalContainer>
  );
};

export default AdminEventType_Dynamic;
