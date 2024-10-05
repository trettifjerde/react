import { FormEventHandler } from "react";

export default function CourseForm({onAddGoal}: {onAddGoal: FormEventHandler}) {
    return <form onSubmit={onAddGoal}>
        <p>
            <label htmlFor="title">Your goal</label>
            <input type="text" id="title" name="title" />
        </p>
        <p>
            <label htmlFor="description">Short summary</label>
            <input type="text" id="description" name="description" />
        </p>
        <p>
            <button>Add Goal</button>
        </p>
    </form>
}