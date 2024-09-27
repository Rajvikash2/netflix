import React from 'react';
import MovieSearch from './Movies';

const Home: React.FC = () => {
  return (
    <div className="pt-16 md:pt-20 lg:pt-24 px-4 md:px-8">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Home</h1>
      <p className="text-sm md:text-base lg:text-lg">
        <MovieSearch/>
      </p>
    </div>
  );
};

export default Home;
