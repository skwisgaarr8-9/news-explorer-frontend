import React from 'react';
import { useMatch } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ newsArticles, isLoggedIn, handleSigninClick }) {
  const match = useMatch('/');

  return (
    <div className="cards">
      <h2 className="cards__title">Search results</h2>
      <ul className="cards__list">
        {newsArticles.map((article) => (
          <NewsCard
            key={article.source.id}
            cardInfo={article}
            isLoggedIn={isLoggedIn}
            handleSigninClick={handleSigninClick}
          />
        ))}
      </ul>
      {match && (
        <button type="button" className="cards__button">
          See more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
