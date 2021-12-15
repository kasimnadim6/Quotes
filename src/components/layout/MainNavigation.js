import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Great Quotes</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              className={(nav) => nav.isActive && classes.active}
              to="/quotes"
            >
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(nav) => nav.isActive && classes.active}
              to="/new-quote"
            >
              New Quotes
            </NavLink>
          </li>
          <li>
            <Link to="/auth">Login</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
