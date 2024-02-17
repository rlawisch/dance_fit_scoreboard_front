import styled from "styled-components";

export const SelectWrapper = styled.select`
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;
