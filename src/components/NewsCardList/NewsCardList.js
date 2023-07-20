import React from 'react';
import { useMatch } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  newsArticles,
  isLoggedIn,
  handleSigninClick,
  handleSeeMoreClick,
  numberOfCards,
  keyword,
  handleSaveArticle,
  handleDeleteButtonClick,
  handleDeleteArticle,
}) {
  const match = useMatch('/');

  return (
    <section className={match ? 'cards' : 'cards cards_path_saved-news'}>
      {match && (
        <h2 className="cards__title">{`Search results: ${keyword}`}</h2>
      )}
      <ul className="cards__list">
        {newsArticles.slice(0, numberOfCards).map((article, index) => (
          <NewsCard
            handleDeleteButtonClick={handleDeleteButtonClick}
            keyword={keyword}
            handleSaveArticle={handleSaveArticle}
            key={index}
            cardInfo={article}
            isLoggedIn={isLoggedIn}
            handleSigninClick={handleSigninClick}
            numberOfCards={numberOfCards}
            handleDeleteArticle={handleDeleteArticle}
          />
        ))}
      </ul>
      {match && numberOfCards < newsArticles.length && (
        <button
          onClick={handleSeeMoreClick}
          type="button"
          className="cards__button"
        >
          See more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
