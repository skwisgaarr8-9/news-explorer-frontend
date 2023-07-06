import React from 'react';
import './LoginModal.css';
import { useForm } from '../../hooks/useForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function LoginModal({ closeModal, isActive, handleRegisterClick }) {
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
  });

  React.useEffect(() => {
    if (Object.values(isInvalid).every((item) => item === false)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isInvalid, setIsFormValid]);

  React.useEffect(() => {
    if (isActive) {
      setValues({
        email: '',
        password: '',
      });
    }
  }, [isActive, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <ModalWithForm
      title={'Sign in'}
      name="login"
      closeModal={closeModal}
      submitButtonText={'Sign in'}
      handleSubmit={handleSubmit}
      isActive={isActive}
      handleRedirect={handleRegisterClick}
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
        minLength={3}
        onChange={handleChange}
      />
      {isInvalid.password && (
        <ErrorMessage
          errorMessage={'Invalid password'}
          className={`error-message error-message_content_password`}
        />
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
