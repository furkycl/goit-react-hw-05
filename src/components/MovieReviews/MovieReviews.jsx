import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
        setError(null);
      } catch (err) {
        setError("İncelemeler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (reviews.length === 0) return <p>Bu film için inceleme bulunamadı.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <h4 className={css.author}>Yazar: {author}</h4>
          <p className={css.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
