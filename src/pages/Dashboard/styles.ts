import styled from "styled-components";

interface DashboardContainerProps {
  isopen: boolean;
}

export const DashboardContainer = styled.main<DashboardContainerProps>`
  margin-left: ${(props) => (props.isopen ? "10rem" : "4rem")};
  transition: margin 350ms ease;
  height: auto;
  box-sizing: border-box;
`;
