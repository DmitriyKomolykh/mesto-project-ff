import { deleteCardId, addLikeCard, deleteLikeCard } from './api.js'; // Импорт функций для работы с API
import { openModal, closeModal } from './modal.js'; // Импорт функций для работы с модальными окнами

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const deletePopup = document.querySelector('.popup_type_delete-card');

// Функция создания карточки
function createCard (itemCard, deleteCard, openCardImage, handleClickLikes, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');  

  // Заполняем атрибуты картинки и текста данными
  cardImage.src = itemCard.link;
  cardImage.alt = itemCard.name;
  cardTitle.textContent = itemCard.name;
  cardLikeCount.textContent = itemCard.likes.length;

	// Добавляем обработчик события клика на "КОРЗИНУ", если пользователь является владельцем
  if ( userId !== itemCard.owner._id ) {
    cardDeleteButton.style.display = 'none';
    } else {
      cardDeleteButton.addEventListener('click', () => {
      const cardId = itemCard._id;
      openPopupDelete( cardElement, cardId );
    });
  }

  // Проверка лайка пользователя в массиве
  const isLiked = itemCard.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

	// Добавляем обработчик события клика на лайк
  cardLikeButton.addEventListener('click', () => {
    handleClickLikes ( itemCard, cardLikeCount, cardLikeButton );
  });

  // Добавляем обработчик события клика на изображение
  cardImage.addEventListener('click', () =>  {
      openCardImage(itemCard)
  })
   return cardElement;
};

// Функция подсчета лайков
function handleClickLikes ( itemCard, cardLikeCount, cardLikeButton ) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    //  Удаление лайка
    deleteLikeCard(itemCard._id)
    .then((res) => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
      cardLikeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка удаления лайка: ${err}`);
    });
  } else {
    // добавление лайка
    addLikeCard(itemCard._id)
    .then((res) => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
      cardLikeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка добавления лайка: ${err}`);
    });
  }
}

//////////////////////// Удаления карточки ///////////////////////////////
let selectedCard;
let id;

// Функция открытия попапа для подтверждения удаления карточки
const openPopupDelete = (cardElement, cardId) => {
  selectedCard = cardElement;
  id = cardId;
  openModal(deletePopup);
};

// Функция удаления карточки
function deleteCard(selectedCard, id) {
  // Отправляем запрос на сервер для удаления карточки
  deleteCardId(id)
      .then(() => {
        // Удаляем карточку из DOM после успешного удаления
      selectedCard.remove();
      // Закрываем попап после успешного удаления
      closeModal(deletePopup);
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`);
    });
}

// Обработчик события отправки формы для удаления карточки
function handleCardDelete(evt) {
  evt.preventDefault();
  // Вызываем функцию удаления карточки
  deleteCard(selectedCard, id);
}

export { createCard, deleteCard, handleClickLikes, handleCardDelete, openPopupDelete }