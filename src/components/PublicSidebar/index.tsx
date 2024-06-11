import { FunctionComponent } from "react";
import {
  SidebarContainer,
  SidebarLi,
  SidebarToggleBtn,
  SidebarUl,
} from "./styles";
import { RiExpandLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdEventNote } from "react-icons/md";
import { useDashboard } from "../../providers/Dashboard";
import { IoHomeOutline } from "react-icons/io5";

interface PublicSidebarProps {}

const PublicSidebar: FunctionComponent<PublicSidebarProps> = () => {
  const { toggleSidebar, sideBarStatus } = useDashboard();

  const navigate = useNavigate();

  return (
    <SidebarContainer isopen={sideBarStatus}>
      <SidebarToggleBtn isopen={sideBarStatus} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </SidebarToggleBtn>

      <SidebarUl>
        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/")}
        >
          <IoHomeOutline />
          {sideBarStatus ? "Home" : ""}
        </SidebarLi>

        <SidebarLi
          isopen={sideBarStatus}
          onClick={() => navigate("/public/events")}
        >
          <MdEventNote />
          {sideBarStatus ? "Eventos" : ""}
        </SidebarLi>
      </SidebarUl>
    </SidebarContainer>
  );
};

export default PublicSidebar;
