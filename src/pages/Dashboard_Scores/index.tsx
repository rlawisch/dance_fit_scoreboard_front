import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";

interface DashboardScoresProps {}

const DashboardScores: FunctionComponent<DashboardScoresProps> = () => {
  return (
    <GlobalContainer>
      <p>PAGINA DE SCORES</p>
    </GlobalContainer>
  );
};

export default DashboardScores;
