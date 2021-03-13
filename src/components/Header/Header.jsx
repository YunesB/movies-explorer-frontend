import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import logo from '../../images/svg/header__logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
          <img src={logo} alt="Логотип Проекта" className="header__logo" />
        <div className="header__link-container">
          <Link to={'1'} className="header__link">Регистрация</Link>
          <Link to={'1'} className="header__link header__link_outlined">Войти</Link>
        </div>
      </div>
      <div className="header__heading-container">
        <h1 className="header__heading">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <div className="header__navigation">
        <Link to={'1'} className="header__nav-link">О проекте</Link>
        <Link to={'1'} className="header__nav-link">Технологии</Link>
        <Link to={'1'} className="header__nav-link">Студент</Link>
      </div>
    </header>
  );
}

export default Header;