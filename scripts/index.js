// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const placesItem = document.querySelector('.places__item card');

// @todo: Функция создания карточки
function addCard(name, link, delCard) {
	const cardElem = template.querySelector('.card').cloneNode(true);
	cardElem.querySelector('.card__title').textContent = name;
	cardElem.querySelector('.card__image').src = link;
	cardElem.querySelector('.card__image').alt = name;
	cardElem.querySelector('.card__delete-button').addEventListener('click', delCard); 
	return cardElem;
}

// @todo: Функция удаления карточки  
function delCard(event) {
	const cardDelete = event.target.closest('.card');
	cardDelete.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
	placesList.append(addCard(item.name, item.link, delCard));
});