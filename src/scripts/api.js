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
const getUser = () => {
  return fetch(`${configsForApi.url}/users/me`, {
    method: 'GET',
    headers: configsForApi.headers,
  })
  .then(res => getRes(res))
  .then((result) => {
    console.log(result);
  }); 
};

// Загрузка карточек с сервера
const getCards = () => {
  return fetch(`${configsForApi.url}/cards`, {
    method: 'GET',
    headers: configsForApi.headers,
  })
  .then(res => getRes(res))
  .then((result) => {
    console.log(result);
  }); 
};

// Получение всех данных с сервера
export const getData = () => {
  return Promise.all([getUser(), getCards()]);
};