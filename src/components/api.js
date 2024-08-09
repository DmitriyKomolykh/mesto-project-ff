//URL сервера и заголовки запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
  headers: {
    authorization: 'a58f9955-dc05-4418-b9ea-9729d11b88c0',
    'Content-Type': 'application/json'
  }
}

// Функция проверки данных
const checkResponseData = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  }
}

// Функция для получения всех карточек
const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  }).then((res) => checkResponseData(res))
} 

// Функция получения информации о пользователе
const getInfoUser = async () => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'GET',
    headers: config.headers,
  }).then((res) => checkResponseData(res));
}

// Выполнение запросов на сервер для получения карточек и информации о пользователе 
const getInitialInfo = async () => {
  return Promise.all([getInfoUser(), getInitialCards()])
};

// Функция обновления информации о пользователе
const updateInfoUser = async (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => checkResponseData(res));
}

// Функция добавление новой карточки
const postNewCard = async (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => checkResponseData(res));
}

//Функция удаления карточки по id
const deleteCardId = async (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkResponseData(res));
}

// Функция добавления лайка карточке
const addLikeCard = async (cardId)  => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	}).then((res) => checkResponseData(res));
}

// Функция удаления лайка с карточки
const deleteLikeCard = async (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
		headers: config.headers,
  }).then((res) => checkResponseData(res));
}

// Функция обновления аватара пользователя
const updateAvatarUser = async (avatarLink) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',	
	headers: config.headers,
	body: JSON.stringify({
		avatar: avatarLink,
	}),
}).then((res) =>  checkResponseData(res));
}

export { getInitialCards, getInfoUser, updateInfoUser, postNewCard,
         deleteCardId, addLikeCard, deleteLikeCard, updateAvatarUser, getInitialInfo
}