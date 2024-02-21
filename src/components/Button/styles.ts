import styled from "styled-components";
import { shade } from "polished";

interface ButtonProps {
  vanilla: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.3rem 0.6rem;
  margin: 0.2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  min-width: auto;

  border-radius: 0.3rem;
  border-style: solid;
  border-color: ${(props) =>
    props.vanilla ? props.theme.colors.primary : props.theme.colors.primary};

  color: ${(props) =>
    props.vanilla ? props.theme.colors.secundary : props.theme.colors.primary};
  background-color: ${(props) =>
    props.vanilla ? props.theme.colors.primary : props.theme.colors.background};

  &:hover {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.1, props.theme.colors.primary)
        : shade(0.1, props.theme.colors.background)};
  }

  &:active {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.3, props.theme.colors.primary)
        : shade(0.3, props.theme.colors.background)};
  }

  &:disabled {
    background-color: ${(props) =>
      props.vanilla
        ? shade(-0.3, props.theme.colors.primary)
        : shade(-0.3, props.theme.colors.background)};
  }
`;

export default StyledButton;
