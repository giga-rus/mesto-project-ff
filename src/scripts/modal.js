// Открытие модального окна
export function openModal (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeByOverlay);
}

// Закрытие модального окна
export function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeByOverlay);
}

// Закрытие модального окна через ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

// Закрытие модального окна через Overlay
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}