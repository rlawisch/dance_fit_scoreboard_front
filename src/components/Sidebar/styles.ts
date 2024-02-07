import styled from "styled-components";
import { shade } from "polished";

interface SidebarContainerProps {
  isopen: boolean;
}

interface SidebarToggleBtnProps {
  isopen: boolean;
}

interface SidebarLiProps {
  isopen: boolean;
}

export const SidebarContainer = styled.aside<SidebarContainerProps>`
  position: absolute;
  left: 0;
  top: 60px;
  width: ${(props) => (props.isopen ? `12rem` : `5rem`)};
  height: 100vh;
  padding: ${(props) => (props.isopen ? `0 0.4rem` : `0 0.2rem`)};

  background: ${(props) => props.theme.colors.secundary};
  color: ${(props) => props.theme.colors.primary};

  transition: width 350ms ease;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;

  box-shadow: 0.3rem 0 0.5rem rgba(0, 0, 0, 0.1);
`;

export const SidebarUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  margin-top: 0.5rem;
  list-style: none;
  color: ${(props) => props.theme.colors.primary};
`;

export const SidebarLi = styled.li<SidebarLiProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.isopen ? "flex-start" : "center")};

  padding: 1rem;
  margin: 0.2rem 0;
  border-radius: 0.2rem;

  color: ${(props) => props.theme.colors.primary};
  font-size: 1rem;

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.secundary)};
  }

  a {
    text-decoration: none !important;
    color: ${(props) => props.theme.colors.primary};
    display: flex;
    align-items: center;

    svg {
      margin-right: ${(props) => (props.isopen ? `0.8rem` : `0`)};
    }
  }
`;

export const SidebarToggleBtn = styled.button<SidebarToggleBtnProps>`
  border: none;
  margin: 0rem;
  padding: 0.5rem 0 0 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  left: ${(props) => (props.isopen ? "15rem" : "3rem")};
  align-self: flex-end;
  transform: ${(props) => (props.isopen ? "rotate(0)" : "rotate(180deg)")};
  transition: transform 350ms ease;
`;
