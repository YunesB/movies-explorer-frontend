import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="profile">
      <h2 className="profile__greeting">Привет, {currentUser.name || 'USERNAME'}!</h2>
      <div className="profile__data-container">
        <p className="profile__text">Имя</p>
        <p className="profile__text">{currentUser.name || 'USERNAME'}</p>
      </div>
      <div className="profile__data-container">
        <p className="profile__text">Email</p>
        <p className="profile__text">{currentUser.email || 'EMAIL'}</p>
      </div>
      <button type="button" className="profile__button">Редактировать</button>
      <button type="button" className="profile__button profile__button_type_signout" onClick={props.signOut}>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;