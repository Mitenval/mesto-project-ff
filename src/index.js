import './styles/index.css';
import {createNewCard, deleteCard, likeCard} from "./components/card.js";
import {initialCards} from "./components/cards.js";
import {
    closeActiveModal,
    openNewCardModal,
    openProfileModal,
    unRegisterModalWatchers,
} from "./components/modal";


export const templateContent = document.querySelector('#card-template').content;
export const imageModal = document.querySelector('.popup_type_image');
export const editModal = document.querySelector('.popup_type_edit');
export const newCardModal= document.querySelector('.popup_type_new-card');
const list = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const createNewCardButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const cardFormElement = newCardModal.querySelector('.popup__form[name="new-place"]');
const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]')
const nameInput = profileFormElement.elements['name'];
const descriptionInput = profileFormElement.elements['description'];

initialCards.forEach(function (cardInfo) {
    const card = createNewCard(cardInfo, deleteCard, likeCard);
    list.append(card);
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileNameElement.textContent;
    descriptionInput.value = profileDescriptionElement.textContent;

    openProfileModal();
    profileFormElement.addEventListener('submit', handleProfileFormSubmit);
});

createNewCardButton.addEventListener('click', function () {
    cardFormElement.reset();

    openNewCardModal();
    cardFormElement.addEventListener('submit', handleCardFormSubmit);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileNameElement.textContent = nameInput.value;
    profileDescriptionElement.textContent = descriptionInput.value;

    unRegisterModalWatchers();
    closeActiveModal();
    profileFormElement.removeEventListener('submit', handleProfileFormSubmit);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const name = cardFormElement.elements['place-name'].value;
    const link = cardFormElement.elements['link'].value;
    const newCard = createNewCard({ name, link }, deleteCard, likeCard);

    list.prepend(newCard);
    unRegisterModalWatchers();
    closeActiveModal();
    cardFormElement.removeEventListener('submit', handleCardFormSubmit);
}