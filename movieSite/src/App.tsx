import './App.css'
import type { Movie } from './types/movie';
import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data: Movie[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading movies...</div>;
  }
  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
  <div className="min-h-screen bg-zinc-800 p-8 text-white">
    <h1 className="text-3xl font-bold mb-6">Movies</h1>
    {movies.length === 0 ? (<p className="text-center">No movies available.</p> ) : (
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.id} className="p-4 border rounded shadow bg-zinc-700">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-400">Rating: {movie.rating}/10</p>
          </li>
        )
      )}
      </ul>
      )}
  </div>
  );
}

export default App
