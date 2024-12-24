import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://dummyapi.online/api/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      <h1>Movie Database</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              src={movie.image} 
              alt={movie.movie}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
            <h2>{movie.movie}</h2>
            <p>Rating: {movie.rating}/10</p>
            <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">
              View on IMDB
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
