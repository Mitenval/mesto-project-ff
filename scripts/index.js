// @todo: Темплейт карточки
const templateContent = document.querySelector('#card-template').content;

// @todo: DOM узлы
const list = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createNewCard(cardInfo, deleteCardCb) {
    const card = templateContent.cloneNode(true).querySelector('.card');

    card.querySelector('.card__image').setAttribute('src', cardInfo.link);
    card.querySelector('.card__title').textContent = cardInfo.name;
    card.querySelector('.card__delete-button').addEventListener('click', function (){
        deleteCardCb(card);
    });

    return card;
}

// @todo: Функция удаления карточки
function deleteCard(cardEl) {
    cardEl.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardInfo) {
    const card = createNewCard(cardInfo, deleteCard);
    list.append(card);
})
