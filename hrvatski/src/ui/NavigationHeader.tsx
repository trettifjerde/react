import NavigationItem from "./NavigationItem";

import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    flex-flow: row-wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-weight: 600;
`;

const NavigationHeader = () => {
    return (
        <Nav>
            <NavigationItem path="/" text="Practice" />
            <NavigationItem path="/signin" text="Sign in" />
        </Nav>
    )
}

export default NavigationHeader;