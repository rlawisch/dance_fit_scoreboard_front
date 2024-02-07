import { FunctionComponent } from "react";
import { GlobalContainer } from "../../styles/global";
import Sidebar from "../../components/Sidebar";
import { useDashboard } from "../../providers/Dashboard";
import { DashboardContainer } from "../../styles/global";

interface DashboardEventsProps {}

const DashboardEvents: FunctionComponent<DashboardEventsProps> = () => {
  
    const { sideBarStatus } = useDashboard();
  
    return (
    <main>
      <Sidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <GlobalContainer>
          <p>PAGINA DE EVENTOS</p>
        </GlobalContainer>
      </DashboardContainer>
    </main>
  );
};

export default DashboardEvents;
