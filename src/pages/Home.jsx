import HabitCard from "../components/HabitCard";

export default function Home({ habits }) {
  return (
    <div>
      <h1>home</h1>
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
