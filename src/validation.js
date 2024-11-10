//todo очистка ошибок валидации вызовом clearValidation
// Очищает ошибки валидации формы и делает кнопку неактивной.
// Эта функция должна принимать как параметры DOM-элемент формы,
// для которой очищаются ошибки валидации и объект с настройками валидации

// clearValidation(profileForm, validationConfig);

// надо в index.js


// todo проверка и вывод ошибки полей
//
// const formElement = document.querySelector('.form');
// const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = (formElement, inputElement, /*errorMessage,*/ inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
};

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, formInput, inputErrorClass, errorClass) => {
    if (!formInput.validity.valid) {
        showError(formElement, formInput, /*formInput.validationMessage,*/ inputErrorClass, errorClass);
    } else {
        hideError(formElement, formInput, inputErrorClass, errorClass);
    }
};


const setEventListeners = (formElement, formElementsSelectors) => {
    const {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    } = formElementsSelectors;

    const formInputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(formInputs, buttonElement, inactiveButtonClass);

    formInputs.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);

            toggleButtonState(formInputs, buttonElement, inactiveButtonClass);
        });
    });
};

export function enableValidation(selectors) {
    const {
        formSelector,
        ...formElementsSelectors
    } = selectors;

    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        form.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        setEventListeners(form, formElementsSelectors);
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

export function clearValidation(formElement, formElementsSelectors) {
    const {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    } = formElementsSelectors;

    const formInputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(formInputs, buttonElement, inactiveButtonClass);

    formInputs.forEach((inputElement) => {
        hideError(formElement, inputElement, inputErrorClass, errorClass);
    });
}

// todo Функция активации/деактивации кнопки "Сохранить"

// function toggleButtonState(formElement, submitButton, inputSelector, inactiveButtonClass) {
//   const isFormValid = Array.from(formElement.querySelectorAll(inputSelector)).every(input => input.validity.valid);
//   submitButton.disabled = !isFormValid;
//   submitButton.classList.toggle(inactiveButtonClass, !isFormValid);
// }


// todo Функция инициализации валидации для формы

// function setFormValidation(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
//   const submitButton = formElement.querySelector(submitButtonSelector);


// todo Установка начального состояния кнопки

  // toggleButtonState(formElement, submitButton, inputSelector, inactiveButtonClass);


// todo Добавляем обработчики на все инпуты

//   formElement.addEventListener('input', (event) => {
//     checkInputValidity(event.target, inputErrorClass, errorClass);
//     toggleButtonState(formElement, submitButton, inputSelector, inactiveButtonClass);
//   });
// }

// todo Функция проверки и отображения ошибок
// function checkInputValidity(inputElement, inputErrorClass, errorClass) {
//   const errorElement = inputElement.nextElementSibling;
//
//   if (!inputElement.validity.valid) {
//     inputElement.classList.add(inputErrorClass);
//     errorElement.textContent = inputElement.dataset.invalidText || inputElement.validationMessage;
//     errorElement.classList.add(errorClass);
//   } else {
//     inputElement.classList.remove(inputErrorClass);
//     errorElement.textContent = "";
//     errorElement.classList.remove(errorClass);
//   }
// }


// todo Функция для проверки на корректность ввода символов (латиница, кириллица, дефис, пробел)
//  ???
// function isValidInput(input) {
//     const regex = "/^[a-zа-яё\s-]+$/i";
//     return regex.test(input.value);
// }
