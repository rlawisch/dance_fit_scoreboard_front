import styled from "styled-components";
import { shade } from "polished";

interface ButtonProps {
  vanilla: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  padding: 0.3rem 0.6rem;
  margin: 0.2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  min-width: auto;

  border-radius: 0.3rem;
  border-style: solid;
  border-color: ${(props) =>
    props.vanilla ? props.theme.colors.primary : props.theme.colors.primary};

  color: ${(props) =>
    props.vanilla
      ? shade(0.7, props.theme.colors.primary)
      : props.theme.colors.primary};
  background-color: ${(props) =>
    props.vanilla
      ? props.theme.colors.primary
      : shade(0.5, props.theme.colors.primary)};

  &:hover {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.1, props.theme.colors.primary)
        : shade(0.6, props.theme.colors.primary)};
  }

  &:active {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.3, props.theme.colors.primary)
        : shade(0.7, props.theme.colors.primary)};
  }

  &:disabled {
    background-color: ${(props) =>
      props.vanilla
        ? shade(-0.3, props.theme.colors.primary)
        : shade(-0.3, props.theme.colors.primary)};
  }
`;

export const ButtonContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
