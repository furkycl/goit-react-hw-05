import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data);
        setError(null);
      } catch (err) {
        setError("Oyuncular yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    loadCast();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (cast.length === 0) return <p>Oyuncu bilgisi bulunamadı.</p>;

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.item}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : "https://via.placeholder.com/100x150?text=No+Image"
            }
            alt={name}
            className={css.image}
          />
          <p className={css.name}>
            <strong>{name}</strong>
          </p>
          <p className={css.character}>Karakter: {character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
