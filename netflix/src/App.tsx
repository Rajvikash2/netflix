import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./components/Home";
import Carousel from "./components/Carousel";
import PopularMovies from "./genres/Popular";
import Login from "./components/Login";

// Define the type for the movie response
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const userid=localStorage.getItem('userid');

  const getMovies = () => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=9c869b656bbcb8317a0c240b21095641")
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        {movies.length > 0 ? (
          <Carousel movies={movies} />
          // Pass the movies to the Carousel
        ) : (
          <p>Loading carousel...</p>
        )}
        <div className=" mt-20"><PopularMovies movies={movies} title="Popular Movies" /></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carousel" element={<Carousel movies={movies} />} />
          <Route path="/login" element={userid ? <Navigate to="/" /> : <Login />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
