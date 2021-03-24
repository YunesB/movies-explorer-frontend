import React from 'react';

function SearchBar(props) {
  const [ movie, setMovie ] = React.useState('');
  const [ isChecked, setChecked ] = React.useState(false);

  function toggleCheckbox() {
    setChecked(!isChecked);
  }
  
  function filterMoviesArray(movies, searchSrting) {
    if (isChecked) {
      const shortFilm = movies.filter((movie) => {
        return movie.duration <= 40 && movie.nameRU.toLowerCase().includes(searchSrting.toLowerCase());
      });
      return shortFilm;
    } else {
      const filteredMovies = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchSrting.toLowerCase());
      });
      return filteredMovies;
    } 
  }

  function handleInput (evt) {
    setMovie(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const filteredMovies = filterMoviesArray(props.movies, movie);
    props.updateFilteredMovies(filteredMovies);
    props.setErrorMessage('К сожалению, по данному запросу ничего не найдено.');
  }

  return (
    <section className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Фильм" 
          className="search-bar__input"
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
        <button type="submit" className="search-bar__submit">Поиск</button>
      </form>
    </section>
  );
}

export default SearchBar;