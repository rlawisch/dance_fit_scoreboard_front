import { FunctionComponent, useState } from "react";
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

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { playerLogout } = usePlayer();

  return (
    <SidebarContainer isopen={isOpen}>
      <SidebarToggleBtn isopen={isOpen} onClick={toggleSidebar}>
        <RiExpandLeftLine size={28} />
      </SidebarToggleBtn>

      <SidebarUl>
        <SidebarLi isopen={isOpen}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <IoHomeOutline />
            {isOpen ? "Home" : ""}
          </Link>
        </SidebarLi>
        <SidebarLi isopen={isOpen}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <MdEventNote />
            {isOpen ? "Eventos" : ""}
          </Link>
        </SidebarLi>
        <SidebarLi isopen={isOpen}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <GiMusicalScore />
            {isOpen ? "Scores" : ""}
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
