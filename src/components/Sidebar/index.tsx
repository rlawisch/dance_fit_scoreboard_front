import { FunctionComponent } from "react";
import {
  SidebarContainer,
  SidebarLi,
  SidebarLogoutBtn,
  SidebarToggleBtn,
  SidebarUl,
} from "./styles";
import { RiExpandLeftLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { MdEventNote, MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiMusicalScore } from "react-icons/gi";
import { TbLogout2 } from "react-icons/tb";
import { usePlayer } from "../../providers/Players";
import { IoHomeOutline } from "react-icons/io5";
import { useDashboard } from "../../providers/Dashboard";

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const { toggleSidebar, sideBarStatus } = useDashboard();

  const { playerLogout, hasAdminRights, decodedPlayerInfo } = usePlayer();

  const navigate = useNavigate();

  return (
    <SidebarContainer isopen={sideBarStatus}>
      <SidebarToggleBtn isopen={sideBarStatus} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </SidebarToggleBtn>

      <SidebarUl>
        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/dashboard")}
        >
          <IoHomeOutline />
          {sideBarStatus ? "Home" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/dashboard/events")}
        >
          <MdEventNote />
          {sideBarStatus ? "Eventos" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/dashboard/scores")}
        >
          <GiMusicalScore />
          {sideBarStatus ? <p>Scores</p> : ""}
        </SidebarLi>
        {decodedPlayerInfo.role === "admin" && (
          <SidebarLi
            isopen={sideBarStatus}
            onClick={() => {
              hasAdminRights();
              navigate("/admin/home");
            }}
          >
            <MdOutlineAdminPanelSettings />
            {sideBarStatus ? "Painel de Administrador" : ""}
          </SidebarLi>
        )}
      </SidebarUl>
      <SidebarLogoutBtn onClick={() => playerLogout()}>
        <TbLogout2 />
      </SidebarLogoutBtn>
    </SidebarContainer>
  );
};

export default Sidebar;
