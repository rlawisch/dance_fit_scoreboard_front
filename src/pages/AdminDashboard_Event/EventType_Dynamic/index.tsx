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

interface AdminEventType_DynamicProps {}

const AdminEventType_Dynamic: FunctionComponent<
  AdminEventType_DynamicProps
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
      <Button onClick={() => navigate("/admin/events")}>Voltar</Button>

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
      </NavigationHeaderWrapper>

      {!!isActiveGeneralRanking && <AdminGeneralRanking />}
      {!!isActiveSingleRanking && <AdminSingleRanking />}
      {!!isActiveDoubleRanking && <AdminDoubleRanking />}
      {!!isActiveSongListManagement && <ListManagement />}
      {/* TODO

        Different Views

          Ranking Geral

          Ranking Single

          Ranking Double

          ADM ONLY

            Gerenciamento da Lista de Musicas

              Create Song List Button

              AddSongToListForm

              RemoveSongFromListForm

              Render Song List Table (Singles/Doubles)

      */}
    </GlobalContainer>
  );
};

export default AdminEventType_Dynamic;
