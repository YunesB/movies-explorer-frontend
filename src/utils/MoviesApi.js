class MoviesApi {
  constructor({ address }) {
    this._address = address;
    let jwt = localStorage.getItem('jwt');
    this._token = jwt;
  }

  handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._address}`,
      {
        headers: {
          // "Authorization": `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) =>
        this.handleResponse(res)
      )
  };
}

export const moviesApi = new MoviesApi({
  address: 'https://api.nomoreparties.co/beatfilm-movies'
});
