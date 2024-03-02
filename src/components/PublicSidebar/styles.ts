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

interface ProfilePictureProps {
  isopen: boolean;
}

interface NicknameProps {
  isopen: boolean;
}

interface RoleProps {
  isopen: boolean;
}

export const SidebarContainer = styled.aside<SidebarContainerProps>`
  z-index: 100;
  position: fixed;
  left: ${(props) => (props.isopen ? `0rem` : `0rem`)};
  overflow: hidden;

  width: ${(props) => (props.isopen ? `10rem` : `4rem`)};
  height: calc(100vh - 60px);
  padding: ${(props) => (props.isopen ? `0 0.4rem` : `0 0.2rem`)};

  background: ${(props) => props.theme.colors.secundary};
  color: ${(props) => props.theme.colors.primary};

  transition: width 350ms ease;

  display: flex;
  flex-direction: column;

  box-shadow: 0.3rem 0 0.5rem rgba(0, 0, 0, 0.1);
`;

export const SidebarUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  margin-top: 1rem;
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
  font-size: ${(props) => (props.isopen ? `0.9rem` : `1.5rem`)};

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.secundary)};
    cursor: pointer;
  }

  svg {
    margin-right: ${(props) => (props.isopen ? `0.8rem` : `0`)};
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

export const SidebarLogoutBtn = styled.button`
  color: ${(props) => props.theme.colors.primary};
  width: 100%;
  border: none;
  margin: 0rem;
  padding: 1rem 0 0.75rem 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  margin-top: auto;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.secundary)};
  }
`;

export const PlayerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfilePictureWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const ProfilePicture = styled.img<ProfilePictureProps>`
  width: ${(props) => (props.isopen ? `80px` : `36px`)};
  height: ${(props) => (props.isopen ? `80px` : `36px`)};
  border-radius: 50%;
  transition: width 250ms ease;

  &:hover + button {
    display: block;
  }
`;

export const Nickname = styled.h2<NicknameProps>`
  color: ${(props) => props.theme.colors.primary};
  display: ${(props) => (props.isopen ? "block" : "none")};
  transition: display 250ms ease;
`;

export const Role = styled.span<RoleProps>`
  color: ${(props) => props.theme.colors.primary};
  display: ${(props) => (props.isopen ? "block" : "none")};
  margin-top: 1rem;
`;
