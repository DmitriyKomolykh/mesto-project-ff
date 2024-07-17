// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard (itemCard, deleteCard, handleClickLikes, openCardImage) {

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
	  cardLikeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, handleClickLikes }