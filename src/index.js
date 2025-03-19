import './pages/index.css';

import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';

// DOM узлы
const cardsSection = document.querySelector(".places__list");

// Edit
const popupEdit = document.querySelector(".popup_type_edit");
const btnOpenEdit = document.querySelector(".profile__edit-button");
const btnCloseEdit = popupEdit.querySelector(".popup__close");
const formElement = popupEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

btnOpenEdit.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
})

btnCloseEdit.addEventListener('click', () => {
  closeModal(popupEdit);
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 

// New Card
const popupNewCard = document.querySelector(".popup_type_new-card");
const btnOpenNewCard = document.querySelector(".profile__add-button");
const btnCloseNewCard = popupNewCard.querySelector(".popup__close");

btnOpenNewCard.addEventListener('click', () => {
  openModal(popupNewCard);
})

btnCloseNewCard.addEventListener('click', () => {
  closeModal(popupNewCard);
})

// Open Image
const popupOpenImage = document.querySelector(".popup_type_image");

// Вывести карточки на страницу
function addCards() {
  initialCards.forEach((elem) => {
    const card = createCard(elem, deleteCard);
    cardsSection.append(card);
  });
}

addCards();