// функции для открытия всплывающих окон
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClick);
}

// функции для закрытия всплывающих окон
function closeModal(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClick);
  }
}

// функции для обработки клавиши Escape
function handleEscClick(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
    }
  }

// функции для обработки слушателя overlay click (за пределы модального окна)
function handleClickOverlay(evt) { 
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

// функции для обработки слушателя закрытия окна по "крестику" 
function handleClickCloseButton(evt) {
  const button = evt.target;
  const popup = button.closest('.popup');
  closeModal(popup);
}

export { openModal, closeModal, handleClickOverlay, handleClickCloseButton }