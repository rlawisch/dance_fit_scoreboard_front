import { FunctionComponent } from "react";
import { useDashboard } from "../../providers/Dashboard";
import { Outlet } from "react-router-dom";
import { DashboardContainer, MainContainer } from "../../styles/global";
import PublicSidebar from "../../components/PublicSidebar";

interface PublicDashboardProps {}

const PublicDashboard: FunctionComponent<PublicDashboardProps> = () => {
  const { sideBarStatus } = useDashboard();

  return (
    <MainContainer>
      <PublicSidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <Outlet />
      </DashboardContainer>
    </MainContainer>
  );
};

export default PublicDashboard;