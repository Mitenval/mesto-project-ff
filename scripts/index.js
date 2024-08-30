// @todo: Темплейт карточки



// @todo: DOM узлы

// @todo: Функция создания карточки

function createNewCard(cardInfo) {

    const template = document.getElementById('card-template').content.cloneNode(true);

    const imgEl = template.querySelector('.card__image');
    imgEl.setAttribute('src', cardInfo.link);

    const titleEl = template.querySelector('.card__title');
    titleEl.textContent = cardInfo.name;

    const deleteButton = template.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function (){
        const cardEl = deleteButton.closest('.card');
        deleteCard(cardEl);
    });

    const list = document.querySelector('.places__list');
    list.append(template.querySelector('.card'));
}

// @todo: Функция удаления карточки

function deleteCard(cardEl) {
    if (cardEl) {
        cardEl.remove();
    } else {
        console.error('Card element does not exist');
    }
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
    createNewCard(card);
})

/*
fuck
 */


