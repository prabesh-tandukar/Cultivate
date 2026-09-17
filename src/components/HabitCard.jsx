import { Link } from "react-router";

export default function HabitCard({ habit }) {
  return (
    <Link to={`/habit/${habit.id}`}>
      <div>
        <h3>{habit.name}</h3>
        <p>
          Target: {habit.target} {habit.unit}
        </p>
      </div>
    </Link>
  );
}
