import styled, { css } from "styled-components";

export const StyledInput = styled.div`
  padding: 0.6rem 1rem;
  margin: 0.8rem;
  background: transparent;

  div {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    padding: 0.6rem;
    border: 1px solid var(--malachite-700);
    border-radius: 0.3rem;

    display: flex;

    svg {
      height: 1.4rem;
      width: 1.4rem;
    }
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    margin-left: 0.4rem;
    width: 100%;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.6rem;
  height: 1rem;
  padding: 0.2rem;
  text-align: right;
`;