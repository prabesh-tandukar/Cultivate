export function previousDay(dateStr) {
  const splitDate = dateStr.split("-");
  const year = Number(splitDate[0]);
  const month = Number(splitDate[1]);
  const day = Number(splitDate[2]);
  const dateNew = new Date(year, month - 1, day);
  dateNew.setDate(dateNew.getDate() - 1);
  const yyyy = dateNew.getFullYear();
  const mm = String(dateNew.getMonth() + 1).padStart(2, "0");
  const dd = String(dateNew.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export function isCompleted(habit, date) {
  return habit.completions[date] > 0;
}

export function getCurrentStreak(habit, today) {
  let streak = 0;
  let day = today;
  let misses = 0;
  if (!isCompleted(habit, day)) {
    day = previousDay(day);
  }

  while (misses < 2) {
    if (isCompleted(habit, day)) {
      streak++;
      misses = 0;
    } else {
      misses++;
    }

    day = previousDay(day);
  }
  return streak;
}
