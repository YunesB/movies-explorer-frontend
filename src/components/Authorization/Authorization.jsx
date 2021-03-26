import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/svg/header__logo.svg';

function Authorization(props) {

  const [ name, setName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const [ nameError, setNameError ] = React.useState('');
  const [ emailError, setEmailError ] = React.useState('');
  const [ passwordError, setPasswordError ] = React.useState('');

  const [ nameValid, setNameValid ] = React.useState(false);
  const [ emailValid, setEmailValid ] = React.useState(false);
  const [ passwordValid, setPasswordValid ] = React.useState(false);

  const [ submitDisabled, setSubmitDisabled ] = React.useState(true);

  const nameHandler = (evt) => {
    setName(evt.target.value);
    if (props.signIn === true) {
      setNameValid(true);
    } else if (evt.target.value === '') {
      setNameError('Пожалуйста, заполните это поле');
      setNameValid(false);
    } else {
      setNameError('');
      setNameValid(true);
    }
  }

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(evt.target.value).toLowerCase()) && evt.target.value.length >= 1) {
      setEmailError('Некорректный Email');
      setEmailValid(false);
    } else if (evt.target.value === '') {
      setEmailError('Пожалуйста, заполните это поле');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
    if (evt.target.value.length < 8 && evt.target.value.length >= 1) {
      setPasswordError('Пароль должен содержать не менее 8 символов');
      setPasswordValid(false);
    } else if (evt.target.value === '') {
      setPasswordError('Пожалуйста, заполните это поле');
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  function submitLoginHandler() {
    setNameValid(true);
    if (emailValid && passwordValid) {
      setSubmitDisabled(false);
      return submitDisabled;
    } else {
      setSubmitDisabled(true);
      return submitDisabled;
    }
  }

  function submitRegistrationHandler() {
    if (nameValid && emailValid && passwordValid) {
      setSubmitDisabled(false);
      return submitDisabled;
    } else {
      setSubmitDisabled(true);
      return submitDisabled;
    }
  }

  function resetFileds() {
    setEmail('');
    setPassword('');
  }

  function handleRegistration(evt) {
    evt.preventDefault();
    props.handleSubmit(name, email, password);
    resetFileds();
  };

  function handleLogin(evt) {
    console.log(name);
    evt.preventDefault();
    props.handleSubmit(email, password);
    resetFileds();
  };


  return (
    <section className="auth">
      <Link to="/" className="auth__logo-link">
        <img src={logo} alt="Logo" className="auth__logo" />
      </Link>
      <h2 className="auth__greeting">{props.greeting || 'GREETINGS!'}</h2>
      <form className="auth__form" 
        onChange={props.signIn ? submitLoginHandler : submitRegistrationHandler} 
        onSubmit={props.signIn ? handleLogin : handleRegistration}
      >
        <label className={`${props.signIn ? 'hidden' : 'auth__field'}`}>Имя
          <input 
            maxLength="30" type="text"
            className={`auth__input ${nameValid ? '' : 'auth__input_error'}`} 
            name="name" placeholder=""
            onChange={evt => nameHandler(evt)}
            value={name}
            disabled={props.signIn}
          />
          <span className={`${nameError ? 'auth__error' : ''}`}>{nameError}</span>
        </label>
        <label className="auth__field">E-mail
          <input 
            minLength="2" 
            maxLength="30" type="text"
            className={`auth__input ${emailValid ? '' : 'auth__input_error'}`}
            name="email" placeholder=""
            onChange={evt => emailHandler(evt)}
            value={email}
          />
          <span className={`${emailError ? 'auth__error' : ''}`}>{emailError}</span>
        </label>
        <label className="auth__field">Пароль
          <input 
            minLength="8" 
            maxLength="30" type="password"
            className={`auth__input ${passwordValid ? '' : 'auth__input_error'}`} 
            name="password" placeholder=""
            onChange={evt => passwordHandler(evt)}
            value={password}
          />
          <span className={`${passwordError ? 'auth__error' : ''}`}>{passwordError}</span>
        </label>
        <button 
          type="submit" 
          className={`auth__submit ${emailValid && passwordValid && nameValid ? '': 'auth__submit_disabled'} 
            ${props.signIn ? 'auth__submit_state_sign-in' : ''}`}
          disabled={submitDisabled}
        >
          {props.submit || 'SUBMIT'}
        </button>
        <p className="auth__subline">{props.subline || 'SUBLINE'}
          <Link to={props.link} className="auth__link">{props.linkText || 'LINK-TEXT'}</Link>
        </p>
      </form>

    </section>
  );
}

export default Authorization;