import { FunctionComponent, useEffect } from "react";
import {
  Nickname,
  SidebarPlayerInfoWrapper,
  SidebarProfilePicture,
  ProfilePictureWrapper,
  Role,
  SidebarContainer,
  SidebarLi,
  SidebarLogoutBtn,
  SidebarToggleBtn,
  SidebarUl,
} from "../../styles/global";
import { RiExpandLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdAssignment, MdEventNote } from "react-icons/md";
import { GiMusicalScore } from "react-icons/gi";
import { TbLogin2, TbLogout2, TbMusicShare } from "react-icons/tb";
import { usePlayer } from "../../providers/Players";
import { IoHomeOutline } from "react-icons/io5";
import { useDashboard } from "../../providers/Dashboard";
import { FaRegCircleUser, FaUsers } from "react-icons/fa6";
import { BsFillSkipStartFill } from "react-icons/bs";

interface USidebarProps {}

const USidebar: FunctionComponent<USidebarProps> = () => {
  const { toggleSidebar, sideBarStatus } = useDashboard();

  const { playerData, isAdmin, isLoggedIn, playerLogout, getPlayerData } =
    usePlayer();

  useEffect(() => {
    if (isLoggedIn()) {
      getPlayerData();
    }
  }, []);

  const navigate = useNavigate();

  return (
    <SidebarContainer isopen={sideBarStatus}>
      <SidebarToggleBtn isopen={sideBarStatus} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </SidebarToggleBtn>

      {isLoggedIn() && (
        <>
          <SidebarPlayerInfoWrapper>
            <Nickname isopen={sideBarStatus}>{playerData?.nickname}</Nickname>

            <ProfilePictureWrapper>
              <SidebarProfilePicture
                isopen={sideBarStatus}
                src={
                  playerData?.profilePicture
                    ? playerData?.profilePicture
                    : `/img/default_player.png`
                }
                alt="Profile Picture"
              />
            </ProfilePictureWrapper>

            <Role isopen={sideBarStatus}>
              {playerData?.role === "player" ? "JOGADOR" : "ADMIN"}
            </Role>
          </SidebarPlayerInfoWrapper>
        </>
      )}

      <SidebarUl>
        {!isLoggedIn() && (
          <>
            <SidebarLi isopen={sideBarStatus} onClick={() => navigate("/")}>
              <BsFillSkipStartFill />
              {sideBarStatus ? "Início" : ""}
            </SidebarLi>

            <SidebarLi
              isopen={sideBarStatus}
              onClick={() => navigate("/login")}
            >
              <TbLogin2 />
              {sideBarStatus ? "Login" : ""}
            </SidebarLi>
          </>
        )}

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/udashboard/home")}
        >
          <IoHomeOutline />
          {sideBarStatus ? "Home" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/udashboard/events")}
        >
          <MdEventNote />
          {sideBarStatus ? "Eventos" : ""}
        </SidebarLi>

        <SidebarLi
              isopen={sideBarStatus}
              onClick={() => navigate("/udashboard/scores")}
            >
              <GiMusicalScore />
              {sideBarStatus ? "Scores" : ""}
            </SidebarLi>

        {isLoggedIn() && (
          <>
            <SidebarLi
              isopen={sideBarStatus}
              onClick={() => navigate("/udashboard/profile")}
            >
              <FaRegCircleUser />
              {sideBarStatus ? "Perfil" : ""}
            </SidebarLi>
          </>
        )}

        {isAdmin() && (
          <>
            <SidebarLi
              isopen={sideBarStatus}
              onClick={() => navigate("/udashboard/musics")}
            >
              <TbMusicShare />
              {sideBarStatus ? "Músicas" : ""}
            </SidebarLi>

            <SidebarLi
              isopen={sideBarStatus}
              onClick={() => navigate("/udashboard/players")}
            >
              <FaUsers />
              {sideBarStatus ? "Jogadores" : ""}
            </SidebarLi>

            <SidebarLi
              isopen={sideBarStatus}
              onClick={() => navigate("/udashboard/enrollments")}
            >
              <MdAssignment />
              {sideBarStatus ? "Inscrições" : ""}
            </SidebarLi>
          </>
        )}

        {isLoggedIn() && (
          <>
            <SidebarLogoutBtn onClick={() => playerLogout("Até a próxima!")}>
              <TbLogout2 />
            </SidebarLogoutBtn>
          </>
        )}
      </SidebarUl>
    </SidebarContainer>
  );
};

export default USidebar;
