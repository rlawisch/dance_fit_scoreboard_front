import styled, { css } from "styled-components";

interface ButtonProps {
  vanilla: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.6rem 1rem;
  margin: 0.8rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  border-radius: 0.3rem;
  border-width: 1px;
  border-style: solid;

  background-color: ${(props) =>
    props.vanilla ? css`var(--malachite-500)` : `white`};
  color: ${(props) =>
    props.vanilla ? css`var(--malachite-50)` : css`var(--malachite-700)`};
  border-color: ${(props) =>
    props.vanilla ? css`var(--malachite-500)` : css`var(--malachite-700)`};

  &:hover {
    background-color: ${(props) =>
      props.vanilla ? css`var(--malachite-600)` : css`var(--malachite-50)`};
    color: ${(props) =>
      props.vanilla ? css`var(--malachite-50)` : css`var(--malachite-700)`};
    border-color: ${(props) =>
      props.vanilla ? css`var(--malachite-600)` : css`var(--malachite-700)`};
  }

  &:active {
    background-color: ${(props) =>
      props.vanilla ? css`var(--malachite-700)` : css`var(--malachite-100)`};
    color: ${(props) =>
      props.vanilla ? css`var(--malachite-50)` : css`var(--malachite-700)`};
    border-color: ${(props) =>
      props.vanilla ? css`var(--malachite-700)` : css`var(--malachite-700)`};
  }

  &:disabled {
    background-color: ${(props) =>
      props.vanilla ? css`var(--malachite-200)` : `white`};
    color: ${(props) =>
      props.vanilla ? css`var(--malachite-700)` : css`var(--malachite-700)`};
    border-color: ${(props) =>
      props.vanilla ? css`var(--malachite-200)` : css`var(--malachite-700)`};
  }
`;

export default StyledButton;
