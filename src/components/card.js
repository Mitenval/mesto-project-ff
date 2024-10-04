import {templateContent} from "../index";
import {openImageModal} from "./modal.js";

const cardLikedClass = 'card__like-button_is-active';

export function createNewCard(cardInfo, deleteCardCb, likeCardCb) {
    const card = templateContent.cloneNode(true).querySelector('.card');
    const cardImg = card.querySelector('.card__image');
    const cardLikeButton = card.querySelector('.card__like-button');

    cardImg.setAttribute('src', cardInfo.link);
    cardImg.setAttribute('alt', cardInfo.name);
    cardImg.addEventListener('click', () => {
        openImageModal(cardInfo)
    });
    cardLikeButton.addEventListener('click', function () {
        likeCardCb(cardLikeButton);
    });
    card.querySelector('.card__title').textContent = cardInfo.name;
    card.querySelector('.card__delete-button').addEventListener('click', function (){
        deleteCardCb(card);
    });

    return card;
}

export function likeCard(cardLikeButton) {
   if (cardLikeButton.classList.contains(cardLikedClass)) {
       cardLikeButton.classList.remove(cardLikedClass)
   } else {
       cardLikeButton.classList.add(cardLikedClass)
   }
}

export function deleteCard(cardEl) {
    cardEl.remove();
}


