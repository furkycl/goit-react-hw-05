import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (err) {
        setError("Trend filmler alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  return (
    <div className={css.page}>
      <h1 className={css.title}>Günün Trend Filmleri</h1>
      {loading && <p>Yükleniyor...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
