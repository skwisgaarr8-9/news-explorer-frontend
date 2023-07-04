import SearchForm from '../SearchForm/SearchForm';
import './Main.css';

function Main({ searchBtnClick }) {
  return (
    <main className="main">
      <h1 className="main__heading">What's going on in the world?</h1>
      <p className="main__paragraph">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm searchBtnClick={searchBtnClick} />
    </main>
  );
}

export default Main;
