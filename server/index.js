import express from "express";
import cors from "cors";
import { fetchPosterForMovie } from "./services/tmdbService.js";
import { db } from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// confirm server is running
app.get("/", (req, res) => {
  res.send("New API running");
});

// Endpoint to sync posters for movies without them
app.post("/api/posters/sync", async (req, res) => {
  try {
    const [movies] = await db.query("SELECT id, title FROM movies WHERE poster IS NULL");
    // 2. Fetch poster for each movie
    for (const movie of movies) {
      const posterUrl = await fetchPosterForMovie(movie.title);
      // 3. Update movie record with poster URL in the database
      if (posterUrl) {
        await db.query(
          "UPDATE movies SET poster = ? WHERE id = ?",
          [posterUrl, movie.id]
        );
      }
    }
    // 4. Return success response
    res.status(200).json({ message: "Movies updated with posters" });
  } catch (err) {
    // Handle errors (e.g., database errors, TMDB API errors)
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint to get all movies
app.get("/api/movies", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM movies");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
