import '../pages/index.css'; // импорт главного файла стилей 
// import { initialCards } from './cards.js'; // Импорт данных для вывода готовых карточек на страницу
import { openModal, closeModal,  handleClickOverlay, handleClickCloseButton } from './modal.js'; // Импорт функций для работы с модальными окнами
import { createCard, deleteCard, handleClickLikes, handleCardDelete }  from './card.js'; //Импорт функции создания карточки
import { enableValidation, clearValidation } from './validation';
import { updateInfoUser, postNewCard,updateAvatarUser, getInitialInfo } from './api.js'; // Импорт функций для работы с API

///////////////////////КОНСТАНТЫ\\\\\\\\\\\\\\\\\\\\\\\\\\

// DOM узлы
const placesList = document.querySelector('.places__list'); // Контейнер для карточек

// Находим форму в DOM
const editFormElement = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const avatarForm = document.forms['edit-avatar'];
const deleteCardForm = document.forms['delete-card'];

// Кнопки
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image-container');

// Попапы
const editForm = document.querySelector('.popup_type_edit');
const popupsArray = Array.from(document.querySelectorAll('.popup'));
const newCardForm = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');
const popupAvatarForm = document.querySelector('.popup_type_avatar');

// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


// Элементы, куда должны быть вставлены значения полей
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');
const avatarImage = document.querySelector('.profile__image');

const popupImage = popupCardImage.querySelector('.popup__image');
const popupCaption = popupCardImage.querySelector('.popup__caption');

// Константы функции валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

let userId = '';
///////////////////////////////ФУНКЦИИ И КОД\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Функция для рендеринга карточек на страницу
function renderCards(initialCards, userId) {
  initialCards.forEach((itemCard) => {
    const cardElement = createCard(itemCard, deleteCard, openCardImage, handleClickLikes, userId);
    placesList.appendChild(cardElement);
  });
}

// Функция создания модального окна картинки
function openCardImage(itemImage) {
 
  // Заполняем атрибуты картинки и текста данными
  popupImage.src = itemImage.link;
  popupImage.alt = itemImage.name;
  popupCaption.textContent = itemImage.name;
	openModal(popupCardImage);
}

// Установка начальных значений в форме редактирования профиля
function setInitialEditProfileFormValues() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Функция изменения текста кнопки во время загрузки
const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

// Функция установки информации о пользователе
const fillProfileInfo = (userInfo) => {
  userName.textContent = userInfo.name;
  userJob.textContent = userInfo.about;
  avatarImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

// Функция запроса
function handleSubmit(request, evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton);
  // Выполнение запроса
  request()
    .then(() => {
      evt.target.reset(); // Сброс формы после успешной отправки
    })
    .catch((err) => {
      console.log(`Ошибка получения данных: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText); // Возврат исходного текста кнопки
    });
}

// Функция обработчика «отправки» формы редактирования профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Функция выполнения запроса на сервер
  const makeRequest = async () => {
    // Получение значений полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const about = jobInput.value;
    // Выполнение запроса на сервер
    return updateInfoUser(name, about)
      .then((dataUser) => {
        // Установка новых данных профиля на странице с помощью textContent
        userName.textContent = dataUser.name;
        userJob.textContent = dataUser.about;
        console.dir(dataUser);
        // Установка начальных значений в форме редактирования профиля
        setInitialEditProfileFormValues();
        // Закрытие попапа после успешного обновления профиля
        closeModal(editForm);
      });
  }
  // Обработка отправки формы
  handleSubmit(makeRequest, evt);
}

// Функция обработчика «отправки» формы добавления карточки
function handleNewCardFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Функция выполнения запроса на сервер
  const makeRequest = async () => {
    // Получаем значения полей формы
    const newPlaceNameInput = newPlaceForm.elements['place-name'];
    const newLinkInput = newPlaceForm.elements['link'];
    // Получим значения из полей формы из свойства value
    const newItem = {
      name: newPlaceNameInput.value,
      link: newLinkInput.value
    }
    // Выполнение запроса на сервер
    return postNewCard(newPlaceNameInput.value, newLinkInput.value)
      .then((newItem) => {
        // Создаем элемент для новой карточки
        const newCardElement = createCard(newItem, deleteCard, openCardImage, handleClickLikes, userId);
        // Добавляем созданный элемент на страницу
        placesList.prepend(newCardElement); //
        // Закрытие попапа после успешного добавления карточки
        closeModal(newCardForm); 
      });
  }
  handleSubmit(makeRequest, evt);
}

// Функция обработчика «отправки» формы обновления аватара
function handleAvatarFormSubmit(evt) {
  // Функция для отправки запроса на сервер
  const makeRequest = async () => {
    const avatar = avatarForm.elements['avatar-link'].value;
    // Выполнение запроса на сервер
    return updateAvatarUser(avatar)
      .then((res) => {
        // Обновление аватара на странице
        avatarImage.setAttribute('style', `background-image: url('${res.avatar}')`);
        // Закрытие попапа после успешного обновления аватара
        closeModal(popupAvatarForm);
      });
  }
  // Обработка отправки формы 
  handleSubmit(makeRequest, evt);
}

// Отслеживание клика на кнопку открытия формы редактирования профиля
buttonProfileEdit.addEventListener('click', () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openModal(editForm);
});

// Отслеживание клика на кнопку открытия формы добавления карточки
buttonProfileAdd.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardForm);
});

// Отслеживание клика на оверлей и кнопку закрытия для закрытия модального окна 
popupsArray.forEach((popup) => {
  popup.addEventListener('click', handleClickOverlay);
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', handleClickCloseButton);
});

// Отслеживание клика на аватар
avatarEditButton.addEventListener('click', () => {
  clearValidation(popupAvatarForm, validationConfig);
  setInitialEditProfileFormValues();
  openModal(popupAvatarForm);
});

// Прикрепляем обработчик к форме hедактирования профиля:
// он следит за событием "submit"
editFormElement.addEventListener('submit', handleProfileFormSubmit); 
// Прикрепляем обработчик к форме добавления карточки
newPlaceForm.addEventListener('submit', handleNewCardFormSubmit); 
// Прикрепляем обработчик к форме обновления Аватар
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
// Прикрепляем обработчик к форме подтверждения удаления
deleteCardForm.addEventListener('submit', handleCardDelete);

// Вызываем функцию запросов на сервер для получения карточек и информации о пользователе
getInitialInfo()
.then((res) => {
  const userInfo = res[0];
  userId = userInfo._id;
  const initialCards = res[1];
  fillProfileInfo(userInfo);
  renderCards(initialCards, userId);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});

// Вызываем функцию валидации форм
enableValidation(validationConfig); 