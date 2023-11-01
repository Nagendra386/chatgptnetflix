import React from 'react'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'


const MainContainer = () => {
    const movies = useSelector(store=>store.movies?.nowPlayingMovies)
  
    if(!movies){
        return;
    }
    const mainMovie = movies[2];
    
    const {original_title,overview,id} = mainMovie;
  return (
    <div>
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer
