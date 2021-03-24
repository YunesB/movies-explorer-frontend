import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import Popup from '../Popup/Popup';
// import Preloader from '../Preloader/Preloader';

function MoviesCardsList(props) {

  const [ numberOfMovies, setNumberOfMovies ] = React.useState(12);

  function sliceArray() {
    setNumberOfMovies(numberOfMovies + 4);
  }

  // console.log(numberOfMovies);

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