
import Header from './Header'
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import MoviesContainer from './MoviesContainer';

const Browse = () => {
 
  useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <MoviesContainer/>
      
    </div>
  )
}

export default Browse
