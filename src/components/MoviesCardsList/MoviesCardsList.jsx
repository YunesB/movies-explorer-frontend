import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import Popup from '../Popup/Popup';
// import Preloader from '../Preloader/Preloader';

function MoviesCardsList(props) {

  let numberOfCards = 12;
  let numberOfNewCards = 4;

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

  const [ numberOfMovies, setNumberOfMovies ] = React.useState(numberOfCards);

  function sliceArray() {
    setNumberOfMovies(numberOfMovies + numberOfNewCards);
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {props.movies.length === 0 ? 
        <li className="cards__not-found-box">{props.errorMessage}</li> :
        props.movies
          .slice(0, numberOfMovies)
          .map((movie) => (
          <MoviesCard
              card={movie}
              key={movie.id || movie._id}
              savedMovies={props.savedMovies}
              onCardClick={props.onCardClick}
              onLikeClick={props.onLikeClick}
              onDeleteClick={props.onDeleteClick}
          />
        ))}
      </ul>
      <button type="button" className={`cards__button ${props.movies.length <= 12 || numberOfMovies >= props.movies.length ? 'cards__button_state_hidden' : ''}`} onClick={sliceArray}>Ещё</button>
    </section>
  );
}

export default MoviesCardsList;