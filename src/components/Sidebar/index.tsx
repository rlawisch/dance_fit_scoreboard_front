import { FunctionComponent } from "react";
import {
  SidebarContainer,
  SidebarLi,
  SidebarLogoutBtn,
  SidebarToggleBtn,
  SidebarUl,
} from "./styles";
import { RiExpandLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdEventNote } from "react-icons/md";
import { GiMusicalScore } from "react-icons/gi";
import { TbLogout2 } from "react-icons/tb";
import { usePlayer } from "../../providers/Players";
import { IoHomeOutline } from "react-icons/io5";
import { useDashboard } from "../../providers/Dashboard";

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {

  const { toggleSidebar, sideBarStatus } = useDashboard()

  console.log(sideBarStatus)

  const { playerLogout } = usePlayer();

  return (
    <SidebarContainer isopen={sideBarStatus}>
      <SidebarToggleBtn isopen={sideBarStatus} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </SidebarToggleBtn>

      <SidebarUl>
        <SidebarLi isopen={sideBarStatus}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <IoHomeOutline />
            {sideBarStatus ? "Home" : ""}
          </Link>
        </SidebarLi>
        <SidebarLi isopen={sideBarStatus}>
          <Link to="/dashboard/events" style={{ textDecoration: "none" }}>
            <MdEventNote />
            {sideBarStatus ? "Eventos" : ""}
          </Link>
        </SidebarLi>
        <SidebarLi isopen={sideBarStatus}>
          <Link to="/dashboard/scores" style={{ textDecoration: "none" }}>
            <GiMusicalScore />
            {sideBarStatus ? "Scores" : ""}
          </Link>
        </SidebarLi>
      </SidebarUl>
      <SidebarLogoutBtn onClick={playerLogout}>
        <TbLogout2 />
      </SidebarLogoutBtn>
    </SidebarContainer>
  );
};

export default Sidebar;
