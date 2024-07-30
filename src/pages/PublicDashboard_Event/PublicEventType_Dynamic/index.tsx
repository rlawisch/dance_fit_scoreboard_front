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
import PublicRankingGeneral from "./PublicRankingGeneral";
import PublicRankingSingle from "./PublicRankingSingle";
import PublicRankingDouble from "./PublicRankingDouble";
import PublicSongList from "./PublicSongList";
import PublicPlayerList from "./PublicPlayerList";
import PublicRankingByMusic from "./PublicRankingByMusic";
import PublicRankingGeneralNoBar from "./PublicRankingGeneralNoBar";
import PublicRankingSingleNoBar from "./PublicRankingSingleNoBar";
import PublicRankingDoubleNoBar from "./PublicRankingDoubleNoBar";
import PublicRankingByMusicNoBar from "./PublicRankingByMusicNoBar";

interface PublicEventType_DynamicProps {}

const PublicEventType_Dynamic: FunctionComponent<
  PublicEventType_DynamicProps
> = () => {
  const { event_id } = useParams();

  const navigate = useNavigate();

  const { eventData, getEventData } = useEvents();

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
        <Button onClick={() => navigate("/public/events")}>Voltar</Button>

        <Title>{!!eventData && eventData.name}</Title>

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
            Músicas
          </NavigationSelector>

          <NavigationSelector
            isSelected={selectedView === "playerList"}
            onClick={() => handleView("playerList")}
          >
            Jogadores
          </NavigationSelector>
        </NavigationHeaderWrapper>

        {selectedView === "generalRanking" && <PublicRankingGeneral />}
        {selectedView === "singleRanking" && <PublicRankingSingle />}
        {selectedView === "doubleRanking" && <PublicRankingDouble />}
        {selectedView === "rankingByMusic" && <PublicRankingByMusic />}

        {selectedView === "generalRankingNoBar" && <PublicRankingGeneralNoBar />}
        {selectedView === "singleRankingNoBar" && <PublicRankingSingleNoBar />}
        {selectedView === "doubleRankingNoBar" && <PublicRankingDoubleNoBar />}
        {selectedView === "rankingByMusicNoBar" && <PublicRankingByMusicNoBar />}
        
        {selectedView === "songListManagement" && <PublicSongList />}
        {selectedView === "playerList" && <PublicPlayerList />}
      </DynamicEventWrapper>
    </GlobalContainer>
  );
};

export default PublicEventType_Dynamic;
