import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/svg/header__logo.svg';

function Authorization(props) {
  return (
    <section className="auth">
      <Link to="/" className="auth__logo-link">
        <img src={logo} alt="Logo" className="auth__logo" />
      </Link>
      <h2 className="auth__greeting">{props.greeting || 'Дороу!'}</h2>
      <form className="auth__form">
        <label className={`${props.signIn ? 'hidden' : 'auth__field'}`}>Имя
          <input 
            minLength="2" 
            maxLength="30" type="text"
            className="auth__input" 
            name="name" placeholder="" required
          />
          <span className="auth__error"></span>
        </label>
        <label className="auth__field">E-mail
          <input 
            minLength="2" 
            maxLength="30" type="text"
            className="auth__input" 
            name="name" placeholder="" required
          />
          <span className="auth__error"></span>
        </label>
        <label className="auth__field">Пароль
          <input 
            minLength="2" 
            maxLength="30" type="password"
            className="auth__input" 
            name="name" placeholder="" required
          />
          <span className="auth__error"></span>
        </label>
        <button type="submit" className={`auth__submit ${props.signIn ? 'auth__submit_state_sign-in' : ''}`}>{props.submit || 'SUBMIT'}</button>
        <p className="auth__subline">{props.subline || 'SUBLINE'}
          <Link to={props.link} className="auth__link">{props.linkText || 'LINK-TEXT'}</Link>
        </p>
      </form>

    </section>
  );
}

export default Authorization;