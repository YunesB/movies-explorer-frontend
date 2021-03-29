import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [ name, setName ] = React.useState(currentUser.name);
  const [ email, setEmail ] = React.useState(currentUser.email);
  const [ isDataValid, setDataValid ] = React.useState(true);

  function nameHandler(evt) {
    setName(evt.target.value);
  }

  function emailHandler(evt) {
    setEmail(evt.target.value);
  }

  function validateData() {
    if (name === currentUser.name && email === currentUser.email) {
      setDataValid(false);
    } else {
      setDataValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({name, email});
  }

  return (
    <section className="profile">
      <h2 className="profile__greeting">Привет, {currentUser.name || 'USERNAME'}!</h2>
      <form className="profile__form" 
        onSubmit={evt => handleSubmit(evt)}
        onChange={validateData}
      >
        <div className="profile__data-container">
          <label className="profile__text">
            Имя
          </label>
          <input 
            type="text" 
            className="profile__input"
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
            className="profile__input"
            placeholder={currentUser.email || 'Email'}
            name="email"
            value={email}
            onChange={evt => emailHandler(evt)}
          />
        </div>
        <button type="submit" 
          className={`profile__button ${isDataValid ? 'profile__button_disabled' : ''}`}
          disabled={isDataValid}
        >Редактировать</button>
      </form>
      <button type="button" className="profile__button profile__button_type_signout" 
        onClick={props.signOut}>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;