import React from 'react';
import './NewsCard.css';
import { useMatch } from 'react-router-dom';

function NewsCard({
  cardInfo,
  isLoggedIn,
  handleSigninClick,
  handleSaveArticle,
  keyword,
  handleDeleteButtonClick,
}) {
  const match = useMatch('/');
  const card =
    'publishedAt' in cardInfo
      ? {
          keyword,
          title: cardInfo.title,
          text: cardInfo.description,
          date: cardInfo.publishedAt,
          source: cardInfo.source.name,
          link: cardInfo.url,
          image: cardInfo.urlToImage,
        }
      : cardInfo;

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
    // window.open(card.link, '_blank');
    console.log(card);
  };

  const handleBookMarkButtonClick = (evt) => {
    handleSaveArticle(card);
    evt.target.parentElement
      .querySelector('.card__button_path_main')
      .classList.toggle('card__button_path_main_active');
  };

  const date = new Date(card.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.image}
        alt={card.title}
        onClick={handleCardClick}
      />
      <div className="card__content" onClick={handleCardClick}>
        <p className="card__date">{date}</p>
        <h2 className="card__title">{card.title}</h2>
        <p className="card__paragraph">{card.text}</p>
        <p className="card__source">{card.source}</p>
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
            onClick={isLoggedIn ? handleBookMarkButtonClick : null}
            className="card__button card__button_path_main"
            type="button"
          ></button>
        </div>
      ) : (
        <div className="card__absolute-content">
          <span className="card__keyword">{card.keyword}</span>
          <button
            className="card__button card__button_path_saved-news"
            type="button"
            onClick={() => {
              handleDeleteButtonClick(card._id);
            }}
          ></button>
        </div>
      )}
    </li>
  );
}

export default NewsCard;
