const activeModalClass = 'popup_is-opened';
let activeModalCloseButtonEl;

export function showModalElement(modalEl) {
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

export function registerModalWatchers(forModal) {
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