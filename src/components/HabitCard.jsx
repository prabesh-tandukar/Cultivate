export default function HabitCard({ habit }) {
  return (
    <div>
      <h3>{habit.name}</h3>
      <p>
        Target: {habit.target} {habit.unit}
      </p>
    </div>
  );
}
