import { shade } from "polished";
import styled from "styled-components";

export const AdminDashboardEventContainer = styled.div`
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;

  th,
  td {
    padding: 0.8rem;
  }

  td {
    background-color: ${(props) => shade(0.1, props.theme.colors.background)};
    color: ${({ theme }) => shade(0.1, theme.colors.primary)};
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${(props) => props.theme.colors.secundary};
  }
`;

export const CategoryTable = styled.table`
  width: 100%;
  border-collapse: separate;

  th,
  td {
    padding: 0.8rem;
  }

  td {
    background-color: ${(props) => shade(0.1, props.theme.colors.background)};
    color: ${({ theme }) => shade(0.1, theme.colors.primary)};
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${(props) => props.theme.colors.secundary};
  }

  td {
    cursor: pointer;
    &:hover {
      background-color: ${(props) => shade(0.3, props.theme.colors.background)};
    }
  }
`;

export const TableHeaderWrapper = styled.th`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;

export const EventTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  margin: 2rem 0;
  text-align: center;
`;
