import {
    editModal,
    imageModal,
    newCardModal,
} from "../index";

const activeModalClass = 'popup_is-opened';
let activeModalCloseButtonEl;

export function openImageModal(cardInfo){
    showModalElement(imageModal);
    registerModalWatchers(imageModal);

    const popupImgEl = imageModal.querySelector('.popup__image');
    popupImgEl.setAttribute('src', cardInfo.link);
    popupImgEl.setAttribute('alt', cardInfo.name);

    const popupCaptionEl = imageModal.querySelector('.popup__caption');
    popupCaptionEl.textContent = cardInfo.name;
}

export function openProfileModal() {
    showModalElement(editModal);
    registerModalWatchers(editModal);
}

export function openNewCardModal() {
    showModalElement(newCardModal);
    registerModalWatchers(newCardModal);
}

function showModalElement(modalEl) {
    modalEl.classList.add(activeModalClass);
}

export function closeActiveModal() {
    document.querySelector(`.${activeModalClass}`).classList.remove(activeModalClass);
}

function onCrossClick() {
    unRegisterModalWatchers();
    closeActiveModal();
}

function onBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
        unRegisterModalWatchers()
        closeActiveModal();
    }
}

function onEsc(e) {
    if (e.key === 'Escape') {
        unRegisterModalWatchers()
        closeActiveModal();
    }
}

function registerModalWatchers(forModal) {
    activeModalCloseButtonEl = forModal.querySelector('.popup__close');

    document.addEventListener('keydown', onEsc);
    activeModalCloseButtonEl.addEventListener('click', onCrossClick);
    document.querySelector(`.${activeModalClass}`).addEventListener('click', onBackdropClick);
}

export function unRegisterModalWatchers() {
    document.removeEventListener('keydown', onEsc);
    activeModalCloseButtonEl.removeEventListener('click', onCrossClick);
    document.querySelector(`.${activeModalClass}`).removeEventListener('click', onBackdropClick);

    activeModalCloseButtonEl = undefined;
}