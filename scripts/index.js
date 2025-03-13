// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsSection = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard (card, deleteFunction) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', () => {
    deleteFunction(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(elem) {
  elem.remove();
}

// @todo: Вывести карточки на страницу
function addCards() {
  initialCards.forEach((elem) => {
    const card = createCard(elem, deleteCard);
    cardsSection.append(card);
  });
}

addCards();