import { Link, useMatch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({
  isLoggedIn,
  handleSigninClick,
  handleLogoutClick,
  handleHomeClick,
  handleMobileMenuClick,
}) {
  const match = useMatch('/');

  return (
    <header className="header">
      <Link className="header__link" to="/">
        <p
          onClick={handleHomeClick}
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
        handleHomeClick={handleHomeClick}
        isLoggedIn={isLoggedIn}
        handleSigninClick={handleSigninClick}
        handleLogoutClick={handleLogoutClick}
        handleMobileMenuClick={handleMobileMenuClick}
      />
    </header>
  );
}

export default Header;
