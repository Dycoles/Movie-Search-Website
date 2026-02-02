import './App.css'
import MovieList from './components/MovieList';
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
      <MovieList movies={movies} />
  </div>
  );
}

export default App
