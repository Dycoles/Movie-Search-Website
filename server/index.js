import express from "express";
import cors from "cors";
import { fetchPosterForMovie } from "./services/tmdbService.js";
import { db } from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("New API running");
});

app.post("/api/posters/sync", async (req, res) => {

  try {
    const [movies] = await db.query("SELECT id, title FROM movies WHERE poster IS NULL");
    // 2. Fetch poster for each movie
    for (const movie of movies) {
      const posterUrl = await fetchPosterForMovie(movie.title);
      // 3. Update movie record with poster URL
      if (posterUrl) {
        await db.query(
          "UPDATE movies SET poster = ? WHERE id = ?",
          [posterUrl, movie.id]
        );
      }
    }

    res.status(200).json({ message: "Movies updated with posters" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

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
