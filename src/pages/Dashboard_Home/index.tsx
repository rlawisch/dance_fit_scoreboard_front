import { FunctionComponent } from "react";
import Sidebar from "../../components/Sidebar";
import { DashboardContainer } from "../../styles/global";
import { useDashboard } from "../../providers/Dashboard";
import { GlobalContainer } from "../../styles/global";

interface DashboardHomeProps {}

const DashboardHome: FunctionComponent<DashboardHomeProps> = () => {
  const { sideBarStatus } = useDashboard();

  return (
    <main>
      <Sidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <GlobalContainer>
          <p>HOME</p>
        </GlobalContainer>
      </DashboardContainer>
    </main>
  );
};

export default DashboardHome;
