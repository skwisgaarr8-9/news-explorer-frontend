import { NavLink, useMatch } from 'react-router-dom';
import logOutWhite from '../../images/logout-white.svg';
import logOutBlack from '../../images/logout-black.svg';
import './Navigation.css';

function Navigation({
  isLoggedIn,
  handleSigninClick,
  handleLogoutClick,
  handleHomeClick,
}) {
  const match = useMatch('/');

  return (
    <div className="nav">
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
                ? 'nav__button nav__button_page_main nav__button_content_logout'
                : 'nav__button nav__button_page_saved-news nav__button_content_logout'
            }
          >
            Elise
            <img src={match ? logOutWhite : logOutBlack} alt="log out" />
          </button>
        </>
      ) : (
        <>
          <button
            className="nav__button nav__button_page_main nav__button_content_signin"
            onClick={handleSigninClick}
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
}

export default Navigation;
