import React from 'react';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import useWindowSize from '../../utils/useWindowSize'

import Header from '../Header/Header';
import Landing from '../Landing/Landing';

// Authorization
import Authorization from '../Authorization/Authorization';

// Main page
import SearchBar from '../SearchBar/SearchBar';
import MoviesCardsList from '../MoviesCardsList/MoviesCardsList';

// Profile
import Profile from '../Profile/Profile';

// Utils
import NotFound from '../NotFound/NotFound';

import Footer from '../Footer/Footer';
import { Route, Switch, 
  // Redirect, 
  withRouter, 
  // useHistory 
} from 'react-router-dom';

function App() {

  const windowWidth = useWindowSize();

  const [ isTooltipPopupOpened, setTooltipPopupOpened ] = React.useState(false);
  const [ movies, setMovies ] = React.useState([]);
  const [ filteredMovies, setFilteredMovies ] = React.useState([]);
  const [ errorMessage, setErrorMessage ] = React.useState('Пожалуйста, введите данные для поиска.');

  function saveMoviesToLocalStorage(data) {
    if (!localStorage.getItem('movies')) {
      localStorage.setItem('movies', JSON.stringify(data));
    } else {
      localStorage.removeItem('movies');
      localStorage.setItem('movies', JSON.stringify(data));
    }
  }

  function toggleTooltipPopup() {
    setTooltipPopupOpened(!isTooltipPopupOpened);
  }

  function updateFilteredMovies(value) {
    setFilteredMovies(value);
  }

  React.useEffect(() => {
    Promise.all([
      moviesApi.getInitialCards()])
      .then((movies) => {
        saveMoviesToLocalStorage(movies[0]);
        setMovies(movies[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log('success!');
      })
  }, []);

  return (
    <div className="page">
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Landing
              loggedIn={false}
            />
          </Route>
          <Route path="/sign-in">
            <Authorization 
             signIn={true}
             greeting={'Рады видеть!'}
             submit={'Войти'}
             subline={'Ещё не зарегистрированы? '}
             linkText={'Регистрация'}
             link={'/sign-up'}
            />
          </Route>
          <Route path="/sign-up">
            <Authorization 
             signIn={false}
             greeting={'Добро пожаловать!'}
             submit={'Зарегистрироваться'}
             subline={'Уже зарегистрированы? '}
             linkText={'Войти'}
             link={'/sign-in'}
            />
          </Route>
          <Route path="/main">
            <Header 
              loggedIn={true}
            />
            <SearchBar 
              movies={movies}
              updateFilteredMovies={updateFilteredMovies}
              setErrorMessage={setErrorMessage}
            />
            <MoviesCardsList 
              movies={filteredMovies}
              errorMessage={errorMessage}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header
              loggedIn={true}
            />
            <SearchBar 
              movies={movies}
            />
            <MoviesCardsList
              movies={movies}
              savedMovies={true}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header
              loggedIn={true}
            />
            <Profile />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
