import { useParams } from "react-router";
import { useState } from "react";

export default function HabitDetail({ habits, logCompletion }) {
  const { id } = useParams();
  const [logDate, setLogDate] = useState(getToday());
  const [logValue, setLogValue] = useState(0);

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

  function getToday() {
    return getLast365Days().at(-1);
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
      return "#3CB371";
    } else if (level === 3) {
      return "#228b22";
    } else if (level === 4) {
      return "#006400";
    }
  }

  const days = getLast365Days();
  const firstDay = new Date(days[0]);
  const startOffset = firstDay.getDay();
  const today = getToday();

  const paddedDays = [];
  for (let i = 0; i < startOffset; i++) {
    paddedDays.push(null);
  }
  paddedDays.push(...days);

  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }
  console.log(weeks);

  let lastMonth = null; // tracks the last month

  const monthLabels = weeks.map((week, weekIndex) => {
    const firstRealDay = week.find((day) => day !== null);

    if (!firstRealDay) {
      return null; // this week has no real days at all (shouldn't normally happen)
    }

    const monthIndex = new Date(firstRealDay).getMonth(); // 0-11
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (monthIndex !== lastMonth) {
      lastMonth = monthIndex;
      return monthNames[monthIndex];
    } else {
      return null;
    }
  });

  return (
    <>
      <h1>Habit Detail</h1>
      <p>{today}</p>
      <p>{current_habit.name}</p>
      <p>{current_habit.target}</p>

      <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
        {monthLabels.map((label, i) => (
          <div key={i} style={{ width: "12px", fontSize: "10px" }}>
            {label}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "2px" }}>
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            style={{ display: "flex", flexDirection: "column", gap: "2px" }}
          >
            {week.map((day, dayIndex) => {
              if (!day) {
                return (
                  <div
                    key={dayIndex}
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                );
              }
              const level = getLevel(day);
              return (
                <div
                  key={dayIndex}
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
        ))}
      </div>
      <div>
        <input
          type="date"
          value={logDate}
          onChange={(e) => setLogDate(e.target.value)}
          max={today}
        />
        {current_habit.type !== "yesno" && (
          <>
            <input
              type="number"
              value={logValue}
              onChange={(e) => setLogValue(e.target.value)}
            />
            <button
              onClick={() =>
                logCompletion(current_habit.id, logDate, Number(logValue))
              }
            >
              Mark Done
            </button>
          </>
        )}

        {current_habit.type === "yesno" && (
          <button onClick={() => logCompletion(current_habit.id, logDate, 1)}>
            Mark Done
          </button>
        )}

        <button onClick={() => logCompletion(current_habit.id, logDate, 0)}>
          Mark Undone
        </button>
      </div>
    </>
  );
}
