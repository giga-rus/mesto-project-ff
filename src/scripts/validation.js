// Отображение ошибки и подсветка инпута
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Скрытие ошибки и подсветки инпута
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Проверка валидности инпутов и отображение кастомных ошибок
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMsg);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Установка слушателей инпутов
const setEventListeners = (formElement, inputElement, btnSubmit, btnClassDisabled, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  const buttonElement = formElement.querySelector(btnSubmit);
  toggleButtonState(inputList, buttonElement, btnClassDisabled);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, btnClassDisabled);
    });
  });
};

// Запуск валидации
export const enableValidation = (configs) => {
  const formList = Array.from(document.querySelectorAll(configs.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement, configs.inputSelector, configs.submitButtonSelector, configs.inactiveButtonClass, configs.inputErrorClass, configs.errorClass);
  });
};

// Проверка невалидности
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Переключение статуса кнопки
function toggleButtonState (inputList, buttonElement, btnClassDisabled) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(btnClassDisabled);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(btnClassDisabled);
  }
}

// Очистка ошибок перед открытием модального окна
export const clearValidation = (formElement, configs) => {
  const inputList = Array.from(formElement.querySelectorAll(configs.inputSelector));
  const buttonElement = formElement.querySelector(configs.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configs.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configs.inputErrorClass, configs.errorClass);
    inputElement.setCustomValidity("");
  });
};