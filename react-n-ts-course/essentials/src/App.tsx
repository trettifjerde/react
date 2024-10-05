import { FormEventHandler, useState } from "react";
import { Goal } from "./utils/types";
import { GOALS } from "./utils/data";
import Header from "./components/Header";
import goalsImg from './assets/goals.jpg';
import CourseGoals from "./components/CourseGoals";
import CourseForm from "./components/CourseForm";

export default function App() {
  const [goals, setGoals] = useState<Goal[]>(GOALS);

  const addGoal : FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setGoals(prev => ([...prev, {
      id: new Date().getTime().toString(),
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || ''
    }]));

    e.currentTarget.reset();
  };

  const handleDeleteGoal = (id: string) => setGoals(prev => prev.filter(g => g.id !== id));

  return <main>
    <Header image={{ src: goalsImg, alt: "Decoration" }}>
      <h1>Your Course Goals</h1>
    </Header>

    <CourseForm onAddGoal={addGoal} />

    <CourseGoals goals={goals} onDelete={handleDeleteGoal} />
  </main>
}
