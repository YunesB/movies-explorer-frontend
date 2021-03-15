import Header from '../Header/Header';

// Landing page
import Navigation from '../Navigation/Navigation';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Student from '../Student/Student';

// Authorization
import Authorization from '../Authorization/Authorization';

// Main page
import SearchBar from '../SearchBar/SearchBar';
import MoviesCardsList from '../MoviesCardsList/MoviesCardsList';

// Profile
import Profile from '../Profile/Profile';

// NotFound
import NotFound from '../NotFound/NotFound';

import Footer from '../Footer/Footer';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';

function App() {
  return (
    <div className="page">
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Header 
              loggedIn={false}
            />
            <Navigation />
            <About />
            <Technologies />
            <Student />
            <Footer />
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
            <SearchBar />
            <MoviesCardsList />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header
              loggedIn={true}
            />
            <SearchBar />
            <MoviesCardsList 
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