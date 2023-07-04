import React from 'react';
import './NewsCard.css';

function NewsCard({ cardInfo, isLoggedIn, handleSigninClick }) {
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
      />
      <div className="card__content">
        <p className="card__date">{publishedAt}</p>
        <h2 className="card__title">{cardInfo.title}</h2>
        <p className="card__paragraph">{cardInfo.description}</p>
        <p className="card__source">{cardInfo.source.name}</p>
      </div>
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
        <button className="card__button" type="button"></button>
      </div>
    </li>
  );
}

export default NewsCard;
