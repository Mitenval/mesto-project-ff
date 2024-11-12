// export const sendZapros = () => {
//     return fetch('${config.baseUrl}/cards', {
//         headers: {
//             authorization: '3fda53f6-cae9-47b1-9be0-ea783f14a9a7'
//         }
//     })
//         .then(res => res.json())
//         .then((result) => {
//             console.log(result);
//         });
// }

// function fetchUserInfo() {
//     return fetch('${config.baseUrl}/users/me', {
//         method: 'GET',
//         headers: {
//             authorization: '3fda53f6-cae9-47b1-9be0-ea783f14a9a7'
//         }
//     })
//         .then(res => {
//             if (!res.ok) {
//                 return Promise.reject(`Ошибка: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((userInfo) => {
//             console.log('Информация о пользователе:', userInfo);
//         })
//         .catch((error) => {
//             console.error('Ошибка загрузки информации о пользователе:', error);
//         });
// }
//
// fetchUserInfo();
//
// function fetchCards() {
//     return fetch('${config.baseUrl}/cards', {
//         method: 'GET',
//         headers: {
//             authorization: '3fda53f6-cae9-47b1-9be0-ea783f14a9a7'
//         }
//     })
//         .then(res => {
//             if (!res.ok) {
//                 return Promise.reject(`Ошибка: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((cards) => {
//             console.log('Карточки:', cards);
//         })
//         .catch((error) => {
//             console.error('Ошибка загрузки карточек:', error);
//         });
// }
//
// fetchCards();



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

// Функция для отображения карточек
function renderCards(cards, userId) {
    cards.forEach((card) => {
        // Используйте card.name и card.link для отображения заголовка и изображения карточки
        // Логика для отображения состояния кнопок лайка и удаления, основываясь на userId
        // console.log(`Название: ${card.name}, Ссылка: ${card.link}`);
    });
}

// Функция для обновления профиля пользователя
export function updateUserProfile(name, about) {
    console.log("updateUserProfile", name, about);
    fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: "3fda53f6-cae9-47b1-9be0-ea783f14a9a7",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject("Ошибка при обновлении профиля");
            }
            return res.json();
        })
        .catch((error) => {
            console.error(error);
        });
}

export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: {
            authorization: "3fda53f6-cae9-47b1-9be0-ea783f14a9a7",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    }).then((res) => {
        if (!res.ok) {
            return Promise.reject("Ошибка при добавлении карточки");
        }
        return res.json();
    });
}

export function deleteCardFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: "3fda53f6-cae9-47b1-9be0-ea783f14a9a7",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
}

export function likeCardRequest(cardId) {
    return fetch(
        `${config.baseUrl}/cards/likes/${cardId}`,
        {
            method: "PUT",
            headers: {
                authorization: "3fda53f6-cae9-47b1-9be0-ea783f14a9a7",
                "Content-Type": "application/json",
            },
        },
    ).then((res) => {
        if (!res.ok) {
            return Promise.reject("Ошибка при лайке карточки");
        }
        return res.json();
    });
}

export function unlikeCardRequest(cardId) {
    return fetch(
        `${config.baseUrl}/cards/likes/${cardId}`,
        {
            method: "DELETE",
            headers: {
                authorization: "3fda53f6-cae9-47b1-9be0-ea783f14a9a7",
                "Content-Type": "application/json",
            },
        },
    ).then((res) => {
        if (!res.ok) {
            return Promise.reject("Ошибка при лайке карточки");
        }
        return res.json();
    });
}

export function updateUserAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: "3fda53f6-cae9-47b1-9be0-ea783f14a9a7",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

// todo
//  1) Реализовать во всех fetch проверку res.ok / res.status и catch.
//  2) При редактировании профиля уведомите пользователя о процессе загрузки, поменяв текст кнопки на: «Сохранение...», пока данные загружаются.
//  3) Для работы с API создайте файл api.js. Все запросы присвойте переменным и экспортируйте их. В других модулях вы сможете импортировать эти функции и вызывать их.