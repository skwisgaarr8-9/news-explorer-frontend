import React from 'react';
import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm';

function RegisterModal({ closeModal, isActive, handleLoginClick }) {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  React.useEffect(() => {
    if (isActive) {
      setValues({
        email: '',
        password: '',
        username: '',
      });
    }
  }, [isActive, setValues]);

  return (
    <ModalWithForm
      title={'Sign up'}
      name="register"
      closeModal={closeModal}
      submitButtonText={'Sign up'}
      handleSubmit={handleSubmit}
      isActive={isActive}
      handleRedirect={handleLoginClick}
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
      />
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
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
