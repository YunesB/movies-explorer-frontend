import React from 'react';
import * as CONSTANTS from '../../utils/constants';

function SearchBar(props) {
  const [ movie, setMovie ] = React.useState('');
  const [ isMovieValid, setMovieValid ] = React.useState(false);
  const [ isChecked, setChecked ] = React.useState(false);

  function toggleCheckbox() {
    setChecked(!isChecked);
    console.log(movie);
  }

  function handleInput (evt) {
    setMovie(evt.target.value);
  }

  function resetField() {
    setMovie('');
  }

  function handleFilter(movie, searchSrting) {
    return movie.nameRU.toLowerCase().includes(searchSrting.toLowerCase());
  }

  function validateInput() {
    if (movie.length < 1 || movie.length > 30) {
      setMovieValid(false);
    } else {
      setMovieValid(true);
    }
  }
  
  function filterMoviesArray(movies, searchSrting) {
    if (isChecked) {
      const shortFilm = movies.filter((movie) => {
        return movie.duration <= 40 && handleFilter(movie, searchSrting);
      });
      return shortFilm;
    } else {
      const filteredMovies = movies.filter((movie) => {
        return handleFilter(movie, searchSrting);
      });
      return filteredMovies;
    } 
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const filteredMovies = filterMoviesArray(props.movies, movie);
    props.updateFilteredMovies(filteredMovies);
    if (filteredMovies.length === 0 ) {
      return props.setErrorMessage(CONSTANTS.DEFAULT_MESSAGE.CARD_MOVIES.NOT_FOUND);
    }
    resetField();
  }

  return (
    <section className="search-bar">
      <form className="search-bar__form" 
        onSubmit={handleSubmit}
        onChange={evt => validateInput(evt)}
      >
        <input 
          type="text" 
          placeholder="Поиск по фильму..." 
          className={`search-bar__input ${!isMovieValid ? 'search-bar__input-error' : ''}`}
          value={movie}
          onChange={evt => handleInput(evt)}
          required
        />
        <div className="search-bar__container">
          <label htmlFor="checkbox" className="search-bar__switch">
            <input type="checkbox" className="search-bar__checkbox" onChange={toggleCheckbox} id="checkbox"/>
            <span className="search-bar__slider"></span>
          </label>
          <p className="search-bar__placeholder">Короткометражки</p>
        </div>
        <button type="submit" 
          className={`search-bar__submit ${!isMovieValid ? 'search-bar__submit_disabled': ''}`}
          disabled={!isMovieValid}>
          Поиск</button>
      </form>
    </section>
  );
}

export default SearchBar;