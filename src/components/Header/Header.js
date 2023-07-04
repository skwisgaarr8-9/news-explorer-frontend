import { Link, useMatch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLoggedIn, handleSigninClick, handleLogoutClick }) {
  const match = useMatch('/');

  return (
    <div className="header">
      <Link className="header__link" to="/">
        <p
          className={
            match
              ? 'header__logo header__logo_path_main'
              : 'header__logo header__logo_path_saved-news'
          }
        >
          NewsExplorer
        </p>
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        handleSigninClick={handleSigninClick}
        handleLogoutClick={handleLogoutClick}
      />
    </div>
  );
}

export default Header;
