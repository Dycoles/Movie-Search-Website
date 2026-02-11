// Search API
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// Base URL for poster images (w500 size)
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function fetchPosterForMovie(title) {
  // Search for movie by title
  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(title)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  // If no results or no poster path, return null
  if (!data.results || data.results.length === 0) {
    return null;
  }
  // Get poster path from the first search result
  const posterPath = data.results[0].poster_path;

  // If poster path is null, return null
  if (!posterPath) {
    return null;
  }
  // Construct full poster URL and return
  return `${IMAGE_BASE_URL}${posterPath}`;
}
