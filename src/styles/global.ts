import styled, { createGlobalStyle, keyframes } from "styled-components";
import "@fontsource/roboto";
import { shade } from "polished";
import { FaChevronRight } from "react-icons/fa6";

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body, input, button, select {
        background: ${(props) => props.theme.colors.background};
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-size: 1rem;
        color: ${(props) => props.theme.colors.text}
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
    }

    button {
        cursor: pointer;
    }

    a,
    a:link,
    a:visited,
    a:focus,
    a:hover,
    a:active {
        text-decoration: none;
    cursor: pointer;
}
`;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 60px);
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
`;

export const GlobalContainer = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem;
  background-color: ${(props) => shade(-0.1, props.theme.colors.background)};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.colors.text};
  overflow-y: auto;
`;

// Header Styles

export const HeaderContainer = styled.header`
  height: 60px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secundary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`


export const HeaderLogo = styled.img`
  width: 60px;
  height: 45.86px;
  margin: 0 8px;
  cursor: pointer;
`

interface DashboardContainerProps {
  isopen: boolean;
}

export const DashboardContainer = styled.main<DashboardContainerProps>`
  margin-left: 4rem;
  transition: margin 350ms ease;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`;

// Home - Singup - Login Styles

export const CustomHrContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  margin: 4px 0;
`

export const CustomHr = styled.hr`
  width: 64px;
  height: 1px;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.primary};
  border: none;
`

export const HomeLogo = styled.img`
  width: 120px;
  height: 91.72px;
`


// Sidebar Styles

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
  margin-top: 2rem;

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.secundary)};
  }
`;

export const SidebarPlayerInfoWrapper = styled.div`
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

export const SidebarProfilePicture = styled.img<ProfilePictureProps>`
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


export const PatchTitle = styled.h2`
    margin: 1rem;
`

export const HorizontalRuler = styled.hr`
    margin: 1rem;
`

export const Added = styled.p`
    color: green;
`

export const Removed = styled.p`
    color: red;
`

export const ContentList = styled.ul`
    list-style: circle;
    margin: 1rem;
`

export const ContentListItem = styled.li`
    margin-bottom: 0.5rem;
`

// Profile Styles

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const ProfilePictureForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

export const UploadBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CropperFullWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-bottom: 2rem;
`;

export const CropperWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  margin-top: 1rem;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const SliderWrapper = styled.div`
  width: 80%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;


export const Table = styled.table`
  text-align: center;
  font-weight: bold;
  width: 100%;

  th,
  td {
    padding: 0.6rem;
  }

  td {
    background-color: ${(props) => shade(0.1, props.theme.colors.background)};
    color: ${({ theme }) => shade(0.1, theme.colors.text)};
  }

  th {
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    color: ${(props) => props.theme.colors.background};
  }

  @media screen and (max-width: 576px) {
    font-size: small;
  }
`;

export const TableWrapper = styled.div``;

export const TableHeader = styled.th``;

export const TableHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableData = styled.td``;

export const TableDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* gap: 1rem; */

  @media screen and (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SmallScreenTableDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const TableDataButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 576px) {
    flex-direction: row;
  }
`;

export const TableRow = styled.tr``;

export const SmallScreenTableDisplay = styled.div`
  @media screen and (max-width: 900px) {
    display: block;
  }

  @media screen and (min-width: 900px) {
    display: none;
  }
`;

export const LargeScreenTableDisplay = styled.div`
  @media screen and (max-width: 900px) {
    display: none;
  }

  @media screen and (min-width: 900px) {
    display: block;
  }
`;

export const TableScoreDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 41.8px;
  margin-bottom: 1rem;

  @media screen and (min-width: 576px) {
    flex-direction: row;
  }
`;

export const TableScoreValue = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const EventInfoWrapper = styled.div``;

export const PlayerMiniature = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const PlayerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;

  @media screen and (min-width: 576px) {
    flex-direction: row;
  }
`;

export const PlayerLi = styled.li`
  list-style: none;
  padding: 0.6rem;
  font-weight: normal;

  &:hover {
    background-color: ${(props) => shade(0.3, props.theme.colors.background)};
    cursor: pointer;
  }
`;

export const PhaseTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  @media screen and (min-width: 576px) {
    flex-direction: row;
  }
