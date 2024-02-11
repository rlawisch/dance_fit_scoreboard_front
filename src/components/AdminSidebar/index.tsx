import { FunctionComponent } from "react";
import {
  AdminSidebarContainer,
  AdminSidebarLi,
  AdminSidebarLogoutBtn,
  AdminSidebarToggleBtn,
  AdminSidebarUl,
} from "./styles";
import { RiExpandLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { usePlayer } from "../../providers/Players";
import { IoHomeOutline } from "react-icons/io5";
import { useDashboard } from "../../providers/Dashboard";
import { FaHouseUser } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";

interface SidebarProps {}

const AdminSidebar: FunctionComponent<SidebarProps> = () => {
  const { toggleSidebar, sideBarStatus } = useDashboard();

  const { playerLogout } = usePlayer();

  return (
    <AdminSidebarContainer isopen={sideBarStatus}>
      <AdminSidebarToggleBtn isopen={sideBarStatus} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </AdminSidebarToggleBtn>

      <AdminSidebarUl>
        <AdminSidebarLi isopen={sideBarStatus}>
          <Link to="/admin/home" style={{ textDecoration: "none" }}>
            <IoHomeOutline />
            {sideBarStatus ? "Home" : ""}
          </Link>
        </AdminSidebarLi>
        <AdminSidebarLi isopen={sideBarStatus}>
          <Link to="/admin/score_validation" style={{ textDecoration: "none" }}>
            <GrValidate />
            {sideBarStatus ? "Validar Scores" : ""}
          </Link>
        </AdminSidebarLi>
        <AdminSidebarLi isopen={sideBarStatus}>
          <Link to="/dashboard/home" style={{ textDecoration: "none" }}>
            <FaHouseUser />
            {sideBarStatus ? "Painel de Jogador" : ""}
          </Link>
        </AdminSidebarLi>
      </AdminSidebarUl>
      <AdminSidebarLogoutBtn onClick={playerLogout}>
        <TbLogout2 />
      </AdminSidebarLogoutBtn>
    </AdminSidebarContainer>
  );
};

export default AdminSidebar;
