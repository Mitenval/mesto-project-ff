import './styles/index.css';
import {createNewCard, deleteCard, likeCard} from "./components/card.js";
import {initialCards} from "./components/cards.js";
import {
    closeActiveModal,
    registerModalWatchers, showModalElement,
    unRegisterModalWatchers,
} from "./components/modal";
import {clearValidation, enableValidation} from "./validation";
import {sendZapros} from "./api";

const templateContent = document.querySelector('#card-template').content;
const imageModal = document.querySelector('.popup_type_image');
const editModal = document.querySelector('.popup_type_edit');
const newCardModal= document.querySelector('.popup_type_new-card');
const profileImageEditModal = document.querySelector('.popup_type_avatar')
const list = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const createNewCardButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const cardFormElement = newCardModal.querySelector('.popup__form[name="new-place"]');
const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.elements['name'];
const descriptionInput = profileFormElement.elements['description'];
const profileImage = document.querySelector('.profile__image');

const popupFormSelector = '.popup__form';
const formElementsSelectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

initialCards.forEach(function (cardInfo) {
    const card = createNewCard(cardInfo, templateContent, deleteCard, likeCard, openImageModal);
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
    const newCard = createNewCard({ name, link }, templateContent, deleteCard, likeCard, openImageModal);

    list.prepend(newCard);
    unRegisterModalWatchers();
    closeActiveModal();
    cardFormElement.removeEventListener('submit', handleCardFormSubmit);
}

function openProfileModal() {
    clearValidation(editModal.querySelector('.popup__form'), formElementsSelectors);
    showModalElement(editModal);
    registerModalWatchers(editModal);
}

function openNewCardModal() {
    clearValidation(newCardModal.querySelector('.popup__form'), formElementsSelectors);
    showModalElement(newCardModal);
    registerModalWatchers(newCardModal);
}

function openImageModal(cardInfo){
    showModalElement(imageModal);
    registerModalWatchers(imageModal);

    const popupImgEl = imageModal.querySelector('.popup__image');
    popupImgEl.setAttribute('src', cardInfo.link);
    popupImgEl.setAttribute('alt', cardInfo.name);

    const popupCaptionEl = imageModal.querySelector('.popup__caption');
    popupCaptionEl.textContent = cardInfo.name;
}

function openAvatarModal() {
    clearValidation(profileImageEditModal.querySelector('.popup__form'), formElementsSelectors);
    showModalElement(profileImageEditModal);
    registerModalWatchers(profileImageEditModal);

}

enableValidation({
    formSelector: popupFormSelector,
    ...formElementsSelectors,
});

profileImage.addEventListener('click', openAvatarModal);

sendZapros().then((data) => {
    console.log('fuck',data)
})

