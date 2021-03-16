function SearchBar() {
  return (
    <section className="search-bar">
      <form class="search-bar__form">
        <input type="text" placeholder="Фильм" className="search-bar__input" />
        <div className="search-bar__container">
          <label for="checkbox" className="search-bar__switch">
            <input type="checkbox" className="search-bar__checkbox" />
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