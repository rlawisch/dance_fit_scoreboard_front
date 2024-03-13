import styled from "styled-components";
import { shade } from "polished";

interface ButtonProps {
  vanilla?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  padding: 0.3rem 0.6rem;
  margin: 0.2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  min-width: auto;

  border-radius: 0.3rem;
  border-style: solid;
  border-color: #dc3545;

  color: ${(props) =>
    props.vanilla
      ? shade(0.5, "#dc3545")
      : "#dc3545"}; // Black text for "update" actionType, white text otherwise
  background-color: ${(props) =>
    props.vanilla
      ? "#dc3545"
      : shade(
          0.5,
          "#dc3545",
        )}; // Yellow background for "update" actionType, light gray otherwise

  &:hover {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.1, "#dc3545")
        : shade(
            0.6,
            "#dc3545",
          )}; // Darken yellow for "update" on hover, light gray otherwise
  }

  &:active {
    background-color: ${(props) =>
      props.vanilla
        ? shade(0.3, "#dc3545")
        : shade(
            0.7,
            "#dc3545",
          )}; // Darken yellow for "update" on active, light gray otherwise
  }

  &:disabled {
    background-color: ${(props) =>
      props.vanilla
        ? shade(-0.3, "#dc3545")
        : shade(
            -0.3,
            "#dc3545",
          )}; // Lighten yellow for "update" when disabled, light gray otherwise
  }
`;
