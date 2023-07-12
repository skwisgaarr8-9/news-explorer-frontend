import './SavedNewsHeader.css';

function SavedNewsHeader() {
  const userName = 'Elise';
  const number = 5;
  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Saved articles</h1>
      <p className="saved-news-header__paragraph">{`${userName}, you have ${number} saved articles`}</p>
      {/* placeholder values until back end is implemented */}
      <p className="saved-news-header__keywords">
        By keywords: Nature, Yellowstone, and 2 other
      </p>
    </div>
  );
}

export default SavedNewsHeader;
