


//todo требования к коду валидации
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
//
// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// });
// надо в index.js


//todo очистка ошибок валидации вызовом clearValidation
// Очищает ошибки валидации формы и делает кнопку неактивной.
// Эта функция должна принимать как параметры DOM-элемент формы,
// для которой очищаются ошибки валидации и объект с настройками валидации

// clearValidation(profileForm, validationConfig);
// надо в index.js


// todo проверка и вывод ошибки полей
//
const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = (input, errorMessage) => {
  input.classList.add('form__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('form__input-error_active');
};

const hideError = (input) => {
  input.classList.remove('form__input_type_error');
  formError.classList.remove('form__input-error_active')
  formError.textContent('')
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});



// todo Функция для проверки на корректность ввода символов (латиница, кириллица, дефис, пробел)
//  ???
// function isValidInput(input) {
//     const regex = "/^[a-zа-яё\s-]+$/i";
//     return regex.test(input.value);
// }
