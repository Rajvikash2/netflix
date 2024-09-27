import React, { useState, useRef } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieListProps {
  movies: Movie[];
  title: string;
}

const PopularMovies: React.FC<MovieListProps> = ({ movies, title }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Limit the number of movies to 12
  const limitedMovies: Movie[] = [];
  for (let i = 0; i < Math.min(12, movies.length); i++) {
    limitedMovies.push(movies[i]);
  }

  return (
    <div className="movie-list-container my-8">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-white mb-4 px-4">{title}</h2>
        <button className="text-violet-700 mr-4">See all</button>
      </div>
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll custom-scrollbar-hide space-x-4 p-4"
          onMouseEnter={() => setIsScrolling(true)}
          onMouseLeave={() => setIsScrolling(false)}
        >
          {limitedMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-40 md:w-48 lg:w-56 hover:bg-opacity-50 transition-all duration-300 hover:scale-105 relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md object-cover w-full h-auto"
              />
              <div className="absolute left-0 bottom-0 bg-black bg-opacity-0 flex items-center justify-center">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart hover:text-pink-700"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {isScrolling && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md hover:bg-opacity-75 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              ❮
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md hover:bg-opacity-75 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              ❯
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