`;

export const PhaseHeaderPassSpan = styled.span`
  font-size: 14px;
  position: relative;

  @media screen and (min-width: 576px) {
    bottom: 5px;
  }
`;

export const PhasePassSpan = styled.span`
  font-size: 14px;
  position: relative;
  color: green;

  @media screen and (min-width: 576px) {
    bottom: 5px;
    right: 5px;
  }
`;

export const PhaseBreakSpan = styled.span`
  font-size: 8px;
  position: relative;
  color: red;

  @media screen and (min-width: 576px) {
    bottom: 5px;
    right: 5px;
  }
`;

export const MusicLi = styled.li`
  list-style: none;
  padding: 0.6rem;
  font-weight: normal;
  color: ${(props) => props.theme.colors.primary};

  &:hover {
    background-color: ${(props) => shade(0.3, props.theme.colors.background)};
    cursor: pointer;
  }
`;
export const SelectedMusicWrapper = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectedPlayerWrapper = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MusicListDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MusicLevelMiniature = styled.img`
  width: 48.4px;
  height: 40px;
`;

export const MusicWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  text-align: left;
  max-width: 50%;
  gap: 0.5rem;

  @media screen and (min-width: 576px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
  }
`;

export const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DeleteWarning = styled.p`
  color: red;

  ul {
    text-align: center;
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.text};
  margin: 2rem 0;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

// Dynamic Event Styles

export const ScoreDGPreviewWrapper = styled.div`
  button {
    position: fixed;
    top: 40%;
    left: calc(50% + 110px);
    transform: translateX(-50%);
    z-index: 99;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    @media screen and (min-width: 576px) {
      top: 20%;
    }
  }
`;

export const ScoreDGPReview = styled.img`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 98;
  max-width: 260px;
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  @media screen and (min-width: 576px) {
    top: 20%;
  }
`;

export const DynamicEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const NavigationHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;

  margin-bottom: 32px;
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export interface NavigationContainerProps {
  open: boolean;
}

export const NavigationContainer = styled.div<NavigationContainerProps>`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  padding: 0.6rem;
  gap: 0.6rem;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: ${(props) => (props.open ? "translateY(0)" : "translateY(-20px)")};
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  animation: ${(props) => (props.open ? slideDown : "none")} 0.5s ease;
`;

export const NavigationTitle = styled.h2`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

export const ChevronIcon = styled(FaChevronRight)<{ open: boolean }>`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.open ? "rotate(90deg)" : "rotate(0deg)")};
`;

export interface NavigationSelectorProps {
  isSelected: boolean;
}

export const NavigationSelector = styled.h3<NavigationSelectorProps>`
  color: ${(props) =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.text};
  cursor: pointer;
  transform: translateY(0);

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const DynamicEventTable = styled.table`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.primary};
  display: none;
  text-align: center;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const DynamicEventTh = styled.th`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

export const DynamicEventTd = styled.td`
  padding: 1rem;
  width: 1%;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

export const DynamicEventScoreTable = styled.table`
  width: 100%;
  font-size: smaller;

  @media screen and (min-width: 400px) {
    font-size: medium;
  }

  td {
    padding: 1rem 0.5rem;
  }
`;

export const DyEvPlayerScoreListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    flex-direction: column;
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const DynamicEventScoreDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media screen and (min-width: 576px) {
    flex-direction: row;
  }
`;

export const SmallScreenDynamicEventTable = styled.table`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.primary};
  text-align: center;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const SmallScreeDynamicEventTableHeader = styled.th`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
`;

export const RankingMedal = styled.img`
  width: 34px;
  height: 41px;
`;

export const DynamicEventApprovedScoreWarning = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(81, 140, 70, 0.8); // Slightly transparent green
  border-radius: 8px;
  padding: 0.3rem;

  h4 {
    margin: 1rem 0;
  }
`;

export const DynamicEventPendingScoreWarning = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(140, 137, 70, 0.8); // Slightly transparent yellowish
  border-radius: 8px;
  padding: 0.3rem;
  margin: 0.3rem 0;
  margin-bottom: 1rem;

  h4 {
    margin: 1rem 0;
  }
`;
export const DynamicEventScoreSubmissionWarning = styled.p`
  color: red;
  background-color: black;
  padding: 0.3rem;
`;
