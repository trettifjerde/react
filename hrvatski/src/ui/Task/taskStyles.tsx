import styled from "styled-components";

export const TaskContainer = styled.div`
    animation: fadeIn .3s;
    max-width: 800px;
    margin: auto;
    padding-block: 10vh;
    height: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
`;

export const Task = styled.div`
    overflow: auto;
    min-height: 60vh;
`;

export const TaskText = styled.div`
    font-size: 1.5rem;
    margin-block: 2rem;
`;

export const TaskHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Lives = styled.div`
    color: var(--primary-color);
    text-align: right;

    & i::before {
        font-size: 2.5rem;
        content: '♥';
    }
    & i.f::before {
        content: '♡';
    }
`;