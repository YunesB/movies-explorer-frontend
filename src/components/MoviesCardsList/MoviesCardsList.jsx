import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardsList() {
  return (
    <section className="cards">
      <ul className="cards__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button type="button" className="cards__button">Ещё</button>
    </section>
  );
}

export default MoviesCardsList;