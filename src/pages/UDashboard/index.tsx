import { Outlet } from 'react-router-dom';
import { DashboardContainer, MainContainer } from '../../styles/global';
import { FunctionComponent } from "react";
import { useDashboard } from "../../providers/Dashboard";
import USidebar from '../../components/USidebar';

interface UDashboardProps {}

const UDashboard: FunctionComponent<UDashboardProps> = () => {

  const { sideBarStatus } = useDashboard();

  return (
    <MainContainer>
      <USidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <Outlet />
      </DashboardContainer>
    </MainContainer>
  );
};

export default UDashboard;
