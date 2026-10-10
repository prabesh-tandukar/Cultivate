import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddHabit({ habits, setHabits }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("yesno");
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    //guard clause
    if (name === "") return;
    if (type !== "yesno" && (target === "" || Number(target) === 0)) return;

    //habit object
    const newHabit = {
      id: String(Date.now()),
      name: name,
      type: type,
      target: Number(target),
      unit: unit,
      color: "#4ade80",
      completions: {},
    };

    //adding new habit to existing habit
    setHabits([...habits, newHabit]);

    //go to detail page
    navigate(`/habit/${newHabit.id}`);
  }

  return (
    <>
      <h1>Add Habit</h1>
      <div>
        <div>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor=""> Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="yesno">Yes/No</option>
            <option value="quantity">Quantity</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        {type !== "yesno" && (
          <>
            <div>
              <label htmlFor="">Target</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Unit</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          </>
        )}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
