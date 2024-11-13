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

