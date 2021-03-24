import React from 'react';

function Navigation() {
  return (
    <section className="navigation">
      <div className="navigation__heading-container">
        <h1 className="navigation__heading">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <nav className="navigation__nav-box">
        <a href='/#about' className="navigation__nav-link">О проекте</a>
        <a href='/#technologies' className="navigation__nav-link">Технологии</a>
        <a href='/#student' className="navigation__nav-link">Студент</a>
      </nav>
    </section>
  );
}

export default Navigation;