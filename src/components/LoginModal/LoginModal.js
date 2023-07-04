import React from 'react';
import './LoginModal.css';
import { useForm } from '../../hooks/useForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function LoginModal({ closeModal, isActive, handleRegisterClick }) {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  React.useEffect(() => {
    if (isActive) {
      setValues({
        email: '',
        password: '',
      });
    }
  }, [isActive, setValues]);

  return (
    <ModalWithForm
      title={'Sign in'}
      name="login"
      closeModal={closeModal}
      submitButtonText={'Sign in'}
      handleSubmit={handleSubmit}
      isActive={isActive}
      handleRedirect={handleRegisterClick}
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
    </ModalWithForm>
  );
}

export default LoginModal;
