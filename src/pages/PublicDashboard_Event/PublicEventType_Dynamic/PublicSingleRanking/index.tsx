import { FunctionComponent } from "react";
import { GlobalContainer } from "../../../../styles/global";

interface PublicSingleRankingProps {}

const PublicSingleRanking: FunctionComponent<PublicSingleRankingProps> = () => {
  return (
    <GlobalContainer>
      <h2>Ranking Singles</h2>
    </GlobalContainer>
  );
};

export default PublicSingleRanking;
