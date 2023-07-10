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
  searchTopic,
}) {
  const match = useMatch('/');

  return (
    <div className={match ? 'cards' : 'cards cards_path_saved-news'}>
      {match && (
        <h2 className="cards__title">{`Search results: ${searchTopic}`}</h2>
      )}
      <ul className="cards__list">
        {newsArticles.slice(0, numberOfCards).map((article, index) => (
          <NewsCard
            key={index}
            cardInfo={article}
            isLoggedIn={isLoggedIn}
            handleSigninClick={handleSigninClick}
            numberOfCards={numberOfCards}
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
    </div>
  );
}

export default NewsCardList;
