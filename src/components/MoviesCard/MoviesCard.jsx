import movie_pic from '../../images/jpg/movie_pic.jpg';

function MoviesCards() {
  return (
    <li className="card">
      <img src={movie_pic} alt="movie_pic" className="card__image" />
      <div className="card__info-box">
        <div className="card__text-container">
          <p className="card__title">33 слова о дизайне</p>
          <p className="card__length-info">1ч42м</p>
        </div>
        <button type="button" className="card__button"></button>
      </div>
    </li>
  );
}

export default MoviesCards;