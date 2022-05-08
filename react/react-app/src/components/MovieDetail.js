import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const MOVIE_DETAIL_API = process.env.REACT_APP_MOVIE_DETAIL_API;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const getMovie = async () => {
    const response = await fetch(`${MOVIE_DETAIL_API}?movie_id=${id}`);
    const json = await response.json();
    setMovie(() => json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.large_cover_image} alt={movie.title} />
          <h1>{movie.title_long}</h1>
          <div>rating : {movie.rating}</div>
          <div>runtime : {movie.runtime} minutes</div>
          <div>
            genres :
            <ul>
              {movie.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
