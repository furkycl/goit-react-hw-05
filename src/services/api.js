import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTJhZmViMWIyZmVlMDkyMmUyOWNjNGQwYTRmMWEwYyIsIm5iZiI6MTc1MDE1MjIwNi42NzI5OTk5LCJzdWIiOiI2ODUxMzQwZTI1MzIxMjhlOTNlN2I3ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.y8HYm_LeYZ47QGjIJdbNBnnF4RwXc2MMY7beZv24dTE";

const options = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return res.data.results;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}?language=en-US`,
    options
  );
  return res.data;
};

export const getMovieCredits = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/credits?language=en-US`,
    options
  );
  return res.data.cast;
};

export const getMovieReviews = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/reviews?language=en-US&page=1`,
    options
  );
  return res.data.results;
};
