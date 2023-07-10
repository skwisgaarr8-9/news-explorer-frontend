import './MenuModal.css';
import { useEscape } from '../../hooks/useEscape';
import Header from '../Header/Header';

function MenuModal({ closeModal, isActive, handleSigninClick }) {
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
    <div className="modal menu-modal" onClick={handleClickOutsideClose}>
      <div className="menu-modal__container">
        <Header />
      </div>
    </div>
  );
}

export default MenuModal;
