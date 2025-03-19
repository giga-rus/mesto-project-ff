export function openModal (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeByOverlay);
}

export function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeByOverlay);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}