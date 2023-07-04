import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './images/logo.jpg';
import main from './main-page.module.scss';

export const MainPage = () => {
  return (
    <>
      <div className={`${main.logo} posa`}>
        <img src={logo} alt="Logo if the Riman site" />
      </div>
      <div className={`${main.main} df fdc jcc aic w100 h100vh`}>
        <div className={main.title}>
          <p className="tac cw">Удачного путешествия</p>
        </div>
        <div className={`${main.btns} df jcc`}>
          <NavLink to="/signin" className='tdn tac'>Вход</NavLink>
          <NavLink to="/signup" className='tdn tac'>Регистрация</NavLink>
        </div>
      </div>
    </>
  )
}