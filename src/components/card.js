const cardLikedClass = "card__like-button_is-active";
const cardDeleteButtonHidden = "card__delete-button--hidden";

export function createNewCard(
    cardInfo,
    userId,
    templateContent,
    deleteCardCb,
    likeCardCb,
    openImageModal,
) {
    const card = templateContent.cloneNode(true).querySelector(".card");
    const cardImg = card.querySelector(".card__image");
    const cardLikeButton = card.querySelector(".card__like-button");
    const likeCounter = card.querySelector(".card__like-counter");
    const cardDeleteButton = card.querySelector(".card__delete-button");

    cardImg.setAttribute("src", cardInfo.link);
    cardImg.setAttribute("alt", cardInfo.name);
    updateCardLikeCounter(likeCounter, cardInfo);

    cardImg.addEventListener("click", () => {
        openImageModal(cardInfo);
    });

    changeCardLikeButtonState(cardLikeButton, cardInfo, userId);

    cardLikeButton.addEventListener("click", function () {
        const hasMyLikeOnClick = getHasMyLike(cardInfo, userId);

        likeCardCb(cardInfo, hasMyLikeOnClick).then((data) => {
            cardInfo.likes = data.newCardInfo.likes;
            changeCardLikeButtonState(cardLikeButton, data.newCardInfo, userId);
            updateCardLikeCounter(likeCounter, data.newCardInfo);
        });
    });

    card.querySelector(".card__title").textContent = cardInfo.name;

    if (cardInfo.owner._id === userId) {
        cardDeleteButton.addEventListener("click", function () {
            deleteCardCb(cardInfo._id).then(() => {
                deleteCard(card);
            });
        });
    } else {
        cardDeleteButton.classList.add(cardDeleteButtonHidden);
    }

    return card;
}
export function deleteCard(cardEl) {
    cardEl.remove();
}
export function changeCardLikeButtonState(cardLikeButton, cardInfo, userId) {
    const hasMyLike = getHasMyLike(cardInfo, userId);

    if (hasMyLike) {
        cardLikeButton.classList.add(cardLikedClass);
    } else {
        cardLikeButton.classList.remove(cardLikedClass);
    }
}

function getHasMyLike(cardInfo, userId) {
    return cardInfo.likes.some((likeInfo) => {
        return likeInfo._id === userId;
    });
}

function updateCardLikeCounter(likeCounter, cardInfo) {
    likeCounter.textContent = cardInfo.likes.length;
}
