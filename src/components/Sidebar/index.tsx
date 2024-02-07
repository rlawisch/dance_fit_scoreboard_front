import { FunctionComponent, useState } from "react";
import {
  SidebarContainer,
  SidebarLi,
  SidebarToggleBtn,
  SidebarUl,
} from "./styles";
import { RiExpandLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdEventNote } from "react-icons/md";
import { GiMusicalScore } from "react-icons/gi";

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isopen={isOpen}>
      <SidebarToggleBtn isopen={isOpen} onClick={toggleSidebar}>
        <RiExpandLeftLine size={32} />
      </SidebarToggleBtn>

      <SidebarUl>
        <SidebarLi isopen={isOpen}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <MdEventNote />
            { isOpen ? 'Eventos' : ''}
          </Link>
        </SidebarLi>
        <SidebarLi isopen={isOpen}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <GiMusicalScore />
            { isOpen ? 'Scores' : ''}
          </Link>
        </SidebarLi>
      </SidebarUl>
    </SidebarContainer>
  );
};

export default Sidebar;
