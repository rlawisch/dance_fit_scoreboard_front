import { FunctionComponent } from "react";
import { useDashboard } from "../../providers/Dashboard";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { DashboardContainer } from "../Dashboard/styles";

interface AdminDashboardProps {}

const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
  const { sideBarStatus } = useDashboard();

  return (
    <main>
      <AdminSidebar />
      <DashboardContainer isopen={sideBarStatus}>
        <Outlet />
      </DashboardContainer>
    </main>
  );
};

export default AdminDashboard;
