import './pages/index.css';

import {createCard, deleteCard, likeCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getUser, getCards, editProfile, postNewCard} from './scripts/api.js';

// DOM узлы
const cardsSection = document.querySelector(".places__list");
const configsForValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Форма редактирования
const popupEdit = document.querySelector(".popup_type_edit");
const btnOpenEdit = document.querySelector(".profile__edit-button");
const btnCloseEdit = popupEdit.querySelector(".popup__close");
const formEdit = popupEdit.querySelector(".popup__form");
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Открытие окна редактирования
btnOpenEdit.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEdit, configsForValid);
})

// Функция закрытия крестиком
function closeButton (btn, popup) {
  btn.addEventListener('click', () => {
    closeModal(popup);
  })
}

// Закрытие окна редактирования
closeButton(btnCloseEdit, popupEdit);

// Функция обработки формы окна редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  editProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Слушатель формы окна редактирования
formEdit.addEventListener('submit', handleFormEditSubmit); 

// Форма создания новой карты
const popupNewCard = document.querySelector(".popup_type_new-card");
const btnOpenNewCard = document.querySelector(".profile__add-button");
const btnCloseNewCard = popupNewCard.querySelector(".popup__close");
const formNewCard = popupNewCard.querySelector(".popup__form");
const textInput = formNewCard.querySelector(".popup__input_type_card-name");
const urlInput = formNewCard.querySelector(".popup__input_type_url");

// Открытие окна создания новой карты
btnOpenNewCard.addEventListener('click', () => {
  openModal(popupNewCard);
  formNewCard.reset();
  clearValidation(formNewCard, configsForValid);
})

// Закрытие окна создания новой карты
closeButton(btnCloseNewCard, popupNewCard);

// Функция обработки формы окна создания новой карты
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: textInput.value,
    link: urlInput.value
  };
  postNewCard(newCard.name, newCard.link);
  cardsSection.prepend(createCard(newCard, deleteCard, likeCard, zoomImage));
  formNewCard.reset();
  closeModal(popupNewCard);
}

// Слушатель формы окна создания новой карты
formNewCard.addEventListener('submit', handleFormNewCardSubmit); 

// Окно увеличения картинки
const popupZoomImage = document.querySelector(".popup_type_image");
const btnCloseZoomImage = popupZoomImage.querySelector(".popup__close");
const photoZoneZoomImage = popupZoomImage.querySelector(".popup__image");
const photoCaptionZoomImage = popupZoomImage.querySelector(".popup__caption");

// Закрытие окна увеличения картинки
closeButton(btnCloseZoomImage, popupZoomImage);

// Функция увеличения картинки
function zoomImage(elem) {
  openModal(popupZoomImage);
  photoZoneZoomImage.setAttribute("src", elem.src);
  photoCaptionZoomImage.setAttribute("alt", elem.alt);
  photoCaptionZoomImage.textContent = elem.alt;
}

// Форма редактирования аватара
const profileAvatar = document.querySelector(".profile__image");

// Получение всех данных с сервера и отображение на странице
const getData = () => {
  Promise.all([getUser(), getCards()])
  .then((data) => {
    const [userData, cardsData] = data;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach((elem) => {
      const card = createCard(elem, deleteCard, likeCard, zoomImage);
      cardsSection.append(card);
    });
  })
  .catch((error) => {
    console.log(error);
  });
};
getData();

// Запуск валидации
enableValidation(configsForValid);