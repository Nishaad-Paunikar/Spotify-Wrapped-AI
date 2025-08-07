import './App.css';

function App() {
  const handleLogin = () => {
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=91efe116441b4b5aaa21f8a8a590058d&response_type=code&redirect_uri=https://example.com/callback&scope=user-top-read%20user-read-recently-played'; // replace with backend URL if needed
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
