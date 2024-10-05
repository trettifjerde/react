import { Goal } from "../utils/types";
import CourseGoal from "./CourseGoal";

export default function CourseGoals({ goals, onDelete }: { goals: Goal[], onDelete: (id: string) => void }) {

    return <ul>
        {goals.map(goal => <li key={goal.id}>
            <CourseGoal
                goal={goal}
                handleDelete={onDelete}
            />
        </li>)
        }
    </ul>
}