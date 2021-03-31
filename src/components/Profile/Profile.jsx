import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';
import * as CONSTANTS from '../../utils/constants';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [ name, setName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');

  const [ nameValid, setNameValid ] = React.useState(true);
  const [ emailValid, setEmailValid ] = React.useState(true);

  const [ submitDisabled, setSubmitDisabled ] = React.useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const nameHandler = (evt) => {
    setName(evt.target.value);
    const re = CONSTANTS.NAME_REGEX;
    if (!re.test(String(evt.target.value).toLowerCase()) && evt.target.value.length >= 1) {
      setNameValid(false);
    } else if (evt.target.value === '') {
      setNameValid(false);
    } else if (evt.target.value === currentUser.name) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
    const re = CONSTANTS.MAIL_REGEX;
    if (!re.test(String(evt.target.value).toLowerCase()) && evt.target.value.length >= 1) {
      setEmailValid(false);
    } else if (evt.target.value === '') {
      setEmailValid(false);
    } else if (evt.target.value === currentUser.email) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  function submitValidator() {
    if (nameValid && emailValid) {
      setSubmitDisabled(false);
      return submitDisabled;
    } else {
      setSubmitDisabled(true);
      return submitDisabled;
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({name, email});
  };

  return (
    <section className="profile">
      <h2 className="profile__greeting">Привет, {currentUser.name || 'Username'}!</h2>
      <form className="profile__form" 
        onSubmit={evt => handleSubmit(evt)}
        onChange={submitValidator}
      >
        <div className="profile__data-container">
          <label className="profile__text">
            Имя
          </label>
          <input 
            type="text" 
            className={`profile__input ${!nameValid ? 'profile__input-error' : ''}`}
            placeholder={currentUser.name || 'Username'}
            name="name"
            value={name}
            onChange={evt => nameHandler(evt)}
          />
        </div>
        <div className="profile__data-container">
          <label className="profile__text">
            Email
          </label>
          <input 
            type="email" 
            className={`profile__input ${!emailValid ? 'profile__input-error' : ''}`}
            placeholder={currentUser.email || 'Email'}
            name="email"
            value={email}
            onChange={evt => emailHandler(evt)}
          />
        </div>
        <button type="submit" 
          className={`profile__button ${submitDisabled ? 'profile__button_disabled' : ''}`}
          disabled={submitDisabled}
        >Редактировать</button>
      </form>
      <button type="button" className="profile__button profile__button_type_signout" 
        onClick={props.signOut}
      >Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;