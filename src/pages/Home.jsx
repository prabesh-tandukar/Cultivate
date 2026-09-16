export default function Home({ habits }) {
  return (
    <div>
      <h1>home</h1>
      {habits.map((habit) => (
        <div key={habit.id}>
          <h3>{habit.name}</h3>
          <p>
            Target: {habit.target}
            {habit.unit}
          </p>
        </div>
      ))}
    </div>
  );
}
