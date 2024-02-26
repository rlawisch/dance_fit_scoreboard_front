import { FunctionComponent, useEffect } from "react";
import {
  Nickname,
  PlayerInfoWrapper,
  ProfilePicture,
  ProfilePictureWrapper,
  Role,
  SidebarContainer,
  SidebarLi,
  SidebarLogoutBtn,
  SidebarToggleBtn,
  SidebarUl,
} from "./styles";
import { RiExpandLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdEventNote, MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiMusicalScore } from "react-icons/gi";
import { TbLogout2 } from "react-icons/tb";
import { usePlayer } from "../../providers/Players";
import { IoHomeOutline } from "react-icons/io5";
import { useDashboard } from "../../providers/Dashboard";
import { FaRegCircleUser } from "react-icons/fa6";

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const { toggleSidebar, sideBarStatus } = useDashboard();

  const {
    playerLogout,
    hasAdminRights,
    decodedPlayerInfo,
    getPlayerData,
    playerData,
  } = usePlayer();

  useEffect(() => {
    getPlayerData();
  }, []);

  const navigate = useNavigate();

  return (
    <SidebarContainer isopen={sideBarStatus}>
      <SidebarToggleBtn isopen={sideBarStatus} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </SidebarToggleBtn>

      <PlayerInfoWrapper>
        <Nickname isopen={sideBarStatus}>{playerData?.nickname}</Nickname>

        <ProfilePictureWrapper>
          <ProfilePicture
            isopen={sideBarStatus}
            src={
              playerData?.profilePicture
                ? playerData?.profilePicture
                : `/src/assets/img/default_player.png`
            }
            alt="Profile Picture"
          />
        </ProfilePictureWrapper>

        <Role isopen={sideBarStatus}>
          {playerData?.role === "player" ? "JOGADOR" : "ADMIN"}
        </Role>
      </PlayerInfoWrapper>

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

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/dashboard/profile")}
        >
          <FaRegCircleUser />
          {sideBarStatus ? <p>Perfil</p> : ""}
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
            {sideBarStatus ? "Admin" : ""}
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
