import '../pages/index.css'; // импорт главного файла стилей 
import { initialCards } from './cards.js'; // Импорт данных для вывода готовых карточек на страницу
import { openModal, closeModal } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement)); 
  return cardElement;
}

// @todo: Функция удаления карточки  
function deleteCard (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
  cardsContainer.append(createCard(item.name, item.link, deleteCard));
});