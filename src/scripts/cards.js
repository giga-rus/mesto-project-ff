const image1 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const image2 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const image3 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const image4 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const image5 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const image6 = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

export const initialCards = [
  {
    name: "Архыз",
    link: image1,
  },
  {
    name: "Челябинская область",
    link: image2,
  },
  {
    name: "Иваново",
    link: image3,
  },
  {
    name: "Камчатка",
    link: image4,
  },
  {
    name: "Холмогорский район",
    link: image5,
  },
  {
    name: "Байкал",
    link: image6,
  }
];