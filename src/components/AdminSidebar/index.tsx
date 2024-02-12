import { FunctionComponent } from "react";
import {
  AdminSidebarContainer,
  AdminSidebarLi,
  AdminSidebarLogoutBtn,
  AdminSidebarToggleBtn,
  AdminSidebarUl,
} from "./styles";
import { RiExpandLeftLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  return (
    <AdminSidebarContainer isopen={sideBarStatus}>
      <AdminSidebarToggleBtn isopen={sideBarStatus} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </AdminSidebarToggleBtn>

      <AdminSidebarUl>
        <AdminSidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/admin/home")}
        >
          <IoHomeOutline />
          {sideBarStatus ? "Home" : ""}
        </AdminSidebarLi>
        <AdminSidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/admin/score_validation")}
        >
          <GrValidate />
          {sideBarStatus ? "Validar Scores" : ""}
        </AdminSidebarLi>
        <AdminSidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/dashboard/home")}
        >
          <FaHouseUser />
          {sideBarStatus ? "Painel de Jogador" : ""}
        </AdminSidebarLi>
      </AdminSidebarUl>
      <AdminSidebarLogoutBtn onClick={playerLogout}>
        <TbLogout2 />
      </AdminSidebarLogoutBtn>
    </AdminSidebarContainer>
  );
};

export default AdminSidebar;
