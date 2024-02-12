import styled from "styled-components";



export const EventCardContainer = styled.div`
    border-radius: 0.5rem;
    background-color: ${props => props.theme.colors.secundary};
    color: ${props => props.theme.colors.primary};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

    padding: 1rem 2rem;
    margin: 1rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    a {
        text-decoration: none !important;
        color: ${props => props.theme.colors.text}
    }
`