import { useForm } from '../../hooks/useForm';
import './SearchForm.css';

function SearchForm({ searchBtnClick }) {
  const { handleChange, values } = useForm({ topic: '' });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchBtnClick(values.topic);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Enter topic"
        name="topic"
        value={values.topic}
        autoComplete="off"
        maxLength="40"
        onChange={handleChange}
      ></input>
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
