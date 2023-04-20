import React, { ReactNode } from "react"
import Comment, { ScoreHeader } from "./Comment";
import { Mini } from "../../styles/styledComponents";

const Score: React.FC<{
    visible: boolean, 
    lives: number, 
    children: ReactNode, 
    score: number,
    maxQ: number 
}> = React.memo(({visible, lives, children, score, maxQ}) => {
    return (
        <Comment visible={visible} type="main">
            <ScoreHeader>{lives < 0 ? 'Whoops, you\'re dead :(' : 'Congratulations!' }</ScoreHeader>
            <Mini>Your score is</Mini>
            <h3>{score}/{maxQ}</h3>
            {children}
        </Comment>
    )
});

export default Score;