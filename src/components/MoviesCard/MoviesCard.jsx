import React from 'react';
import noPhoto from '../../images/jpg/no_photo.png';

function MoviesCards(props) {

  const cardData = props.card;
  const MOVIES_URL = 'https://api.nomoreparties.co';

  const [isSaved, setIsSaved ] = React.useState(false);

  function convertTime(mins) {
    const hours = Math.trunc(mins/60);
	  const minutes = mins % 60;
	  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  function saveMovie() {
    setIsSaved(!isSaved);
  }

  return (
    <li className="card">
      <img src={`${cardData.image !== null
                  ? `${MOVIES_URL}${cardData.image.url}`
                  : noPhoto}`} 
          alt={cardData.nameRU} 
          className="card__image" 
        />
      <div className="card__info-box">
        <div className="card__text-container">
          <p className="card__title">{cardData.nameRU}</p>
          <p className="card__length-info">{convertTime(cardData.duration)}</p>
        </div>
        <button type="button" className={`card__button ${props.savedMovies ? 'hidden' : isSaved ? 'card__button_state_saved': ''}`} onClick={saveMovie} />
        <button type="button" className={`card__button card__button_state_cancel ${props.savedMovies ? '' : 'hidden'}`} />
      </div>
    </li>
  );
}

export default MoviesCards;