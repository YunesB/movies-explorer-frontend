import React from 'react';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import useWindowSize from '../../utils/useWindowSize';

import ProtectedRoute from '../../utils/ProtectedRoute';
import * as auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import RouteMovies from '../RouteMovies/RouteMovies';
import RouteSavedMovies from '../RouteSavedMovies/RouteSavedMovies';
import RouteProfile from '../RouteProfile/RouteProfile';
import Landing from '../Landing/Landing';

import Authorization from '../Authorization/Authorization';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

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
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ isMovieSaved, setMovieSaved ] = React.useState(false);
  
  const [ filteredMovies, setFilteredMovies ] = React.useState([]);
  const [ filteredSavedMovies, setFilteredSavedMovies ] = React.useState([]);
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
        setPageLoading(true);
        setCurrentUser(userData);
        setSavedMovies(savedMovies);
        saveMoviesToLocalStorage(movies);
        setMovies(movies);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPageLoading(false);
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

  function updateFilteredSavedMovies(value) {
    setFilteredSavedMovies(value);
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
        console.log(savedMovies);
      })
      .catch((err) => console.log(err))
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
    setPageLoading(true);
    mainApi.setUserInfo(user)
      .then((user) => {
        setCurrentUser(user)
      })
      .catch((err) =>
        console.log(err))
      .finally(() => {
        setPageLoading(false);
      })
  }

  function handleLogin(email, password) {
    setPageLoading(true);
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
      })
      .finally(() => {
        setPageLoading(false);
      })
  }

  function handleRegistration(name, email, password) {
    setPageLoading(true);
    auth.signUp(name, email, password)
      .then((res) => {
        if (res) {
          history.push('/sign-in');
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setPageLoading(false);
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
            <Preloader 
              isPageLoading={isPageLoading}
            />
            <Switch>
              <Route exact path="/">
                <Landing
                  loggedIn={isLoggedIn}
                />
              </Route>
              <ProtectedRoute path="/movies"
                component={RouteMovies}
                loggedIn={isLoggedIn}

                movies={movies}
                filteredMovies={filteredMovies}

                updateFilteredMovies={updateFilteredMovies}
                setErrorMessage={setErrorMessage}

                savedMovies={false}
                savedMoviesArray={savedMovies}
                errorMessage={errorMessage}
                windowWidth={windowWidth}

                saveMovie={handleSaveMovie}
                deleteMovie={handleRemoveSavedMovie}
              />
              <ProtectedRoute path="/saved-movies"
                component={RouteSavedMovies}
                loggedIn={isLoggedIn}

                movies={savedMovies}
                filteredMovies={savedMovies}

                updateFilteredMovies={updateFilteredSavedMovies}
                setErrorMessage={setErrorMessage}

                savedMovies={true}
                savedMoviesArray={savedMovies}
                errorMessage={errorMessage}
                windowWidth={windowWidth}

                deleteMovie={handleRemoveSavedMovie}
              />
              <ProtectedRoute path="/profile" 
                component={RouteProfile}
                loggedIn={isLoggedIn}

                onSubmit={handleUpdateUser}
                signOut={signOut}
              />
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