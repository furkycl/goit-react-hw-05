import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, NavLink, Outlet } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Film detayları alınamadı:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Yükleniyor...</div>;

  return (
    <div className={css.wrapper}>
      <NavLink to={backLinkRef.current} className={css.backLink}>
        ← Geri Dön
      </NavLink>

      <div className={css.movieDetails}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.info}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Puan:</strong> {movie.vote_average}
          </p>
        </div>
      </div>

      <hr />

      <div className={css.links}>
        <NavLink
          to={`/movies/${movieId}/cast`}
          state={location.state}
          className={css.link}
        >
          Oyuncular
        </NavLink>
        <NavLink
          to={`/movies/${movieId}/reviews`}
          state={location.state}
          className={css.link}
        >
          İncelemeler
        </NavLink>
      </div>

      <hr />

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
