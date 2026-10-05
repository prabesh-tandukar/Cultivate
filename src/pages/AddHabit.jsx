import { useState } from "react";
export default function AddHabit({ habits, setHabits }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState("");

  return (
    <>
      <h1>Add Habit</h1>
      <div>
        <div>
          <label htmlFor="">Enter the name of habit:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
