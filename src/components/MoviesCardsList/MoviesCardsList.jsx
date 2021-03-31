import React from 'react';
import { NavLink } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardsList(props) {

  let numberOfCards = 12;
  let numberOfNewCards = 4;
  const [ numberOfMovies, setNumberOfMovies ] = React.useState(numberOfCards);

  if (props.windowWidth > 768) {
    numberOfCards = 12;
    numberOfNewCards = 4;
  } else if (props.windowWidth > 550) {
    numberOfCards = 8;
    numberOfNewCards = 2;
  } else if (props.windowWidth <= 550) {
    numberOfCards = 5;
    numberOfNewCards = 2;
  }

  function sliceArray() {
    setNumberOfMovies(numberOfMovies + numberOfNewCards);
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {props.movies.length === 0 ? 
        <li className="cards__not-found-box">
          <p className="cards__not-found-text">{props.errorMessage}</p>
          <NavLink to={props.errorLink} className="cards__not-found-link">{props.errorLinkText}</NavLink>
        </li> :
        props.movies
          .slice(0, numberOfMovies)
          .map((movie) => (
            <MoviesCard
              card={movie}
              key={movie.id || movie._id}
              savedMovies={props.savedMovies}
              savedMoviesArray={props.savedMoviesArray}
              saveMovie={props.saveMovie}
              deleteMovie={props.deleteMovie}
            />
        ))}
      </ul>
      <button type="button" 
        className={`cards__button ${props.movies.length <= 12 || numberOfMovies >= props.movies.length ? 'cards__button_state_hidden' : ''}`} 
        onClick={sliceArray}>Ещё
      </button>
    </section>
  );
}

export default MoviesCardsList;