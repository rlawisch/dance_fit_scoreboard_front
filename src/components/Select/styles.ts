import styled from "styled-components";

export const StyledSelect = styled.select`
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.3rem;
  padding: 0.6rem 1rem;
  outline: none;
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.primary};
    height: 1.4rem;
    width: 1.4rem;
  }

  option {
    position: relative;
    left: 10px;
  }
`;

export const SelectContainer = styled.div`
  padding: 0.6rem 1rem;
  margin: 0.8rem;
  background: transparent;
  min-width: 100px;

  display: flex;
  flex-direction: column;

  svg {
    color: ${(props) => props.theme.colors.primary};
    height: 1.4rem;
    width: 1.4rem;
  }
`;
