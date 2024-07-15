function openModal(popupElement) {

  popupElement.classList.add('popup_is-animated');
  setTimeout(() => {
    popupElement.classList.add('popup_is-opened');
  }, 0);

  popupElement.addEventListener('click', pressOverlayClick)
  document.addEventListener('keydown', closeModalByEsc)
}

function pressOverlayClick(evt) {
  if (evt.target === evt.currentTarget) closeModal(evt.currentTarget);
}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const modalWindow = document.querySelector('.popup_is-opened');
    closeModal(modalWindow)
  };
}

function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  popupElement.removeEventListener('click', pressOverlayClick);
  document.removeEventListener('keydown', closeModalByEsc);
}

export { openModal, closeModal };