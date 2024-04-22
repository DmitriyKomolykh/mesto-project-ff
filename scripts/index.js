// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, delCard) {
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  cardElem.querySelector('.card__title').textContent = name;
  cardElem.querySelector('.card__image').src = link;
  cardElem.querySelector('.card__image').alt = name;
  cardElem.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardElem)); 
  return cardElem;
}

// @todo: Функция удаления карточки  
function delCard (cardElem) {
  cardElem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
  cardsContainer.append(createCard(item.name, item.link, delCard));
});