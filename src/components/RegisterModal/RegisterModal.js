import React from 'react';
import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useForm } from '../../hooks/useForm';

function RegisterModal({ closeModal, isActive, handleLoginClick }) {
  const {
    values,
    handleChange,
    setValues,
    isFormValid,
    setIsFormValid,
    isInvalid,
  } = useForm({
    email: '',
    password: '',
    username: '',
  });

  React.useEffect(() => {
    if (isActive) {
      setValues({
        email: '',
        password: '',
        username: '',
      });
    }
  }, [isActive, setValues]);

  React.useEffect(() => {
    if (Object.values(isInvalid).every((item) => item === false)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isInvalid, setIsFormValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <ModalWithForm
      title={'Sign up'}
      name="register"
      closeModal={closeModal}
      submitButtonText={'Sign up'}
      handleSubmit={handleSubmit}
      isActive={isActive}
      handleRedirect={handleLoginClick}
      isFormValid={isFormValid}
    >
      <label className="form__label" htmlFor="email">
        Email
      </label>
      <input
        className="form__input"
        type="email"
        id="email"
        value={values.email}
        name="email"
        autoComplete="off"
        placeholder="Enter email"
        required
        onChange={handleChange}
      />
      {isInvalid.email && (
        <ErrorMessage
          errorMessage={'Invalid email address'}
          className={'error-message error-message_content_email'}
        />
      )}
      <label className="form__label" htmlFor="password">
        Password
      </label>
      <input
        className="form__input"
        type="password"
        id="password"
        value={values.password}
        name="password"
        autoComplete="off"
        placeholder="Enter password"
        required
        onChange={handleChange}
        minLength={3}
      />
      {isInvalid.password && (
        <ErrorMessage
          errorMessage={'Invalid password'}
          className={'error-message error-message_content_password'}
        />
      )}
      <label className="form__label" htmlFor="username">
        Username
      </label>
      <input
        className="form__input"
        type="text"
        id="username"
        name="username"
        value={values.username}
        autoComplete="off"
        placeholder="Enter your username"
        required
        onChange={handleChange}
        minLength={2}
        maxLength={30}
      />
      {isInvalid.username && (
        <ErrorMessage
          errorMessage={'Invalid username'}
          className={'error-message error-message_content_username'}
        />
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
