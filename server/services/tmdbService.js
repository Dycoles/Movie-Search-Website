const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function fetchPosterForMovie(title) {
  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(title)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  const posterPath = data.results[0].poster_path;

  if (!posterPath) {
    return null;
  }

  return `${IMAGE_BASE_URL}${posterPath}`;
}
