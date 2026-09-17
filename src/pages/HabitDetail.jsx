import { useParams } from "react-router";

export default function HabitDetail({ habits }) {
  const { id } = useParams();
  let current_habit;

  for (const habit of habits) {
    if (habit.id === id) {
      current_habit = habit;
    }
  }

  if (!current_habit) return <p>Habit not found</p>;

  function getLast365Days() {
    const dates = [];
    const end = new Date();
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);

    const current = new Date(start);
    while (current <= end) {
      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, "0");
      const dd = String(current.getDate()).padStart(2, "0");
      dates.push(`${yyyy}-${mm}-${dd}`);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  function getLevel(dateStr) {
    const value = current_habit.completions[dateStr];
    if (!value) return 0;
    if (current_habit.type === "yesno") return 4;
    const percent = (value / current_habit.target) * 100;

    if (percent >= 100) {
      return 4;
    } else if (percent >= 70) {
      return 3;
    } else if (percent >= 40) {
      return 2;
    } else {
      return 1;
    }
  }

  function getColor(level) {
    //return a hex color based on level 0-4
    if (level === 0) {
      return "#808080";
    } else if (level === 1) {
      return "#98FB98";
    } else if (level === 2) {
      return "#90ee90";
    } else if (level === 3) {
      return "#228b22";
    } else if (level === 4) {
      return "#006400";
    }
  }

  const days = getLast365Days();

  return (
    <>
      <h1>Habit Detail</h1>
      <p>{current_habit.name}</p>
      <p>{current_habit.target}</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2px",
          maxWidth: "700px",
        }}
      >
        {days.map((day) => {
          const level = getLevel(day);
          return (
            <div
              key={day}
              title={day}
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: getColor(level),
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}
