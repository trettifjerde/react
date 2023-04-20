import { Fragment, FC, memo } from "react"
import Comment from "./Comment"
import { Feedback } from "../../types"
import { H5 } from "../../styles/styledComponents"

const TaskComments: FC<{feedback: Feedback, answer: string}> = memo(({feedback, answer}) => {
    return (
        <Fragment>
            <Comment visible={feedback === true} type="success"></Comment>
            <Comment visible={feedback === false} type="fail">
                <div><H5>{answer}</H5></div>
            </Comment>
        </Fragment>
    )
})

export default TaskComments