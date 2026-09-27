export default function AddHabit({ habits, setHabits }) {
  function testAdd() {
    setHabits([
      ...habits,
      {
        id: "4",
        name: "Study",
        type: "duration",
        target: 120,
        unit: "minutes",
        color: "#c8f04d",
        completions: {
          "2026-09-11": 90,
          "2026-09-12": 120,
        },
      },
    ]);
  }
  return (
    <>
      <h1>Add Habit</h1>
      <button onClick={testAdd}>Add Test Habit</button>
    </>
  );
}
