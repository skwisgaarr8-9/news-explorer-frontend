import React from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import getNewsData from '../../utils/newsApi';
import Preloader from '../Preloader/Preloader';
import { API_KEY, placeholder } from '../../utils/constants';
import MenuModal from '../MenuModal/MenuModal';

function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [newsArticles, setNewsArticles] = React.useState(null);
  const [searchTopic, setSearchTopic] = React.useState(null);
  const [numberOfCards, setNumberOfCards] = React.useState(3);
  const [isSearching, setIsSearching] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);
  //place holder value until back end is written in later stage
  const [savedNewsArticles, setSavedNewsArticles] = React.useState(null);
  const [newsApiError, setNewsApiError] = React.useState(null);
  const match = useMatch('/');

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleHomeClick = () => {
    setNewsApiError(null);
    closeModal();
    setNewsArticles(null);
    setIsSearching(false);
    localStorage.removeItem('articles');
    localStorage.removeItem('topic');
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  const searchBtnClick = (topic) => {
    setSearchTopic(topic);
    setNewsArticles(null);
    setNothingFound(false);
    setIsSearching(true);
    getNewsData({ apiKey: API_KEY, topic })
      .then((data) => {
        if (data.articles.length === 0) {
          setNothingFound(true);
        } else {
          setNewsArticles(data.articles);
          setIsSearching(false);
          localStorage.setItem('articles', JSON.stringify(data.articles));
          localStorage.setItem('topic', topic);
        }
      })
      .catch((err) => {
        console.log(err);
        setNewsApiError(err);
        setIsSearching(false);
      });
  };

  const handleSavedArticlesClick = () => {
    setSavedNewsArticles(placeholder);
  };

  const handleMobileMenuClick = () => {
    setActiveModal('menu');
  };

  const handleSigninClick = () => {
    setActiveModal('login');
  };

  const handleRegisterClick = () => {
    setActiveModal('register');
  };

  const handleLoginClick = () => {
    setActiveModal('login');
  };

  const handleSeeMoreClick = () => {
    setNumberOfCards(numberOfCards + 3);
  };

  React.useEffect(() => {
    if (localStorage.getItem('articles')) {
      setNewsArticles(JSON.parse(localStorage.getItem('articles')));
      setSearchTopic(localStorage.getItem('topic'));
    }
    setSavedNewsArticles(placeholder);
  }, []);

  return (
    <div className="page">
      <div
        className={
          match
            ? 'page__content page__content_path_main'
            : 'page__content page__content_path_saved-news'
        }
      >
        <Header
          isLoggedIn={isLoggedIn}
          handleSigninClick={handleSigninClick}
          handleLogoutClick={handleLogoutClick}
          handleHomeClick={handleHomeClick}
          handleMobileMenuClick={handleMobileMenuClick}
          handleSavedArticlesClick={handleSavedArticlesClick}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Main
                searchBtnClick={searchBtnClick}
                isSearching={isSearching}
                newsApiError={newsApiError}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  newsArticles={savedNewsArticles}
                  handleSigninClick={handleSigninClick}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {isSearching && (
        <Preloader isSearching={isSearching} nothingFound={nothingFound} />
      )}
      {newsArticles && match && (
        <NewsCardList
          searchTopic={searchTopic}
          numberOfCards={numberOfCards}
          newsArticles={newsArticles}
          isLoggedIn={isLoggedIn}
          handleSigninClick={handleSigninClick}
          handleSeeMoreClick={handleSeeMoreClick}
        />
      )}
      {match && <About />}
      <Footer handleHomeClick={handleHomeClick} />
      {activeModal === 'login' && (
        <LoginModal
          isActive={true}
          closeModal={closeModal}
          handleRegisterClick={handleRegisterClick}
        />
      )}
      {activeModal === 'register' && (
        <RegisterModal
          isActive={true}
          closeModal={closeModal}
          handleLoginClick={handleLoginClick}
        />
      )}
      {activeModal === 'menu' && (
        <MenuModal
          closeModal={closeModal}
          handleSigninClick={handleSigninClick}
          isActive={true}
          isLoggedIn={isLoggedIn}
          handleLogoutClick={handleLogoutClick}
          handleHomeClick={handleHomeClick}
        />
      )}
    </div>
  );
}

export default App;
