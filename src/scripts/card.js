import {deleteCardInServer, addLike, deleteLike} from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard (card, deleteFunction, likeFunction, zoomFunction, userID) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const countLikes = cardElement.querySelector(".card__like-count");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  countLikes.textContent = card.likes.length;

  card.likes.forEach(elem => {
    if (elem._id.includes(userID)) {
      likeButton.classList.toggle("card__like-button_is-active");
    }
  });

  if (userID !== card.owner._id) {
    deleteButton.classList.add("card__delete-button-hide");
  };

  deleteButton.addEventListener('click', () => {
    deleteFunction(cardElement, card._id);
  });

  likeButton.addEventListener('click', () => {
    likeFunction(likeButton, card._id, countLikes);
  })

  cardImage.addEventListener('click', () => {
    zoomFunction(cardImage);
  })

  return cardElement;
}

// Функция удаления карточки
export function deleteCard (elem, cardId) {
  deleteCardInServer(cardId)
  .then(() => {
    elem.remove();
  })
  .catch((error) => {
    console.log(error);
  });
}

// Функция постановки или снятия лайка
export function likeCard (elem, cardId, countLikes) {

  const likeMethod = elem.classList.contains("card__like-button_is-active") ? deleteLike : addLike;
  likeMethod(cardId) 
          .then((res) => {
             elem.classList.toggle("card__like-button_is-active"); 
             countLikes.textContent = res.likes.length;
          })
  .catch(err => console.log(err));
}