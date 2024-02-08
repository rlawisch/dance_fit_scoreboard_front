import styled from "styled-components";

export const FormContainer = styled.div`
  padding: 0.6rem 1rem;
  margin: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${props => props.theme.colors.primary};
  }
`;
