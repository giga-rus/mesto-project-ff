// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard (card, deleteFunction, likeFunction, zoomFunction) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', () => {
    deleteFunction(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeFunction(likeButton);
  })

  cardImage.addEventListener('click', () => {
    zoomFunction(cardImage);
  })

  return cardElement;
}

// Функция удаления карточки
export function deleteCard (elem) {
  elem.remove();
}

export function likeCard (elem) {
  elem.classList.toggle("card__like-button_is-active");
}