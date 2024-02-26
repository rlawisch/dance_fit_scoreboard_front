import { FunctionComponent, useEffect } from "react";
import { RiExpandLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { TbLogout2, TbMusicShare } from "react-icons/tb";
import { usePlayer } from "../../providers/Players";
import { IoHomeOutline } from "react-icons/io5";
import { useDashboard } from "../../providers/Dashboard";
import { FaHouseUser } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { MdEventNote } from "react-icons/md";
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
} from "../Sidebar/styles";

interface SidebarProps {}

const AdminSidebar: FunctionComponent<SidebarProps> = () => {
  const { toggleSidebar, sideBarStatus } = useDashboard();

  const { playerLogout, getPlayerData, playerData } = usePlayer();

  const navigate = useNavigate();

  useEffect(() => {
    getPlayerData();
  }, []);

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
              !!playerData?.profilePicture
                ? playerData?.profilePicture
                : `/img/default_player.png`
            }
            alt="Profile Picture"
          />
        </ProfilePictureWrapper>

        <Role isopen={sideBarStatus}>
          {playerData?.role === "admin" ? "ADMIN" : "JOGADOR"}
        </Role>
      </PlayerInfoWrapper>

      <SidebarUl>
        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/admin/home")}
        >
          <IoHomeOutline />
          {sideBarStatus ? "Home" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/admin/events")}
        >
          <MdEventNote />
          {sideBarStatus ? "Eventos" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/admin/score_validation")}
        >
          <GrValidate />
          {sideBarStatus ? "Validar Scores" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/admin/musics")}
        >
          <TbMusicShare />
          {sideBarStatus ? "Músicas" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/dashboard/home")}
        >
          <FaHouseUser />
          {sideBarStatus ? "Jogador" : ""}
        </SidebarLi>
      </SidebarUl>

      <SidebarLogoutBtn onClick={playerLogout}>
        <TbLogout2 />
      </SidebarLogoutBtn>
    </SidebarContainer>
  );
};

export default AdminSidebar;
