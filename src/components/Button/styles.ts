import styled from "styled-components";
import { shade } from "polished";

interface ButtonProps {
  vanilla: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.6rem 1rem;
  margin: 0.8rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  min-width: 128px;

  border-radius: 0.3rem;
  border-width: 1px;
  border-style: solid;

  color: ${(props) => props.theme.colors.text};
  border-color: ${(props) => props.theme.colors.text};
  background-color: ${(props) =>
    props.vanilla ? props.theme.colors.primary : props.theme.colors.background};

  &:hover {
    background-color: ${(props) =>
      props.vanilla ? shade(0.1, props.theme.colors.primary) : shade(0.1, props.theme.colors.background)};
  }

  &:active {
    background-color: ${(props) =>
      props.vanilla ? shade(0.3, props.theme.colors.primary) : shade(0.3, props.theme.colors.background)};
  }

  &:disabled {
    background-color: ${(props) =>
      props.vanilla ?  shade(-0.3, props.theme.colors.primary) : shade(-0.3, props.theme.colors.background)};
  }
`;

export default StyledButton;
