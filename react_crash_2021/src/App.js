
function App() {
  const name = "Oluwatobi"
  const item = true;
  return (
    <div className="container">
      <h1>This is a react app</h1>
      <h2> My name is {name}</h2>
      <p>This is a tenary of {item ? 'Yes': 'NO'}</p>
    </div>
  );
}

export default App;
