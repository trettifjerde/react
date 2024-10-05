import { Goal } from "../utils/types";

export default function CourseGoal({goal, handleDelete}: {goal: Goal, handleDelete: (id: string) => void}) {
    const {title, id, description} = goal;
    return <article>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <button type="button" onClick={() => handleDelete(id)}>Delete</button>
    </article>
}