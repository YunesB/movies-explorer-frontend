import React from 'react';
import noPhoto from '../../images/jpg/no_photo.png';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCards(props) {

  const cardData = props.card;
  const MOVIES_URL = 'https://api.nomoreparties.co';
  const [ isSaved, setIsSaved ] = React.useState(false);

  React.useEffect(() => {
    setInitialLikes();
  }, [setInitialLikes]);

  function setInitialLikes() {
    const processedCard = props.savedMoviesArray.find((card) => returnSavedMovie(card));
    if (processedCard) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }

  function returnSavedMovie(card) {
    return card.movieId === cardData.id;
  }

  function convertTime(mins) {
    const hours = Math.trunc(mins/60);
	  const minutes = mins % 60;
	  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  function saveMovie(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    setIsSaved(true);
    console.log(isSaved);
    const movieProps = {
      country: cardData.country || 'DEFAULT',
      director: cardData.director  || 'DEFAULT',
      duration: cardData.duration  || 'DEFAULT',
      year: cardData.year  || 'DEFAULT',
      description: cardData.description  || 'DEFAULT',
      image: `${MOVIES_URL}${cardData.image.url}` || noPhoto,
      trailer: cardData.trailerLink || 'https://www.youtube.com',
      thumbnail: `${MOVIES_URL}${cardData.image.formats.thumbnail.url}` || noPhoto,
      movieId: cardData.id,
      nameRU: cardData.nameRU || 'DEFAULT',
      nameEN: cardData.nameEN || 'DEFAULT',
    };
    props.saveMovie(movieProps);
  }

  function styleAdjustments() {
    if (!props.savedMovies) {
      return `${MOVIES_URL}${cardData.image.url}`
    } else {
      return cardData.image
    }
  }

  function deleteMovie(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!props.savedMovies) {
      const processedCard = props.savedMoviesArray.find((card) => returnSavedMovie(card));
      props.deleteMovie(processedCard._id);
      setIsSaved(false);
    } else {
      props.deleteMovie(cardData._id);
      setIsSaved(false);
    }
  }

  return (
    <li className="card">
      <a href={cardData.trailerLink} target="_blank" rel="noreferrer" className="card__trailer-link">
        <img src={`${cardData.image !== null
                    ? styleAdjustments()
                    : noPhoto
                  }`} 
            alt={cardData.nameRU} 
            className="card__image" 
          />
        <div className="card__info-box">
          <div className="card__text-container">
            <p className="card__title">{cardData.nameRU}</p>
            <p className="card__length-info">{convertTime(cardData.duration)}</p>
          </div>
          <button type="button" 
            className={`card__button ${props.savedMovies ? 'hidden' : isSaved ? 'card__button_state_saved': ''}`} 
            onClick={!isSaved ? evt => saveMovie(evt) : evt => deleteMovie(evt)} 
          />
          <button type="button" 
            className={`card__button card__button_state_cancel ${props.savedMovies ? '' : 'hidden'}`}
            onClick={evt => deleteMovie(evt)}
          />
        </div>
      </a>
    </li>
  );
}

export default MoviesCards;