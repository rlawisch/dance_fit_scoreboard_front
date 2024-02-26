import { shade } from "polished";
import styled from "styled-components";

export const CategoryTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 2rem 0;
`;

export const PhaseTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 2rem 0;
`;

export const ScoreboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;

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

  @media (max-width: 768px) {
    // mobile

    text-align: center;
    position: relative;
  }

  @media (min-width: 769px) {
    // PC
  }
`;

export const TableWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
`;

export const ResponsiveTableWrapper = styled.div``;

export const ResponsiveTableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  text-align: left;
`;

export const ResponsiveTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const ResponsiveTableCell = styled.td`
  padding: 8px;
`;

export const PlayerInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;

export const SmallScreenTableDisplay = styled.div`
  @media screen and (max-width: 768px) {
    display: block;
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const LargeScreenTableDisplay = styled.div`
  @media screen and (max-width: 769px) {
    display: none;
  }

  @media screen and (min-width: 769px) {
    display: block;
  }
`;
