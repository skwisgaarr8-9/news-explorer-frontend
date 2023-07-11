import React from 'react';
import { useForm } from '../../hooks/useForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './SearchForm.css';

function SearchForm({ searchBtnClick, isSearching, newsApiError }) {
  const { handleChange, values, setValues } = useForm({ topic: '' });
  const [isError, setIsError] = React.useState(false);

  const handleSearchInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (values.topic === '') {
      setIsError(true);
    }

    if (values.topic !== '') {
      searchBtnClick(values.topic);
    }
  };

  React.useEffect(() => {
    if (!isSearching) {
      setValues({ topic: '' });
    }
  }, [setValues, isSearching]);

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
        onChange={handleSearchInputChange}
      ></input>
      {isError && (
        <ErrorMessage
          errorMessage={'Please enter a topic'}
          className={'error-message error-message_content_search-form'}
        />
      )}
      {newsApiError && (
        <ErrorMessage
          errorMessage={`${newsApiError} error. Please try again shortly`}
          className={`error-message error-message_content_search-form`}
        />
      )}
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
