import type { Movie } from '../types/movie';
function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className='text-center space-y-4 bg-zinc-900 p-4 rounded-lg shadow-md'>
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <img src={movie.poster} alt={movie.title} className="w-full h-128 object-cover rounded shadow bg-zinc-900" />
            <p className="text-gray-400">Rating: {movie.review}/10</p>
        </div>
    );
}

export default MovieCard;