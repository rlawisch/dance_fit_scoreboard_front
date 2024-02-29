import { FunctionComponent } from "react";
import { useDashboard } from "../../providers/Dashboard";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { DashboardContainer, MainContainer } from "../../styles/global";

interface AdminDashboardProps {}

const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
  const { sideBarStatus } = useDashboard();

  return (
    <MainContainer>
      <AdminSidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <Outlet />
      </DashboardContainer>
    </MainContainer>
  );
};

export default AdminDashboard;
