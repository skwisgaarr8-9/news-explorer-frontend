import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ newsArticles }) {
  const currentUser = React.useContext(CurrentUserContext);

  const keywords = newsArticles.map((article) => article.keyword);

  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Saved articles</h1>
      <p className="saved-news-header__paragraph">{`${currentUser.name}, you have ${newsArticles.length} saved articles`}</p>
      {/* placeholder values until back end is implemented */}
      <p className="saved-news-header__keywords">
        By keywords:{' '}
        <span className="saved-news-header__keywords_bold">
          {keywords.length > 3
            ? `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} more`
            : keywords.join(' and ')}{' '}
        </span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
