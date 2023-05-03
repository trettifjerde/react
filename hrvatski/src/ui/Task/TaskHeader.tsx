import React from "react";
import { Sentence } from "../../styles/styledComponents";
import { TaskHeader as Header, Lives } from "./taskStyles";

const TaskHeader: React.FC<{lives: number, instruction: string, maxQ: number, i: number}> = React.memo(({lives, maxQ, i, instruction}) => {
    return (
        <Header>
            <Sentence>{i + 1}/{maxQ}</Sentence>
            <Sentence className="gray">{instruction}</Sentence>
            <Lives>
                <i className={lives < 3 ? 'f' : ''}/>
                <i className={lives < 2 ? 'f' : ''}/>
                <i className={lives < 1 ? 'f' : ''}/>
            </Lives>
        </Header>
    )
});

export default TaskHeader;