import "./styles/index.css";
import { createNewCard } from "./components/card.js";
import {
    closeActiveModal,
    registerModalWatchers,
    showModalElement,
    unRegisterModalWatchers,
} from "./components/modal";
import { clearValidation, enableValidation } from "./validation";
import {
    addCard,
    deleteCardFromServer,
    likeCardRequest,
    loadUserDataAndCards,
    unlikeCardRequest, updateUserAvatar,
    updateUserProfile,
} from "./api";

const templateContent = document.querySelector("#card-template").content;
const imageModal = document.querySelector(".popup_type_image");
const editModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");
const profileImageEditModal = document.querySelector(".popup_type_avatar");
const list = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const createNewCardButton = document.querySelector(".profile__add-button");
const profileNameElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
    ".profile__description",
);
const cardFormElement = newCardModal.querySelector(
    '.popup__form[name="new-place"]',
);
const profileFormElement = document.querySelector(
    '.popup__form[name="edit-profile"]',
);
const avatarFormElement = profileImageEditModal.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.elements["name"];
const descriptionInput = profileFormElement.elements["description"];
const avatarInput = avatarFormElement.elements["link"];
const profileImage = document.querySelector(".profile__image");

const popupFormSelector = ".popup__form";
const formElementsSelectors = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};
const savingText = "Сохранение..."
const saveText = "Сохранить"

let userId;

profileEditButton.addEventListener("click", function () {
    nameInput.value = profileNameElement.textContent;
    descriptionInput.value = profileDescriptionElement.textContent;

    openProfileModal();
    profileFormElement.addEventListener("submit", handleProfileFormSubmit);
});

createNewCardButton.addEventListener("click", function () {
    cardFormElement.reset();

    openNewCardModal();
    cardFormElement.addEventListener("submit", handleCardFormSubmit);
});

profileImage.addEventListener('click', function () {
    avatarFormElement.reset();
    openAvatarModal();
    avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const submitButton = profileFormElement.querySelector('.popup__button')

    submitButton.textContent = savingText

    profileNameElement.textContent = nameInput.value;
    profileDescriptionElement.textContent = descriptionInput.value;

    unRegisterModalWatchers();
    closeActiveModal();
    updateUserProfile(nameInput.value, descriptionInput.value).finally(() => {
        submitButton.textContent = saveText
    });
    profileFormElement.removeEventListener("submit", handleProfileFormSubmit);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const name = cardFormElement.elements["place-name"].value;
    const link = cardFormElement.elements["link"].value;
    const submitButton = cardFormElement.querySelector('.popup__button')

    submitButton.textContent = savingText

    addCard(name, link)
        .then((newCardData) => {
            const newCard = createNewCard(
                newCardData,
                userId,
                templateContent,
                deleteCardFromServer,
                likeCard,
                openImageModal,
            );
            list.prepend(newCard);

            unRegisterModalWatchers();
            closeActiveModal();
        })
        .catch((error) => {
            console.error("Ошибка добавления карточки:", error);
        })
        .finally(() => {
            cardFormElement.removeEventListener("submit", handleCardFormSubmit);
            submitButton.textContent = saveText
        });
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const submitButton = avatarFormElement.querySelector('.popup__button')

    submitButton.textContent = savingText

    const newAvatarLink = avatarInput.value;
    updateUserAvatar(newAvatarLink)
        .then((userData) => {
            profileImage.src = userData.avatar;
            unRegisterModalWatchers();
            closeActiveModal();
        })
        .catch((err) => console.error('Ошибка обновления аватара:', err))
        .finally(() => {
            avatarFormElement.removeEventListener('submit', handleAvatarFormSubmit);
            submitButton.textContent = saveText
        });
}

function openProfileModal() {
    clearValidation(
        editModal.querySelector(".popup__form"),
        formElementsSelectors,
    );
    showModalElement(editModal);
    registerModalWatchers(editModal);
}

function openNewCardModal() {
    clearValidation(
        newCardModal.querySelector(".popup__form"),
        formElementsSelectors,
    );
    showModalElement(newCardModal);
    registerModalWatchers(newCardModal);
}

function openImageModal(cardInfo) {
    showModalElement(imageModal);
    registerModalWatchers(imageModal);

    const popupImgEl = imageModal.querySelector(".popup__image");
    popupImgEl.setAttribute("src", cardInfo.link);
    popupImgEl.setAttribute("alt", cardInfo.name);

    const popupCaptionEl = imageModal.querySelector(".popup__caption");
    popupCaptionEl.textContent = cardInfo.name;
}

function openAvatarModal() {
    clearValidation(
        profileImageEditModal.querySelector(".popup__form"),
        formElementsSelectors,
    );
    showModalElement(profileImageEditModal);
    registerModalWatchers(profileImageEditModal);
}

enableValidation({
    formSelector: popupFormSelector,
    ...formElementsSelectors,
});

profileImage.addEventListener("click", openAvatarModal);

loadUserDataAndCards().then(([userData, cards]) => {
    userId = userData._id;

    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cards.forEach(function (cardInfo) {
        const card = createNewCard(
            cardInfo,
            userId,
            templateContent,
            deleteCardFromServer,
            likeCard,
            openImageModal,
        );
        list.append(card);
    });
});

function likeCard(cardInfo, hasMyLike) {
    if (hasMyLike) {
        return unlikeCardRequest(cardInfo._id).then((response) => {
            return {
                isLiked: hasMyLike,
                newCardInfo: response,
            };
        });
    }

    return likeCardRequest(cardInfo._id).then((response) => {
        return {
            isLiked: hasMyLike,
            newCardInfo: response,
        };
    });
}
