function SearchBar() {
  return (
    <section className="search-bar">
      <form class="search-bar__form">
        <input type="text" placeholder="Фильм" className="search-bar__input" />
        <div className="search-bar__container">
          <input type="checkbox" className="search-bar__checkbox" id="chechbox" />
          <label for="checkbox" className="search-bar__placeholder">Короткометражки</label>
        </div>
        <button type="submit" className="search-bar__submit">Поиск</button>
      </form>
    </section>
  );
}

export default SearchBar;