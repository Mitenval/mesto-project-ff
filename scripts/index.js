// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
 function newCard(cardInfo) {
    const template = document.getElementById('card-template').content.cloneNode(true);

    const imgEl = template.querySelector('.card__image');
    imgEl.setAttribute('src', cardInfo.link);

    const titleEl = template.querySelector('.card__title');
    titleEl.textContent = (cardInfo.name);


    const deleteButton = template.querySelector('.card__delete-button')
    deleteButton.addEventListener('click', function (){
        deleteCard(template)
    })

     const list = document.querySelector('.places__list');
     list.append(template)
 }

// @todo: Функция удаления карточки
   function deleteCard(cardEl) {
    console.log(document.querySelector('.card-template'));
    cardEl.remove();
   }
// @todo: Вывести карточки на страницу



initialCards.forEach(function (card) {
    newCard(card);
})


