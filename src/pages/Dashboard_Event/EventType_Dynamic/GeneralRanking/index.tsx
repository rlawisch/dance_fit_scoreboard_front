import { FunctionComponent, useEffect } from "react";
import { GlobalContainer } from "../../../../styles/global";
import { useScore } from "../../../../providers/Scores";
import { useParams } from "react-router-dom";

interface GeneralRankingProps {}

const GeneralRanking: FunctionComponent<GeneralRankingProps> = () => {
  
  const { event_id } = useParams()

  const { getScoresByEvent } = useScore()

  useEffect(() => {
    getScoresByEvent(Number(event_id))
  }, [])
  
  return (
    <GlobalContainer>
      <h2>Ranking Geral</h2>
    </GlobalContainer>
  );
};

export default GeneralRanking;
