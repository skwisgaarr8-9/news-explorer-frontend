import React from 'react';
import './NewsCard.css';
import { useMatch } from 'react-router-dom';

function NewsCard({ cardInfo, isLoggedIn, handleSigninClick }) {
  const match = useMatch('/');

  const handleMouseEnter = (evt) => {
    if (!isLoggedIn && evt.target.classList.contains('card__button')) {
      evt.target.parentElement
        .querySelector('.card__warning')
        .classList.add('card__warning_active');
    }
  };
  const handleMouseLeave = (evt) => {
    evt.target.parentElement
      .querySelector('.card__warning')
      .classList.remove('card__warning_active');
  };

  const handleCardClick = () => {
    window.open(cardInfo.url, '_blank');
  };

  const publishedAt = new Date(cardInfo.publishedAt).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <li className="card">
      <img
        className="card__image"
        src={cardInfo.urlToImage}
        alt={cardInfo.title}
        onClick={handleCardClick}
      />
      <div className="card__content" onClick={handleCardClick}>
        <p className="card__date">{publishedAt}</p>
        <h2 className="card__title">{cardInfo.title}</h2>
        <p className="card__paragraph">{cardInfo.description}</p>
        <p className="card__source">{cardInfo.source.name}</p>
      </div>
      {match ? (
        <div
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="card__absolute-content"
        >
          <button
            className="card__warning"
            type="button"
            onClick={handleSigninClick}
          >
            Sign in to save articles
          </button>
          <button
            className="card__button card__button_path_main"
            type="button"
          ></button>
        </div>
      ) : (
        <div className="card__absolute-content">
          <button
            className="card__button card__button_path_saved-news"
            type="button"
          ></button>
        </div>
      )}
    </li>
  );
}

export default NewsCard;
