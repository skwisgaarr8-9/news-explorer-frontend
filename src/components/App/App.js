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
// import getNewsData from '../../utils/newsApi';
// import dog from '../../images/dog.png';

function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [newsArticles, setNewsArticles] = React.useState(null);
  const [searchTopic, setSearchTopic] = React.useState(null);

  const match = useMatch('/');

  // const apiKey = 'b70d0142119b439a91cf6ee46fd0f5b5';
  // const keyword = 'elon musk';

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
    }

    if (topic === '') {
      setSearchTopic(null);
    }

    console.log(searchTopic);
    // getNewsData({ apiKey, topic }).then((data) => {
    //   setNewsArticles(data.articles);
    // }).catch((err) => {
    //   console.log(err);
    // });
    // setNewsArticles(cardInfo);
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

  // getNewsData({ apiKey, keyword })
  //   .then((data) => {
  //     searchBtnClick(data.articles);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  React.useEffect(() => {
    const cardInfo = [
      {
        source: {
          id: 'the-verge',
          name: 'The Verge',
        },
        author: 'Emma Roth',
        title:
          'Mt. Gox: all the news on Bitcoin’s original biggest bankruptcy scandal',
        description:
          'One of the strangest stories in crypto still isn’t over. Mt. Gox went bankrupt in 2014 after losing track of more than 650,000 Bitcoins through theft or mismanagement and its CEO was arrested. But the story didn’t end there.',
        url: 'https://www.theverge.com/2014/3/21/5533272/mt-gox-missing-bitcoins',
        urlToImage:
          'https://cdn.vox-cdn.com/thumbor/cT46bayUXzTSLryuplguioQYo78=/0x0:560x372/1200x628/filters:focal(280x186:281x187)/cdn.vox-cdn.com/uploads/chorus_asset/file/10987061/mt-gox-hq.0.0.jpg',
        publishedAt: '2023-06-09T17:28:51Z',
        content:
          'Filed under:\r\nByJacob Kastrenakes, a deputy editor who oversees tech and news coverage. Since joining The Verge in 2012, hes published 5,000+ stories and is the founding editor of the creators desk. … [+17914 chars]',
      },
    ];

    if (searchTopic) {
      setNewsArticles(cardInfo);
    } else {
      setNewsArticles(null);
    }
  }, [searchTopic]);

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
          newsArticles={newsArticles}
          isLoggedIn={isLoggedIn}
          handleSigninClick={handleSigninClick}
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
