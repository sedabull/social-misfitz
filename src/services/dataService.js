const url = "https://socialapp-api.herokuapp.com/";

export function getUsers(limit = 100, offset = 0) {
    return fetch(url + `users?limit=${limit}&offset=${offset}`).then(res => res.json());
}//end getUsers

export function getUser(username) {
    return fetch(url + 'users/' + username).then(res => res.json());
}//end getUser

export function createUser(userData) {
    return fetch(url + 'users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }//end headers
    }).then(res => res.json());
}//createUser

export function updateUser(username, token, userData) {
    return fetch(url + 'users/' + username, {
        method: 'PATCH',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }//end headers
    }).then(res => res.json());
}//end updateUser

export function deleteUser(username, token) {
    return fetch(url +'users/' + username, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }//end headers
    }).then(res => res.json());
}//end deleteUser

export function getUserPicture(username) {
    return fetch(url + `users/${username}/picture`).then(res => res.json());
}//end getUserPicture

export function setUserPicture(username, token, image) {
    let formData = new FormData();
    formData.append("picture", image);

    return fetch(url + `users/${username}/picture`, {
        method: 'PUT',
        body: formData,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }//end headers
    }).then(res => res.json());
}//end setUserPicture

export function getMessage(id = 0) {
    return fetch(url + `messages/${id}`).then(res => res.json());
}//end getMessage

export function getMessages(username = '', limit = 100, offset = 0) {
    let lastParam = username ? '&username=' + username : '';
    return fetch(url + `messages?limit=${limit}&offset=${offset}${lastParam}`).then(res => res.json());
}//end getMessages

export function createMessage(message, token) {
    let data = {text: message};

    return fetch(url + 'messages', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }//end headers
    }).then(res => res.json());
}//end createMessage

export function deleteMessage(id, token) {
    return fetch(url + `messages/${id}`, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }//end headers
    }).then(res => res.json());
}//end deleteMessage

export function addLike(id, token) {
    let data = {messageId: id};

    return fetch(url + 'likes', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }//end headers
    }).then(res => res.json());
}//end addLike

export function deleteLike(id, token) {
    return fetch(url + `likes/${id}`, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }//end headers
    }).then(res => res.json());
}//end deleteLike