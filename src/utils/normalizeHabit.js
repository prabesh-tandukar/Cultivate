export function normalizeHabit(habit) {
  return {
    restDays: [],
    ...habit,
  };
}
