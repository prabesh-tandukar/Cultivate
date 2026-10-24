import { Routes, Route, Link } from "react-router";
import Home from "./pages/home";
import AddHabit from "./pages/AddHabit";
import HabitDetail from "./pages/HabitDetail";
import { useState, useEffect } from "react";

export default function App() {
  const [habits, setHabits] = useState(() => {
    let storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      return JSON.parse(storedHabits);
    } else {
      return [];
    }
  });
  function logCompletion(habitId, date, value) {
    const newHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        return {
          ...habit,
          completions: { ...habit.completions, [date]: value },
        };
      }
      return habit;
    });
    setHabits(newHabits);
  }

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Habit</Link>
        {/* <Link to="/habit/1">HabitDetail</Link> */}
      </nav>

      <Routes>
        <Route path="/" element={<Home habits={habits} />} />
        <Route
          path="/add"
          element={<AddHabit habits={habits} setHabits={setHabits} />}
        />
        <Route
          path="/habit/:id"
          element={
            <HabitDetail habits={habits} logCompletion={logCompletion} />
          }
        />
      </Routes>
    </>
  );
}
