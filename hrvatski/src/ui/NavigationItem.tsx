import styled from "styled-components";
import React from "react";
import { NavLink} from 'react-router-dom';

const NavItem = styled.li`
    padding: 1rem;
    transition: color .3s;
    color: var(--primary-color);

    &:hover {
        color: white;
    }

    .active & {
        color: white;
        cursor: default;
    }
`;

const NavigationItem : React.FC<{path: string, text: string}> = ({path, text}) => {
    return (
        <NavLink to={path}>
            <NavItem>{text}</NavItem>
        </NavLink>
    )
}

export default NavigationItem;