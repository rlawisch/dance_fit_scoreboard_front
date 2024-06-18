import { FunctionComponent, useEffect, useState } from "react";
import {
  DynamicEventWrapper,
  GlobalContainer,
  NavigationHeaderWrapper,
  NavigationSelector,
  Title,
} from "../../../styles/global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { useEvents } from "../../../providers/Events";
import AdminGeneralRanking from "./AdminRankingGeneral";
import AdminSingleRanking from "./AdminRankingSingle";
import AdminDoubleRanking from "./AdminRankingDouble";
import ListManagement from "./AdminSongList";
import { useEnrollments } from "../../../providers/Enrollments";
import { usePlayer } from "../../../providers/Players";
import AdminPlayerList from "./AdminPlayerList";
import AdminValidateScores from "./AdminValidateScores";

interface AdminEventType_DynamicProps {}

const AdminEventType_Dynamic: FunctionComponent<
  AdminEventType_DynamicProps
> = () => {
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
        <Button onClick={() => navigate("/admin/events")}>Voltar</Button>

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
            isSelected={selectedView === 'singleRanking'}
            onClick={() => handleView('singleRanking')}
          >
            Ranking Single
          </NavigationSelector>


          <NavigationSelector
            isSelected={selectedView === 'doubleRanking'}
            onClick={() => handleView('doubleRanking')}
          >
            Ranking Double
          </NavigationSelector>


          <NavigationSelector
            isSelected={selectedView === 'songListManagement'}
            onClick={() => handleView('songListManagement')}
          >
            Músicas
          </NavigationSelector>


          <NavigationSelector
            isSelected={selectedView === 'playerList'}
            onClick={() => handleView('playerList')}
          >
            Jogadores
          </NavigationSelector>


          <NavigationSelector
            isSelected={selectedView === 'scoreValidation'}
            onClick={() => handleView('scoreValidation')}
          >
            Validação de Scores
          </NavigationSelector>
        </NavigationHeaderWrapper>

        {selectedView === 'generalRanking' && <AdminGeneralRanking />}
        {selectedView === 'singleRanking' && <AdminSingleRanking />}
        {selectedView === 'doubleRanking' && <AdminDoubleRanking />}
        {selectedView === 'songListManagement' && <ListManagement />}
        {selectedView === 'playerList' && <AdminPlayerList />}
        {selectedView === 'scoreValidation' && <AdminValidateScores />}
      </DynamicEventWrapper>
    </GlobalContainer>
  );
};

export default AdminEventType_Dynamic;
