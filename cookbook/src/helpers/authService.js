import { authKey } from "./authKeys";
import { makeError } from "./dataService";
import { redirect } from "react-router-dom";

const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authKey}`;
const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authKey}`;

function castFormToAuthRequest(form) {
    return {email: form.email, password: form.password, returnSecureToken: true};
}

async function authenticate(url, form) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(castFormToAuthRequest(form)),
        headers: {'Content-Type': 'application/json'}
    })
    .catch(makeError);
}

export async function logIn(data) {
    return authenticate(signInUrl, data);
}

export async function signUp(data) {
    return authenticate(signUpUrl, data);
}

export function getToken() {
    const tokenInfo = localStorage.getItem('userData');

    if (!tokenInfo) {
        return null;
    }
    const token = JSON.parse(tokenInfo);

    if (new Date() > new Date(token.expirationDate)) {
        removeToken();
        return null;
    }

    return token;
}

export function setToken(res) {
    const expiresIn = +res.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresIn).toISOString();
    const user = {email: res.email, id: res.localId, token: res.idToken, expirationDate: expirationDate};
    localStorage.setItem('userData', JSON.stringify(user));
    return user;
}

export function removeToken() {
    localStorage.removeItem('userData');
}

export function authGuard() {
    const token = getToken();
    if (!token)
        return redirect('/login');
    return null;
}