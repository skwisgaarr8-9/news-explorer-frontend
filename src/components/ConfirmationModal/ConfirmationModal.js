import { useEscape } from '../../hooks/useEscape';
import './ConfirmationModal.css';

function ConfirmationModal({
  name,
  handleDeleteArticle,
  isActive,
  closeModal,
  buttonText,
  title,
  handleButton,
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
    <div className="modal confirmation" onClick={handleClickOutsideClose}>
      <div className="modal__container confirmation__container">
        <h2 className="modal__title">{title}</h2>
        <button
          className="confirmation__button"
          type="button"
          onClick={handleButton}
        >
          {buttonText}
        </button>
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default ConfirmationModal;
