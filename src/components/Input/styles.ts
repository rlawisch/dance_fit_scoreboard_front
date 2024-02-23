import styled from "styled-components";

export const StyledInput = styled.div`
  padding: 0.6rem 1rem;
  margin: 0.8rem;
  background: transparent;
  min-width: 100px;

  div {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    padding: 0.6rem;
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-radius: 0.3rem;

    display: flex;

    svg {
      color: ${(props) => props.theme.colors.primary};
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
    overflow-wrap: break-word;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.6rem;
  height: 1rem;
  padding: 0.2rem;
  text-align: right;
`;

export const Label = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: small;
`;
