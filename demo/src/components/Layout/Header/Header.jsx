import React from 'react';
import { Link, NavLink } from 'react-router-dom';
/** Styles */
import './Header.scss';

const Header = () => (
  <div className="header__container">
    <h1 className="header__title">
      <Link to="/">react-a-gate <span>demos</span></Link>
    </h1>
    <ul className="header__menu">
      <li className="header__menu-item">
        <NavLink
          to="/modal"
          isActive={(_, { pathname }) => ['/', '/modal'].includes(pathname)}
        >
          Modal
        </NavLink>
      </li>
      <li className="header__menu-item">
        <NavLink to="/tooltip">Tooltip</NavLink>
      </li>
      <li className="header__menu-item">
        <NavLink to="/popover">Popover</NavLink>
      </li>
    </ul>
  </div>
);

export default Header;
