import styled from "styled-components"

interface DashboardContainerProps {
    isopen: boolean
}

export const DashboardContainer = styled.main<DashboardContainerProps>`
    margin-left: ${props => props.isopen ? '12rem' : '5rem'};
    transition: margin 350ms ease;
    height: auto;
    box-sizing: border-box;
`