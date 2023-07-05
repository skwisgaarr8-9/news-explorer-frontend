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

function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [newsArticles, setNewsArticles] = React.useState(null);
  const [searchTopic, setSearchTopic] = React.useState(null);
  const [numberOfCards, setNumberOfCards] = React.useState(3);

  const match = useMatch('/');

  const apiKey = 'c6fcee4b4720458b93633a4eb3c03f78';

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  //only used until api is connected
  const searchBtnClick = (topic) => {
    if (topic !== searchTopic) {
      setSearchTopic(topic);
      getNewsData({ apiKey, topic })
        .then((data) => {
          setNewsArticles(data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (topic === '') {
      setSearchTopic(null);
    }
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
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<Main searchBtnClick={searchBtnClick} />}
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  newsArticles={newsArticles}
                  handleSigninClick={handleSigninClick}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {newsArticles && match && (
        <NewsCardList
          numberOfCards={numberOfCards}
          newsArticles={newsArticles}
          isLoggedIn={isLoggedIn}
          handleSigninClick={handleSigninClick}
          handleSeeMoreClick={handleSeeMoreClick}
        />
      )}
      {match && <About />}
      <Footer />
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
