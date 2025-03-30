import './pages/index.css';

import {createCard, deleteCard, likeCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getUser, getCards, editProfile, postNewCard, editAvatar} from './scripts/api.js';

// ID пользователя
let userID;

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

// Фунцкия активации лоадера
const activeLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
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
const btnSaveEdit = formEdit.querySelector(".popup__button");

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
  activeLoading(true, btnSaveEdit);
  editProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      activeLoading(false, btnSaveEdit);
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
const btnSaveNewCard = formNewCard.querySelector(".popup__button");

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
  const cardName = textInput.value;
  const cardLink = urlInput.value;
  activeLoading(true, btnSaveNewCard);
  postNewCard(cardName, cardLink)
  .then((res) => {
    cardsSection.prepend(createCard(res, deleteCard, likeCard, zoomImage, userID));
    formNewCard.reset();
    closeModal(popupNewCard);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    activeLoading(false, btnSaveNewCard);
  });
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
const btnOpenAvatar = document.querySelector(".profile__image-edit");
const popupAvatar = document.querySelector(".popup_type_edit-avatar");
const btnCloseAvatar = popupAvatar.querySelector(".popup__close");
const formAvatar = popupAvatar.querySelector(".popup__form");
const urlInputAvatar = formAvatar.querySelector(".popup__input_type_url");
const btnSaveAvatar = formAvatar.querySelector(".popup__button");

// Открытие окна редактирования аватара
btnOpenAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  formAvatar.reset();
  clearValidation(formAvatar, configsForValid);
})

// Закрытие окна редактирования аватара
closeButton(btnCloseAvatar, popupAvatar);

// Функция обработки формы окна редактирования аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarLink = urlInputAvatar.value;
  activeLoading(true, btnSaveAvatar);
  editAvatar(avatarLink)
  .then((res) => {
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    formAvatar.reset();
    closeModal(popupAvatar);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    activeLoading(false, btnSaveAvatar);
  });
}

// Слушатель формы окна редактирования аватара
formAvatar.addEventListener('submit', handleFormAvatarSubmit); 

// Получение всех данных с сервера и отображение на странице
const getData = () => {
  Promise.all([getUser(), getCards()])
  .then((data) => {
    const [userData, cardsData] = data;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userID = userData._id;
    cardsData.forEach((elem) => {
      const card = createCard(elem, deleteCard, likeCard, zoomImage, userID);
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