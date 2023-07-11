import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ newsArticles, isLoggedIn, handleSigninClick }) {
  return (
    <section className="saved-news">
      <SavedNewsHeader />
      <NewsCardList
        newsArticles={newsArticles}
        isLoggedIn={isLoggedIn}
        handleSigninClick={handleSigninClick}
      />
    </section>
  );
}

export default SavedNews;
