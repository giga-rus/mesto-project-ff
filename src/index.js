import './pages/index.css';

import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';

// DOM узлы
const cardsSection = document.querySelector(".places__list");

// Edit
const popupEdit = document.querySelector(".popup_type_edit");
const btnOpenEdit = document.querySelector(".profile__edit-button");
const btnCloseEdit = popupEdit.querySelector(".popup__close");
const formEdit = popupEdit.querySelector(".popup__form");
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");
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

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleFormEditSubmit); 

// New Card
const popupNewCard = document.querySelector(".popup_type_new-card");
const btnOpenNewCard = document.querySelector(".profile__add-button");
const btnCloseNewCard = popupNewCard.querySelector(".popup__close");
const formNewCard = popupNewCard.querySelector(".popup__form");
const textInput = formNewCard.querySelector(".popup__input_type_card-name");
const urlInput = formNewCard.querySelector(".popup__input_type_url");

btnOpenNewCard.addEventListener('click', () => {
  openModal(popupNewCard);
})

btnCloseNewCard.addEventListener('click', () => {
  closeModal(popupNewCard);
})

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: textInput.value,
    link: urlInput.value
  };
  cardsSection.prepend(createCard(newCard, deleteCard, likeCard, zoomImage));
  formNewCard.reset();
  closeModal(popupNewCard);
}

formNewCard.addEventListener('submit', handleFormNewCardSubmit); 

// Zoom Image
const popupZoomImage = document.querySelector(".popup_type_image");
const btnCloseZoomImage = popupZoomImage.querySelector(".popup__close");
const photoZoneZoomImage = popupZoomImage.querySelector(".popup__image");
const photoCaptionZoomImage = popupZoomImage.querySelector(".popup__caption");

btnCloseZoomImage.addEventListener('click', () => {
  closeModal(popupZoomImage);
});

function zoomImage(elem) {
  openModal(popupZoomImage);
  photoZoneZoomImage.setAttribute("src", elem.src);
  photoCaptionZoomImage.setAttribute("alt", elem.alt);
  photoCaptionZoomImage.textContent = elem.alt;
}

// Вывести карточки на страницу
function addCards() {
  initialCards.forEach((elem) => {
    const card = createCard(elem, deleteCard, likeCard, zoomImage);
    cardsSection.append(card);
  });
}

addCards();