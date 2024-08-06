// код валидации форм

// Функция отображения ошибки ввода
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(validationConfig.inputErrorClass);
  // errorElement.textContent = inputElement.validationMessage;
  errorElement.textContent = errorMessage;
 	errorElement.classList.add(validationConfig.errorClass);
};

// Функция скрытия отображения ошибки ввода
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // if (errorElement) {
  inputElement.classList.remove(validationConfig.inputErrorClass);
	errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
// }
};

// Функция проверки валидности поля
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  };
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  };
};

// Функция проверки наличия невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

// Функция смены состояние кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    // buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    // buttonElement.disabled = false;
  }
};

// Функция обработчика событий
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// функция ответственная за включение валидации всех форм
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
		setEventListeners(formElement, validationConfig);
  });
};

// функция которая очищает ошибки валидации формы
//  и делает кнопку неактивной.
const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
    inputElement.setCustomValidity('');
    if (hasInvalidInput(inputList)) {
      document.getElementById("name").value= '';
      document.getElementById("description").value= '';
      document.getElementById("place-name").value= '';
      document.getElementById("link").value= '';
    }
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
};


export { enableValidation, clearValidation }

