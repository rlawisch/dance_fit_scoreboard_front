import { FunctionComponent, useEffect, useState } from "react";
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
import AdminRankingByMusic from "./AdminRankingByMusic";
import AdminGeneralRankingNoBar from "./AdminRankingGeneralNoBar";
import AdminSingleRankingNoBar from "./AdminRankingSingleNoBar";
import AdminDoubleRankingNoBar from "./AdminRankingDoubleNoBar";
import AdminRankingByMusicNoBar from "./AdminRankingByMusicNoBar";

interface AdminEventType_DynamicProps {}

const AdminEventType_Dynamic: FunctionComponent<
  AdminEventType_DynamicProps
> = () => {
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

          <NavigationSelector
            isSelected={selectedView === "scoreValidation"}
            onClick={() => handleView("scoreValidation")}
          >
            Validação de Scores
          </NavigationSelector>
        </NavigationHeaderWrapper>

        {selectedView === "generalRanking" && <AdminGeneralRanking />}
        {selectedView === "singleRanking" && <AdminSingleRanking />}
        {selectedView === "doubleRanking" && <AdminDoubleRanking />}
        {selectedView === "rankingByMusic" && <AdminRankingByMusic />}

        {selectedView === "generalRankingNoBar" && <AdminGeneralRankingNoBar />}
        {selectedView === "singleRankingNoBar" && <AdminSingleRankingNoBar />}
        {selectedView === "doubleRankingNoBar" && <AdminDoubleRankingNoBar />}
        {selectedView === "rankingByMusicNoBar" && <AdminRankingByMusicNoBar />}

        {selectedView === "songListManagement" && <ListManagement />}
        {selectedView === "playerList" && <AdminPlayerList />}
        {selectedView === "scoreValidation" && <AdminValidateScores />}
      </DynamicEventWrapper>
    </GlobalContainer>
  );
};

export default AdminEventType_Dynamic;
