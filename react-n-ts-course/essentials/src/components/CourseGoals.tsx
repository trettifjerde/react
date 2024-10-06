import { ReactNode } from "react";
import { Goal } from "../utils/types";
import CourseGoal from "./CourseGoal";
import InfoBox from "./InfoBox";

export default function CourseGoals({ goals, onDelete }: { goals: Goal[], onDelete: (id: string) => void }) {

    if (goals.length === 0)
        return <InfoBox mode="hint">
            You have no course goals yet
        </InfoBox>

    let warningBox: ReactNode;

    if (goals.length >= 4)
        warningBox = <InfoBox mode="warning" severity="low">
            You're collecting too many goals. Don't put too much on your plate!
        </InfoBox>

    return <>
        {warningBox}
        <ul>
            {goals.map(goal => <li key={goal.id}>
                <CourseGoal
                    goal={goal}
                    handleDelete={onDelete}
                />
            </li>)
            }
        </ul>
    </>
}