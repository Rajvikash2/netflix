import React, { useEffect, useState } from 'react';
import Carousel from './Carousel'; // Adjust the path according to your file structure

// Define the type for the movie response
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieSearch: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getmovies = () => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=9c869b656bbcb8317a0c240b21095641")
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  };

  useEffect(() => {
    getmovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      {/* {movies.length > 0 ? (
        <Carousel movies={movies} /> // Pass the movies to the Carousel
      ) : (
        <p>Loading...</p>
      )} */}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            {/* <p>{movie.overview}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
