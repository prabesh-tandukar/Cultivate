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

export function getBestStreak(habit, today) {
  const earliest = Object.keys(habit.completions).sort()[0];
  let bestStreak = 0;
  let currentRun = 0;
  let misses = 0;
  let day = today;
  while (earliest <= day) {
    if (isCompleted(habit, day)) {
      currentRun++;
      misses = 0;
      if (currentRun > bestStreak) {
        bestStreak = currentRun;
      }
    } else {
      misses++;
      if (misses === 2) {
        currentRun = 0;
      }
    }
    day = previousDay(day);
  }
  return bestStreak;
}
