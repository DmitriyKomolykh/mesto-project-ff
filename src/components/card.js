import { openModal } from "./modal";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Попап
const popupCardImage = document.querySelector('.popup_type_image');

// Функция создания карточки
function createCard (itemCard, deleteCard, handleClickLikes) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');  
  
  // Заполняем атрибуты картинки и текста данными
  cardImage.src = itemCard.link;
  cardImage.alt = itemCard.name;
  cardTitle.textContent = itemCard.name;
  
  
  // Добавляем обработчик события клика на изображение
  cardImage.addEventListener('click', () =>  openCardImage(itemCard));
  
	// Добавляем обработчик события клика на "КОРЗИНУ"
  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement)); 

	// Добавляем обработчик события клика на лайк
	cardLikeButton.addEventListener('click', () => handleClickLikes (cardLikeButton));

  return cardElement;
}

// Функция удаления карточки  
function deleteCard (cardElement) {
  cardElement.remove();
}

// Функция проверки наличия, установки и снятия лайка
function handleClickLikes (cardLikeButton) {
	
  	if (cardLikeButton.classList.contains('card__like-button_is-active')) {
			cardLikeButton.classList.remove('card__like-button_is-active');
	} else {
		cardLikeButton.classList.add('card__like-button_is-active');
	}
}

// Функция создания модального окна картинки
function openCardImage(itemImage) {
  const popupImage = popupCardImage.querySelector('.popup__image');
  const popupCaption = popupCardImage.querySelector('.popup__caption');

  // Заполняем атрибуты картинки и текста данными
  popupImage.src = itemImage.link;
  popupImage.alt = itemImage.name;
  popupCaption.textContent = itemImage.name;

	openModal(popupCardImage);
}

export { createCard, deleteCard, handleClickLikes }