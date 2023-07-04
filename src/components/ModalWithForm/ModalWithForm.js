import { useEscape } from '../../hooks/useEscape';
import './ModalWithForm.css';

function ModalWithForm({
  name,
  title,
  children,
  closeModal,
  submitButtonText,
  handleSubmit,
  isActive,
  handleRedirect,
}) {
  useEscape(handleCloseModal);

  const handleClickOutsideClose = (evt) => {
    if (evt.target.classList.contains('modal')) {
      handleCloseModal();
    }
  };

  if (isActive) {
    setTimeout(() => {
      document.querySelector('.modal').classList.add('modal_opened');
    }, 10);
  }

  function handleCloseModal() {
    setTimeout(() => {
      closeModal();
    }, 250);
    document.querySelector('.modal').classList.remove('modal_opened');
  }

  return (
    <div
      className={`modal modal_type_${name}`}
      onMouseDown={handleClickOutsideClose}
    >
      <div className="modal__container">
        <form className="modal__form form" onSubmit={handleSubmit}>
          <h2 className="modal__title">{title}</h2>
          {children}
          <button className="modal__button" type="submit">
            {submitButtonText}
          </button>
          <div className="modal__redirect">
            or
            <button
              className="modal__redirect-button"
              type="button"
              onClick={handleRedirect}
            >
              {name === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </form>
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseModal}
        ></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
