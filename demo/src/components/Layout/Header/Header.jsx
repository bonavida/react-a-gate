import React from 'react';
import { Link } from 'react-router-dom';
/** Styles */
import './Header.scss';

const Header = () => (
  <div className="header__container">
    <h1 className="header__title">
      <Link to="/">react-a-gate</Link>
    </h1>
    <ul className="header__menu">
      <li className="header__menu-item">
        <Link to="/modal">Modal</Link>
      </li>
      <li className="header__menu-item">
        <Link to="/tooltip">Tooltip</Link>
      </li>
      <li className="header__menu-item">
        <Link to="/popover">Popover</Link>
      </li>
    </ul>
  </div>
);

export default Header;
