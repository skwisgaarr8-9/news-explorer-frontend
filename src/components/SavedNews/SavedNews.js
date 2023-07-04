import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ newsArticles, isLoggedIn, handleSigninClick }) {
  return (
    <div className="saved-news">
      <SavedNewsHeader />
      <NewsCardList
        newsArticles={newsArticles}
        isLoggedIn={isLoggedIn}
        handleSigninClick={handleSigninClick}
      />
    </div>
  );
}

export default SavedNews;
