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
  width: ${(props) => (props.isopen ? `16rem` : `8rem`)};
  height: 100vh;
  padding: ${(props) => (props.isopen ? `0.75rem` : `0.1rem`)};

  background: ${(props) => props.theme.colors.secundary};
  color: ${(props) => props.theme.colors.primary};

  transition: width 350ms ease;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
`;

export const SidebarUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-top: 0.5rem;
  list-style: none;
  color: ${(props) => props.theme.colors.primary};
`;

export const SidebarLi = styled.li<SidebarLiProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  margin: 0.2rem 0;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  border-radius: 0.4rem;

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
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  left: ${(props) => (props.isopen ? "15rem" : "3rem")};
  align-self: flex-end;
  transform: ${(props) => (props.isopen ? "rotate(0)" : "rotate(180deg)")};
  transition: transform 350ms ease;
`;
