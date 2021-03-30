import React from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import MoviesCardsList from '../MoviesCardsList/MoviesCardsList';
import Footer from '../Footer/Footer';

function RouteMovies(props) {

  return (
    <>
      <Header 
        loggedIn={props.loggedIn}
      />
      <SearchBar 
        movies={props.movies}
        updateFilteredMovies={props.updateFilteredMovies}
        setErrorMessage={props.setErrorMessage}
      />
      <MoviesCardsList 
        movies={props.filteredMovies}
        savedMovies={false}
        savedMoviesArray={props.savedMoviesArray}
        errorMessage={props.errorMessage}
        windowWidth={props.windowWidth}
        saveMovie={props.saveMovie}
        deleteMovie={props.deleteMovie}
      />
      <Footer />
    </>
  );
}

export default RouteMovies;