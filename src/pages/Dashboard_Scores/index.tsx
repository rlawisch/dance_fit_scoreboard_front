import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";
import Sidebar from "../../components/Sidebar";
import { useDashboard } from "../../providers/Dashboard";
import { DashboardContainer } from "../../styles/global";

interface DashboardScoresProps {}

const DashboardScores: FunctionComponent<DashboardScoresProps> = () => {
  const { sideBarStatus } = useDashboard();

  return (
    <main>
      <Sidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <GlobalContainer>
          <p>PAGINA DE SCORES</p>
        </GlobalContainer>
      </DashboardContainer>
    </main>
  );
};

export default DashboardScores;
