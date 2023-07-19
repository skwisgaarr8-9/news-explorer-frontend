import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  newsArticles,
  isLoggedIn,
  handleSigninClick,
  handleDeleteButtonClick,
}) {
  return (
    <section className="saved-news">
      <SavedNewsHeader newsArticles={newsArticles} />
      <NewsCardList
        handleDeleteButtonClick={handleDeleteButtonClick}
        newsArticles={newsArticles}
        isLoggedIn={isLoggedIn}
        handleSigninClick={handleSigninClick}
      />
    </section>
  );
}

export default SavedNews;
