export const sendZapros = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-24/cards', {
        headers: {
            authorization: '3fda53f6-cae9-47b1-9be0-ea783f14a9a7'
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        });
}

document.forms
//todo для регулярного выражения
//
// /^[a-zа-яё\s-]+$/i
//
// const regex = /^[a-zа-яё\s-]+$/i;
// const input = "Ваш текст для проверки";
//
// if (regex.test(input)) {
//     console.log("Текст прошел проверку!");
// } else {
//     console.log("Ошибка: допустимы только латинские и кириллические буквы, пробелы и дефисы.");
// }


//todo Функция проверки для одного поля

// function validateInput(inputElement, errorMessageElement) {
//     const input = inputElement.value;
//
//     if (regex.test(input)) {
//         errorMessageElement.textContent = "";  // Убираем сообщение об ошибке
//         return true;
//     } else {
//         errorMessageElement.textContent = "Ошибка: допустимы только буквы, пробелы и дефисы.";
//         return false;
//     }
// }

//todo Проверка обоих полей и установка состояния кнопки

// function validateForm() {
//     const isField1Valid = validateInput(textInput1, errorMessage1);
//     const isField2Valid = validateInput(textInput2, errorMessage2);
//     saveButton.disabled = !(isField1Valid && isField2Valid);  // Кнопка активна, только если оба поля валидны
// }

//todo Обработчики событий для ввода

// textInput1.addEventListener("input", validateForm);
// textInput2.addEventListener("input", validateForm);
