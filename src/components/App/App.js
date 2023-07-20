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
import { API_KEY } from '../../utils/constants';
import MenuModal from '../MenuModal/MenuModal';
import { auth } from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [newsArticles, setNewsArticles] = React.useState(null);
  const [keyword, setKeyword] = React.useState(null);
  const [numberOfCards, setNumberOfCards] = React.useState(3);
  const [isSearching, setIsSearching] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(false);
  const [savedNewsArticles, setSavedNewsArticles] = React.useState([]);
  const [newsApiError, setNewsApiError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [apiError, setApiError] = React.useState(null);
  const [selectedArticleId, setSelectedArticleId] = React.useState(null);
  const match = useMatch('/');

  const token = localStorage.getItem('jwt');

  //effects

  React.useEffect(() => {
    if (localStorage.getItem('articles')) {
      setNewsArticles(JSON.parse(localStorage.getItem('articles')));
      setKeyword(localStorage.getItem('keyword'));
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      api
        .getUser(token)
        .then((data) => {
          setCurrentUser(data.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
      getUserArticles(token);
    }
  }, [token]);

  //modal functions

  const closeModal = () => {
    setApiError(null);
    setActiveModal(null);
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

  //button functions

  const handleHomeClick = () => {
    setNewsApiError(null);
    closeModal();
    setNewsArticles(null);
    setIsSearching(false);
    localStorage.removeItem('articles');
    localStorage.removeItem('keyword');
  };

  const handleLogoutClick = () => {
    setNewsArticles(null);
    setIsSearching(false);
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleSeeMoreClick = () => {
    setNumberOfCards(numberOfCards + 3);
  };

  const handleDeleteButtonClick = (articleId) => {
    setActiveModal('delete');
    setSelectedArticleId(articleId);
  };

  //api functions

  const handleUserRegistration = (inputValues) => {
    setIsLoading(true);
    auth
      .register(inputValues)
      .then(() => {
        setActiveModal('confirm');
      })
      .catch((err) => {
        if (err.includes('409')) {
          setApiError('Email already in use');
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getUserArticles = (token) => {
    api
      .getArticles(token)
      .then((data) => {
        setSavedNewsArticles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserLogin = (inputValues) => {
    setIsLoading(true);
    auth
      .login(inputValues)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          getUserArticles(data.token);
          closeModal();
        }
      })
      .catch((err) => {
        if (err.includes('401') || err.includes('400')) {
          setApiError('Incorrect email or password');
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteArticle = () => {
    setIsLoading(true);
    api
      .deleteArticle(selectedArticleId, token)
      .then(() => {
        const updatedSavedArticles = savedNewsArticles.filter(
          (article) => article._id !== selectedArticleId
        );
        setSavedNewsArticles([...updatedSavedArticles]);
        setSelectedArticleId(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchBtnClick = (data) => {
    const keyword = data.charAt(0).toUpperCase() + data.slice(1);
    setNumberOfCards(3);
    setKeyword(keyword);
    setNewsArticles(null);
    setNothingFound(false);
    setIsSearching(true);
    getNewsData({ apiKey: API_KEY, keyword })
      .then((data) => {
        if (data.articles.length === 0) {
          setNothingFound(true);
        } else {
          setNewsArticles(data.articles);
          setIsSearching(false);
          localStorage.setItem('articles', JSON.stringify(data.articles));
          localStorage.setItem('keyword', keyword);
        }
      })
      .catch((err) => {
        console.log(err);
        setNewsApiError(err);
        setIsSearching(false);
      });
  };

  const handleSaveArticle = (card) => {
    api
      .saveArticle(card, token)
      .then((data) => {
        setSavedNewsArticles([...savedNewsArticles, data.data]);
        setSelectedArticleId(data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  setActiveModal={setActiveModal}
                  searchBtnClick={searchBtnClick}
                  isSearching={isSearching}
                  newsApiError={newsApiError}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  setActiveModal={setActiveModal}
                >
                  <SavedNews
                    handleDeleteButtonClick={handleDeleteButtonClick}
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
            handleSaveArticle={handleSaveArticle}
            keyword={keyword}
            numberOfCards={numberOfCards}
            newsArticles={newsArticles}
            isLoggedIn={isLoggedIn}
            handleSigninClick={handleSigninClick}
            handleSeeMoreClick={handleSeeMoreClick}
            handleDeleteArticle={handleDeleteArticle}
          />
        )}
        {match && <About />}
        <Footer handleHomeClick={handleHomeClick} />
        {activeModal === 'login' && (
          <LoginModal
            apiError={apiError}
            isLoading={isLoading}
            handleUserLogin={handleUserLogin}
            isActive={true}
            closeModal={closeModal}
            handleRegisterClick={handleRegisterClick}
          />
        )}
        {activeModal === 'register' && (
          <RegisterModal
            apiError={apiError}
            isActive={true}
            closeModal={closeModal}
            handleLoginClick={handleSigninClick}
            handleUserRegistration={handleUserRegistration}
            isLoading={isLoading}
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
        {activeModal === 'delete' && (
          <ConfirmationModal
            closeModal={closeModal}
            isActive={true}
            buttonText={isLoading ? 'Deleting...' : 'Delete'}
            title={'Are you sure you want to remove this card?'}
            name={'delete'}
            handleButton={handleDeleteArticle}
          />
        )}
        {activeModal === 'confirm' && (
          <ConfirmationModal
            closeModal={closeModal}
            isActive={true}
            buttonText={'Sign in'}
            title={'Registration successfully completed!'}
            name={'confirm'}
            handleButton={handleSigninClick}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
