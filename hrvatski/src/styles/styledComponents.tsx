import styled from "styled-components";

export const H3 = styled.h3`
    font-size: 1.5rem;
`;

export const H5 = styled.h5`
    font-size: 1.3rem;
    font-weight: 400;
`;

export const Mini = styled.div`
    font-size: 0.85rem;
    margin-block: 1rem;
`;

export const Sentence = styled.div`
    margin-block: 1.5rem;
`;

export const WordSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-height: 6rem;
    margin-block: 0.5rem;
    padding: 1rem;
    gap: 0.5rem;

    &.selected {
        width: 100%;
        background-color: var(--secondary-lighter);
        border-radius: 5px;
    }
`;

export const Word = styled.div`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid var(--primary-color);
    background-color: transparent;
    transition: background-color .2s;
    cursor: pointer;

    .selected &, &.off:hover, &.g-s { background-color: var(--primary-color); }
    .selected &:hover { background-color: transparent;}

    .selected &.enter { animation: popIn .15s forwards;}
    .selected &.exit { animation: fadeOut .15s forwards;}

    &.off { 
        animation: popIn .2s forwards;
     }
    &.on { 
        animation: popOut .2s forwards;
        cursor: default;
    }
`;

export const Grid = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 1.5rem;
    animation: swipeLeft .2s ease-out;

    a {
        display: block;
        color: white;
        padding: 5rem;
        background-color: var(--secondary-lighter);
        transition: background-color .3s;
        border-radius: 5px;
        
        &:hover {
            background-color: var(--primary-color);
        }
    }
`;

export const Textarea = styled.textarea`
    height: 20vh;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: var(--secondary-lighter);
    resize: none;
    outline: none;
    transition: border-color .3s;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 18px;
    padding: 3rem;
    line-height: 3rem;
    color: white;
    text-align: center;

    &:focus {
        border-color: var(--primary-color);
    }
`;

export const Purple = styled.span`
    font-weight: 600;
    color: var(--primary-color);
    margin-inline: 0.4rem;
    text-decoration: underline;
`

export const WordContainer = styled.div`

`;