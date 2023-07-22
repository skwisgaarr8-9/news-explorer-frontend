import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ newsArticles }) {
  const currentUser = React.useContext(CurrentUserContext);

  const keywords = newsArticles.map((article) => article.keyword);

  const getKeywordString = (data) => {
    if (keywords.length === 1) {
      return `${keywords[0]}`;
    }

    if (keywords.length > 1) {
      const count = {};

      for (const keyword of data) {
        if (count[keyword]) {
          count[keyword]++;
        } else {
          count[keyword] = 1;
        }
      }

      const counted = [];
      for (const item in count) {
        counted.push([item, count[item]]);
      }

      counted.sort((a, b) => {
        return b[1] - a[1];
      });

      if (counted.length === 1) {
        return `${counted[0][0]}`;
      } else if (counted.length === 2) {
        return `${counted[0][0]} and ${counted[1][0]}`;
      } else {
        return `${counted[0][0]}, ${counted[1][0]}, and ${
          counted.length - 2
        } more`;
      }
    } else {
      return null;
    }
  };

  const keywordString = getKeywordString(keywords);

  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Saved articles</h1>
      <p className="saved-news-header__paragraph">{`${currentUser.name}, you have ${newsArticles.length} saved articles`}</p>
      <p className="saved-news-header__keywords">
        By keywords:{' '}
        <span className="saved-news-header__keywords_bold">
          {keywordString ? keywordString : ''}
        </span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
