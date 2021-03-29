import React from 'react';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import useWindowSize from '../../utils/useWindowSize';

import ProtectedRoute from '../../utils/ProtectedRoute';
import * as auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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
import { 
  Route, 
  Switch, 
  Redirect, 
  withRouter, 
  useHistory 
} from 'react-router-dom';

function App() {

  const windowWidth = useWindowSize();

  const [ isLoggedIn, setLoggedIn ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ permissionsChecked, setPermissionsChecked ] = React.useState(false);

  const [ isTooltipPopupOpened, setTooltipPopupOpened ] = React.useState(false);
  const [ isPageLoading, setPageLoading ] = React.useState(false);

  const [ movies, setMovies ] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  
  const [ filteredMovies, setFilteredMovies ] = React.useState([]);
  const [ errorMessage, setErrorMessage ] = React.useState('Пожалуйста, введите данные для поиска.');

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    if (!isLoggedIn){
      return;
    }
    Promise.all([
      mainApi.getUserInfo(),
      mainApi.getSavedMovies(),
      moviesApi.getMovies(),
    ])
      .then(([userData, savedMovies, movies]) => {
        setCurrentUser(userData);
        setSavedMovies(savedMovies);
        saveMoviesToLocalStorage(movies);
        setMovies(movies);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log('success!');
      })
  }, [isLoggedIn]);

  function tokenCheck() {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      return auth.checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPermissionsChecked(true);
        })
    } else {
      setPermissionsChecked(true);
    }
  };
  
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

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
        console.log(savedMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleRemoveSavedMovie(movie) {
    mainApi.removeSavedMovie(movie)
      .then((deletedMovie) => {
        const refreshMovies = savedMovies.filter((c) => c._id !== deletedMovie._id);
        setSavedMovies(refreshMovies);
        console.log(refreshMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(user) {
    mainApi.setUserInfo(user)
      .then((user) => {
        console.log(user);
        setCurrentUser(user)
      })
      .catch((err) =>
        console.log(err))
      .finally(() =>
        console.log('finally'))
  }

  function handleLogin(email, password) {
    if (!email || !password) {
      console.log('login-error');
      return;
    }
    auth.signIn(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
          window.location.reload();        
        } else {
          return
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('signin-catch');
      })
      .finally(() => {
        console.log('signin-finally');
      })
  }

  function handleRegistration(name, email, password) {
    auth.signUp(name, email, password)
      .then((res) => {
        if (res) {
          history.push('/sign-in');
        } else {
          console.log('error');
        }
      })
      .catch(() => {
        console.log('reg-catch');
      })
      .finally(() => {
        console.log('reg-finally');
      })
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  };

  if (!permissionsChecked){
    return null;
  }

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Landing
                  loggedIn={isLoggedIn}
                />
              </Route>
              <ProtectedRoute path="/movies" loggedIn={isLoggedIn} component={() => (
                <>
                  <Header 
                    loggedIn={isLoggedIn}
                  />
                  <SearchBar 
                    movies={movies}
                    updateFilteredMovies={updateFilteredMovies}
                    setErrorMessage={setErrorMessage}
                  />
                  <MoviesCardsList 
                    movies={filteredMovies}
                    savedMovies={false}
                    savedMoviesArray={savedMovies}
                    errorMessage={errorMessage}
                    windowWidth={windowWidth}
                    saveMovie={handleSaveMovie}
                    deleteMovie={handleRemoveSavedMovie}
                  />
                  <Footer />
                </>
              )}>
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" loggedIn={isLoggedIn} component={() => (
                <>
                  <Header
                    loggedIn={isLoggedIn}
                  />
                  <SearchBar 
                    movies={savedMovies}
                    updateFilteredMovies={updateFilteredMovies}
                    setErrorMessage={setErrorMessage}
                  />
                  <MoviesCardsList
                    movies={savedMovies}
                    savedMovies={true}
                    savedMoviesArray={savedMovies}
                    errorMessage={errorMessage}
                    windowWidth={windowWidth}
                    deleteMovie={handleRemoveSavedMovie}
                  />
                  <Footer />
                </>
              )}>
              </ProtectedRoute>
              <ProtectedRoute path="/profile" loggedIn={isLoggedIn} component={() => (
                <>
                  <Header
                    loggedIn={isLoggedIn}
                  />
                  <Profile
                    onSubmit={handleUpdateUser}
                    signOut={signOut}
                  />
                </>
              )}>
              </ProtectedRoute>
              <Route path="/movies">
                {isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/sign-up" />}
              </Route>
              <Route path="/sign-in">
                <Authorization 
                  signIn={true}
                  greeting={'Рады видеть!'}
                  submit={'Войти'}
                  subline={'Ещё не зарегистрированы? '}
                  linkText={'Регистрация'}
                  link={'/sign-up'}
                  handleSubmit={handleLogin}
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
                  handleSubmit={handleRegistration}
                />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </CurrentUserContext.Provider>
    );
}

export default withRouter(App);