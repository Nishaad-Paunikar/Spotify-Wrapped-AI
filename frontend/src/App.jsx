import './App.css';

function App() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/login'; // replace with backend URL if needed
  };

  return (
    <div className="app">
      <h1>Spotify Wrapped AI 🎧</h1>
      <p>Login to see your AI-generated Wrapped summary</p>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default App;
