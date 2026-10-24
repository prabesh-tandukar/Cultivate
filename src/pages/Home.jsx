import HabitCard from "../components/HabitCard";

export default function Home({ habits }) {
  return (
    <div>
      <h1>home</h1>
      {habits.length === 0 && <h1> No habits yet. Add your first one.</h1>}
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
