import { useState } from "react";
export default function AddHabit({ habits, setHabits }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("yesno");
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState("");

  const handleTypeChange = (e) => {
    //to convert HTMLSelectElement's selected options to an array of value
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setType(values);
  };

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
          <select value={type} onChange={handleTypeChange}>
            <option value="yesno">Yes/No</option>
            <option value="quantity">Quantity</option>
            <option value="duration">Duration</option>
          </select>
        </div>
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
      </div>
    </>
  );
}
