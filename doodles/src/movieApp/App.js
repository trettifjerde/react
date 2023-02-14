import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';
import { postMovie, getMovies } from './components/DataService';

function App() {
  console.log('App');

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinnerVisible, setSpinnerVisible] = useState(null);

  const fetchMovies = useCallback(async () => {
    console.log('fetching movies');

    setIsLoading(true);
    console.log('setting isLoading to', true);

    try {
      const movies = await getMovies();
      setMovies(movies);
      console.log('setting movies. Movies are now ', movies.length, ' length');
      setIsLoading(false);
      console.log('setting isloading to ', false);
      setError(null);
      console.log('setting error to ', null);
    }
    catch (error) {
      console.log('setting error to ', error);
      setError(error);
      console.log('setting isLoading to false');
      setIsLoading(false);
    }
  }, []);

  const addMovieHandler = async (movie) => {
    const id = await postMovie(movie);
    setMovies((oldMovies) => ([...oldMovies, { id: id, ...movie }]));
  };

  useEffect(() => {
    console.log('Inside useEffect: about to fetch movies');
    fetchMovies()
  }, [fetchMovies]);

  useEffect(() => {
    console.log('Inside useEffect: isLoading changed to', isLoading, '. Using effect');

    if (isLoading) {
      console.log('Inside useEffect: setting spinnerTimer');
      const timer = setTimeout(() => {
        console.log('timer fired. Setting spinner to ', true)
        setSpinnerVisible(true)
      }, 300);
      return () => clearTimeout(timer);
    }
    else {
      console.log('inside useEffect: setting spinnerVisible to ', false)
      setSpinnerVisible(false);
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        {isSpinnerVisible && <div>Loading...</div>}
        {error && <div>{`${error.message} ${error.cause ? error.cause : ''}`}</div>}
        {movies.length === 0 && !isSpinnerVisible && <div>No movies yet.</div>}
        {movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;