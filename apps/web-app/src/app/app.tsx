import useVacancies from './use-vacancies/use-vacancies';

export function App() {
  const { vacancies } = useVacancies();

  return (
    <div>
      {vacancies.map((vacancy) => (
        <div key={vacancy.url}>
          <a href={vacancy.url}>{vacancy.name} [{vacancy.messageType}]</a>
        </div>
      ))}
    </div>
  );
}

export default App;
