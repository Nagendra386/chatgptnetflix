import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';


const MoviesContainer = () => {
    const movies = useSelector(store=>store.movies);
  return  ( movies.nowPlayingMovies && movies.popularMovies && movies.topRatedMovies && movies.upcomingMovies&&(
    <div className=' -mt-50 relative z-20 bg-black'>
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies?.topRatedMovies}/>
      <MovieList title={"Popular"} movies={movies?.popularMovies}/>
      <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>
      <MovieList title={"Horror Movies"} movies={movies?.nowPlayingMovies}/>
    </div>)
  )
}

export default MoviesContainer;
