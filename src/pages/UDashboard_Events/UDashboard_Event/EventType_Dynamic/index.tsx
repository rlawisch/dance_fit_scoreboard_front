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
} from "../../../../styles/global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import { useEvents } from "../../../../providers/Events";
import { useEnrollments } from "../../../../providers/Enrollments";
import { usePlayer } from "../../../../providers/Players";
import URankingGeneral from "./RankingGeneral";
import URankingSingle from "./RankingSingle";
import URankingDouble from "./RankingDouble";
import URankingByMusic from "./RankingByMusic";
import URankingGeneralNoBar from "./RankingGeneralNoBar";
import URankingSingleNoBar from "./RankingSingleNoBar";
import URankingDoubleNoBar from "./RankingDoubleNoBar";
import URankingByMusicNoBar from "./RankingByMusicNoBar";
import USongList from "./SongList";
import UPlayerList from "./PlayerList";
import UValidateScores from "./ValidateScores";

interface UEventType_DynamicProps {}

const UEventType_Dynamic: FunctionComponent<UEventType_DynamicProps> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const { eventData, getEventData } = useEvents();

  const { decodedPlayerInfo, isAdmin, isLoggedIn } = usePlayer();

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
        <Button onClick={() => navigate("/udashboard/events")}>Voltar</Button>

        <Title>{!!eventData && eventData.name}</Title>

        {isLoggedIn() && (
          <>
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
          </>
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

          {isAdmin() && (
            <>
              <NavigationSelector
                isSelected={selectedView === "scoreValidation"}
                onClick={() => handleView("scoreValidation")}
              >
                Validação de Scores
              </NavigationSelector>
            </>
          )}
        </NavigationHeaderWrapper>

        {selectedView === "generalRanking" && <URankingGeneral />}
        {selectedView === "singleRanking" && <URankingSingle />}
        {selectedView === "doubleRanking" && <URankingDouble />}
        {selectedView === "rankingByMusic" && <URankingByMusic />}

        {selectedView === "generalRankingNoBar" && <URankingGeneralNoBar />}
        {selectedView === "singleRankingNoBar" && <URankingSingleNoBar />}
        {selectedView === "doubleRankingNoBar" && <URankingDoubleNoBar />}
        {selectedView === "rankingByMusicNoBar" && <URankingByMusicNoBar />}

        {selectedView === "songListManagement" && <USongList />}
        {selectedView === "playerList" && <UPlayerList />}
        {selectedView === "scoreValidation" && <UValidateScores />}
      </DynamicEventWrapper>
    </GlobalContainer>
  );
};

export default UEventType_Dynamic;
