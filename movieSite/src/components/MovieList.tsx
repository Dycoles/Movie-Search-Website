import MovieCard from "./MovieCard";
import type { Movie } from '../types/movie';

function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

export default MovieList;