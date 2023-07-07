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
import { placeholder } from '../../utils/constants';

function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [newsArticles, setNewsArticles] = React.useState(null);
  const [searchTopic, setSearchTopic] = React.useState(null);
  const [numberOfCards, setNumberOfCards] = React.useState(3);
  const [isSearching, setIsSearching] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);
  //place holder value until back end is written in later stage
  const [savedNewsArticles, setSavedNewsArticles] = React.useState(placeholder);
  const match = useMatch('/');

  const apiKey = 'c6fcee4b4720458b93633a4eb3c03f78';

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleHomeClick = () => {
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
    getNewsData({ apiKey, topic })
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
      });
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
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Main searchBtnClick={searchBtnClick} isSearching={isSearching} />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  newsArticles={
                    isLoggedIn && placeholder ? placeholder : newsArticles
                  }
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
    </div>
  );
}

export default App;
