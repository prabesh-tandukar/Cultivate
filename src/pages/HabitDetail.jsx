import { useParams } from "react-router";

export default function HabitDetail() {
  const { id } = useParams();
  return <h1>Habit Detail #{id}</h1>;
}
