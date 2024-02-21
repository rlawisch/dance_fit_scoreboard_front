import { shade } from "polished";
import styled from "styled-components";

export const CategoryTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 2rem 0;
`;

export const ScoreboardTable = styled.table`
  width: 100%;
  border-collapse: separate;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px;
    border: 0.3rem solid ${(props) => shade(0.1, props.theme.colors.background)};
    border-radius: 0.3rem;
    background-color: ${(props) => shade(0.1, props.theme.colors.background)};
    color: ${({ theme }) => shade(0.1, theme.colors.primary)};
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${(props) => props.theme.colors.secundary};
  }
`;
