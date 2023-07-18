import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import logOutWhite from '../../images/logout-white.svg';
import logOutBlack from '../../images/logout-black.svg';
import './Navigation.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation({
  isLoggedIn,
  handleSigninClick,
  handleLogoutClick,
  handleHomeClick,
  handleMobileMenuClick,
  handleSavedArticlesClick,
}) {
  const match = useMatch('/');
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <nav className={isLoggedIn ? 'nav nav_loggedin' : 'nav nav_loggedout'}>
      <NavLink
        onClick={handleHomeClick}
        className={({ isActive }) =>
          match && isActive
            ? 'nav__link nav__link_path_main_active'
            : 'nav__link nav__link_path_saved-news'
        }
        to="/"
      >
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink
            onClick={handleSavedArticlesClick}
            className={({ isActive }) =>
              isActive
                ? 'nav__link nav__link_path_saved-news_active'
                : 'nav__link nav__link_path_main'
            }
            to="/saved-news"
          >
            Saved articles
          </NavLink>
          <button
            onClick={handleLogoutClick}
            className={
              match
                ? 'nav__button nav__button_path_main nav__button_content_logout'
                : 'nav__button nav__button_path_saved-news nav__button_content_logout'
            }
          >
            {currentUser.name}
            <img src={match ? logOutWhite : logOutBlack} alt="log out" />
          </button>
        </>
      ) : (
        <>
          <button
            className="nav__button nav__button_path_main nav__button_content_signin"
            onClick={handleSigninClick}
          >
            Sign in
          </button>
        </>
      )}
      <button
        className={
          match
            ? 'nav__menu-button nav__menu-button_path_main'
            : 'nav__menu-button nav__menu-button_path_saved-news'
        }
        type="button"
        onClick={handleMobileMenuClick}
      />
    </nav>
  );
}

export default Navigation;
