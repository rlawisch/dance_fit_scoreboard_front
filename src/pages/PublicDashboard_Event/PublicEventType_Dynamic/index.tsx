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

        {selectedView === "generalRanking" && <PublicGeneralRanking />}
        {selectedView === "singleRanking" && <PublicSingleRanking />}
        {selectedView === "doubleRanking" && <PublicDoubleRanking />}
        {selectedView === "songListManagement" && <PublicSongList />}
        {selectedView === "playerList" && <PublicPlayerList />}
      </DynamicEventWrapper>
    </GlobalContainer>
  );
};

export default PublicEventType_Dynamic;
