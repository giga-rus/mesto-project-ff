// Настройки для запросов
const configsForApi = {
  url: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: '6c050bf3-926c-4b67-a11d-b9a035b013a1',
    "Content-Type": "application/json"
  }
};

// Запрос - ответ
const getRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Загрузка информации о пользователе с сервера
export const getUser = () => {
  return fetch(`${configsForApi.url}/users/me`, {
    method: 'GET',
    headers: configsForApi.headers,
  })
  .then(res => getRes(res));
};

// Загрузка карточек с сервера
export const getCards = () => {
  return fetch(`${configsForApi.url}/cards`, {
    method: 'GET',
    headers: configsForApi.headers,
  })
  .then(res => getRes(res));
};

// Редактирование профиля
export const editProfile = (userName, userDescription) => {
  return fetch(`${configsForApi.url}/users/me`, {
    method: 'PATCH',
    headers: configsForApi.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription
    })
  })
  .then(res => getRes(res));
};

// Добавление новой карточки
export const postNewCard = (cardName, cardLink) => {
  return fetch(`${configsForApi.url}/cards`, {
    method: 'POST',
    headers: configsForApi.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => getRes(res));
};

// Удаление карточки
export const deleteCardInServer = (cardID) => {
  return fetch(`${configsForApi.url}/cards/${cardID}`, {
    method: 'DELETE',
    headers: configsForApi.headers
  })
  .then(res => getRes(res));
};

// Постановка лайка
export const addLike = (cardID) => {
  return fetch(`${configsForApi.url}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: configsForApi.headers
  })
  .then(res => getRes(res));
};

// Снятие лайка
export const deleteLike = (cardID) => {
  return fetch(`${configsForApi.url}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: configsForApi.headers
  })
  .then(res => getRes(res));
};

// Обновление аватара пользователя
export const editAvatar = (avatarLink) => {
  return fetch(`${configsForApi.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: configsForApi.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => getRes(res));
};