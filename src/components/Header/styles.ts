import styled from "styled-components";

export const Container = styled.header`
    height: 60px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.secundary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
`