import styled from "styled-components";

export const AdminDashboardEventContainer = styled.div`
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
  }

  h1 {
    margin: 2rem 0;
  }
`;

export const EventTopButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EventTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    align-self: flex-start;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;

  th,
  td {
    padding: 8px;
    border: 0.3rem solid ${(props) => props.theme.colors.background};
    border-radius: 0.3rem;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${props => props.theme.colors.secundary}
  }
`;

export const TableDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`

export const EventTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-justify: newspaper;
`
