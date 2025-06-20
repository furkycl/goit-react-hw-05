import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError("Film detayları yüklenemedi.");
      }
    };

    loadDetails();
  }, [movieId]);

  if (error) return <p className={css.error}>{error}</p>;
  if (!movie) return <p>Yükleniyor...</p>;

  const {
    title,
    overview,
    genres = [],
    poster_path,
    vote_average,
    release_date,
  } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className={css.page}>
      <Link to={backLinkRef.current} className={css.back}>
        ← Geri Dön
      </Link>

      <div className={css.details}>
        <img src={imageUrl} alt={title} className={css.poster} />
        <div className={css.info}>
          <h2>
            {title} ({release_date?.slice(0, 4)})
          </h2>
          <p>
            <strong>Oy ortalaması:</strong> {vote_average}
          </p>
          <p>
            <strong>Açıklama:</strong> {overview}
          </p>
          <p>
            <strong>Türler:</strong> {genres.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      <div className={css.subnav}>
        <h3>Ek Bilgi</h3>
        <ul className={css.links}>
          <li>
            <NavLink to="cast" className={css.link}>
              Oyuncular
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.link}>
              İncelemeler
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
