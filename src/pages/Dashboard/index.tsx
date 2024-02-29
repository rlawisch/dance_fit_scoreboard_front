import { FunctionComponent } from "react";
import Sidebar from "../../components/Sidebar";
import { useDashboard } from "../../providers/Dashboard";
import { Outlet } from "react-router-dom";
import { DashboardContainer, MainContainer } from "../../styles/global";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const { sideBarStatus } = useDashboard();

  return (
    <MainContainer>
      <Sidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <Outlet />
      </DashboardContainer>
    </MainContainer>
  );
};

export default Dashboard;
