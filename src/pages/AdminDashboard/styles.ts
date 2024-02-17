import styled from "styled-components";

interface AdminDashboardContainerProps {
  isopen: boolean;
}

export const DashboardContainer = styled.main<AdminDashboardContainerProps>`
  margin-left: ${(props) => (props.isopen ? "12rem" : "5rem")};
  transition: margin 350ms ease;
  height: auto;
  box-sizing: border-box;
`;
