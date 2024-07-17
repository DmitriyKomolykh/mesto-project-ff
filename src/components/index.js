import '../pages/index.css'; // импорт главного файла стилей 
import { initialCards } from './cards.js'; // Импорт данных для вывода готовых карточек на страницу
import { openModal, closeModal,  handleClickOverlay, handleClickCloseButton } from './modal.js'; // Импорт функций для работы с модальными окнами
import { createCard, deleteCard, handleClickLikes }  from './card.js'; //Импорт функции создания карточки

///////////////////////КОНСТАНТЫ\\\\\\\\\\\\\\\\\\\\\\\\\\

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Находим форму в DOM
const formElement = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];

// Кнопки
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonProfileAdd = document.querySelector('.profile__add-button');

// Попапы
const editForm = document.querySelector('.popup_type_edit');
const popupsArray = Array.from(document.querySelectorAll('.popup'));
const newCardForm = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');

// Контейнер для карточек
const placesList = document.querySelector('.places__list');

// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Элементы, куда должны быть вставлены значения полей
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');


///////////////////////////////ФУНКЦИИ И КОД\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(function(itemCard) {
   cardsContainer.append(createCard(itemCard, deleteCard, handleClickLikes, openCardImage));
  });
}
renderCards();

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

// Отслеживание клика на кнопку открытия формы редактирования профиля
buttonProfileEdit.addEventListener('click', function(evt) {
  setInitialEditProfileFormValues();
  openModal(editForm);
});

// Установка начальных значений в форме редактирования профиля
function setInitialEditProfileFormValues() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Отслеживание клика на оверлей и кнопку закрытия 
// для закрытия модального окна 
popupsArray.forEach((popup) => {
  popup.addEventListener("click", handleClickOverlay);
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", handleClickCloseButton);
});

// Обработчик «отправки» формы редактирования профиля, (хотя пока она никуда отправляться не будет)
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получение значений полей jobInput и nameInput из свойства value
  const nameUser = nameInput.value;
  const aboutUser = jobInput.value;

  // Выбор элементов, куда должны быть вставлены значения полей
  const userName = document.querySelector('.profile__title');
  const userJob = document.querySelector('.profile__description');

  // Установка новых значений с помощью textContent
  userName.textContent = nameUser;
  userJob.textContent = aboutUser;
  closeModal(editForm);
}

// Прикрепляем обработчик к форме:он следит за событием “submit” - «отправка»
formElement.addEventListener('submit', handleProfileFormSubmit); 

// Отслеживание клика на кнопку открытия формы добавления карточки
buttonProfileAdd.addEventListener('click', () => {
  openModal(newCardForm);
});

// Обработчик «отправки» формы добавления карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  // Получаем значения полей формы
  const newPlaceNameInput = newPlaceForm.elements['place-name'];
  const newLinkInput = newPlaceForm.elements['link'];

  // Получим значения из полей формы из свойства value
  const newItem = {
    name: newPlaceNameInput.value,
    link: newLinkInput.value
  };

  // Создаем элемент карточки и добавляем его на страницу
  const newCardElement = createCard(newItem, deleteCard, handleClickLikes);
  placesList.prepend(newCardElement);

  // Очищаем поля формы
  this.reset();

  // Закрытие попапа после успешного добавления карточки
  closeModal(newCardForm); 
};

// Прикрепляем обработчик к форме:он следит за событием “submit” - «отправка»
newPlaceForm.addEventListener('submit', handleNewCardFormSubmit); 