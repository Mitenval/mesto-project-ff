const cohortId = "wff-cohort-24";

const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: '3fda53f6-cae9-47b1-9be0-ea783f14a9a7',
        'Content-Type': 'application/json'
    }
}

// Функция для загрузки данных пользователя и карточек
export function loadUserDataAndCards() {
    return Promise.all([
        fetch(`${config.baseUrl}/users/me`, {
            method: "GET",
            headers: config.headers,
        }),
        fetch(`${config.baseUrl}/cards`, {
            method: "GET",
            headers: config.headers,
        }),
    ])
        .then(([userRes, cardsRes]) => {
            if (!userRes.ok || !cardsRes.ok) {
                return Promise.reject("Ошибка при загрузке данных");
            }
            return Promise.all([userRes.json(), cardsRes.json()]);
        })
        .catch((error) => {
            console.error(error);
        });
}

// Функция для обновления профиля пользователя
export function updateUserProfile(name, about) {
    const promise = fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    });

    return preformRequest(promise);
}

export function addCard(name, link) {
    const promise = fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    });

    return preformRequest(promise);
}

export function deleteCardFromServer(cardId) {
    const promise = fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    });

    return preformRequest(promise);
}

export function likeCardRequest(cardId) {
    const promise = fetch(
        `${config.baseUrl}/cards/likes/${cardId}`,
        {
            method: "PUT",
            headers: config.headers,
        },
    )

    return preformRequest(promise);
}

export function unlikeCardRequest(cardId) {
    const promise = fetch(
        `${config.baseUrl}/cards/likes/${cardId}`,
        {
            method: "DELETE",
            headers: config.headers,
        },
    )

    return preformRequest(promise);
}

export function updateUserAvatar(avatarLink) {
    const promise = fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    });

    return preformRequest(promise);
}

// todo
//  1) При редактировании профиля уведомите пользователя о процессе загрузки, поменяв текст кнопки на: «Сохранение...», пока данные загружаются.


function preformRequest(requestPromise) {
    return requestPromise
        .then((result) => {
            if (result.ok) {
                return result.json();
            }

            return Promise.reject(`Ошибка: ${result.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}