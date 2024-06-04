import { FunctionComponent } from "react";
import { GlobalContainer } from "../../../../styles/global";

interface PublicGeneralRankingProps {}

const PublicGeneralRanking: FunctionComponent<PublicGeneralRankingProps> = () => {
  return (
    <GlobalContainer>
      <h2>Ranking Geral</h2>
    </GlobalContainer>
  );
};

export default PublicGeneralRanking;
