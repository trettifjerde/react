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
    const tokenInfo = localStorage.getItem('cbToken');

    if (!tokenInfo) {
        return null;
    }
    const [token, expires] = JSON.parse(tokenInfo);

    const expirationDate = new Date(expires);
    if (new Date() > expirationDate) {
        removeToken();
        return null;
    }

    return {token, expires: +expires};
}

export function setToken(token) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    const expires = expiration.getTime();

    localStorage.setItem('cbToken', JSON.stringify([token, expires]));

    return {token, expires}; //expires: expiration date in milliseconds
}

export function removeToken() {
    localStorage.removeItem('cbToken');
}

export function authGuard() {
    const token = getToken();
    if (!token)
        return redirect('/login');
    return null;
}