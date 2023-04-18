import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const PracticeContatiner = styled.div`

    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    a {
        display: block;
        color: white;
        padding: 5rem;
        background-color: transparent;
        transition: background-color .3s;
        border-radius: 5px;
        
        &:hover {
            background-color: var(--primary-color);
        }
    }
`;

const Home = () => {
    return (
        <PracticeContatiner>
            <NavLink to="vocabulary">
                Vocabulary
            </NavLink>
            <NavLink to="translate">
                Translate
            </NavLink>
        </PracticeContatiner>
    )
}

export default Home;