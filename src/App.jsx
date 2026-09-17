import { Routes, Route, Link } from "react-router";
import Home from "./pages/home";
import AddHabit from "./pages/AddHabit";
import HabitDetail from "./pages/HabitDetail";
import { useState } from "react";

export default function App() {
  const [habits, setHabits] = useState([
    {
      id: "1",
      name: "Study",
      type: "duration",
      target: 120,
      unit: "minutes",
      color: "#c8f04d",
      completions: {
        "2026-09-01": 90,
        "2026-09-02": 120,
      },
    },
    {
      id: "2",
      name: "Workout",
      type: "duration",
      target: 120,
      unit: "minutes",
      color: "#c8f04d",
      completions: {
        "2026-09-01": 90,
        "2026-09-02": 120,
      },
    },
    {
      id: "3",
      name: "Walk",
      type: "duration",
      target: 120,
      unit: "minutes",
      color: "#c8f04d",
      completions: {
        "2026-09-01": 90,
        "2026-09-02": 120,
      },
    },
  ]);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Habit</Link>
        <Link to="/habit/1">HabitDetail</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home habits={habits} />} />
        <Route path="/add" element={<AddHabit />} />
        <Route path="/habit/:id" element={<HabitDetail habits={habits} />} />
      </Routes>
    </>
  );
}
