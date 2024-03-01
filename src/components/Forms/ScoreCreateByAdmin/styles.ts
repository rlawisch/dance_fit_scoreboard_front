import { shade } from "polished";
import styled from "styled-components";

export const PlayerLi = styled.li`
  list-style: none;
  padding: 0.6rem;
  font-weight: normal;

  &:hover {
    background-color: ${(props) => shade(0.3, props.theme.colors.background)};
    cursor: pointer;
  }
`;

export const SelectedPlayerWrapper = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
