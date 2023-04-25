import { castIngredsDbToClient, castIngredDbToClient, transformFirebaseRecipe, transformRecipeList, makeRecipe } from './utils';
import {getToken} from '../helpers/authService';

export const MAX_FETCH_BATCH = 3;

const makeUrl = (path) => {
    return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/recipes${path ? '/' + path : ''}.json`;
}

const makeIngredsUrl = (path) => {
    try {
        const token = getToken();
        return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/list/${token.id}${path ? '/' + path : ''}.json`;
    }
    catch {
        return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/list/666/${path ? '/' + path : ''}.json`;
    }
}

const addAuth = (url) => {
    const tokenInfo = getToken();
    return tokenInfo ? (url + '?auth=' + tokenInfo.token) : url;
}

export const makeError = (error) => {
    return {error: {message: error.message, status: error.cause}};
}

async function publicFetch(url, errorMessage, callback) {
    return fetch(url)
    .then(response => {
        if (!response.ok) throw new Error(errorMessage, {cause: response.status})
        else return response.json()
    })
    .then(data => callback(data))
    .catch(makeError);
}

async function privateFetch(url, method, body, errorMessage, callback) {
    return fetch(addAuth(url), {
        method: method,
        body: body? JSON.stringify(body) : null,
        headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if (res.status === 401) throw Error('Your authentication token is invalid. Try logging out and in again.', {cause: res.status});
            else if (!res.ok) throw new Error(errorMessage, {cause: res.status});
            else return res.json()
        })
        .then(data => {
            if (callback) return callback(data);
            else return data;
        })
        .catch(makeError);
}

export async function fetchRecipes(startAt='') {
    const url = makeUrl() + '?' + encodeURI(
        [["orderBy", '"$key"'].join('='),
        ["startAt", `${startAt ? `"${startAt}0"` : ''}`].join('='),
        ["limitToFirst", `${MAX_FETCH_BATCH}`].join('=')].join('&')
    )
    return publicFetch(url, 'Failed to fetch recipes', transformRecipeList)
}

export async function fetchRecipe(recipeId) {
    return publicFetch(
        makeUrl(recipeId), 
        'Failed to fetch recipe', 
        (data) => {
            if (data) return transformFirebaseRecipe(data, recipeId)
            else throw new Error('Recipe does not exist', {cause: 404});
        }
    );
}

export async function sendRecipe(recipe, id) {
    return privateFetch(
        makeUrl(id ? id : ''),
        id ? 'PATCH' : 'POST',
        recipe,
        'Failed to send recipe',
        () => makeRecipe(recipe, id)
    );
}

export async function deleteRecipe(id) {
    return privateFetch(
        makeUrl(id),
        'DELETE',
        null,
        'Failed to delete recipe',
        (data) => ({})
    );
}

export async function fetchIngredients() {
    return privateFetch(
        makeIngredsUrl(), 
        'GET',
        null,
        'Failed to fetch ingredients', 
        castIngredsDbToClient
    );
}

export async function addIngredient(item) {
    return privateFetch(
        makeIngredsUrl(),
        'POST',
        item,
        'Failed to send item to shopping list',
        res => castIngredDbToClient(res.name, item)
    )
}

export async function updateIngredient(id, item) {
    return privateFetch(
        makeIngredsUrl(id),
        'PATCH',
        item,
        'Failed to send item to shopping list',
        () => castIngredDbToClient(id, item)
    )
}

export async function updateIngredients(items) {
    return privateFetch(
        makeIngredsUrl(),
        'PUT',
        items,
        'Failed to send items to shopping list',
        castIngredsDbToClient
    )
}

export async function deleteIngredient(id) {
    return privateFetch(
        makeIngredsUrl(id),
        'DELETE',
        null,
        'Failed to delete ingredient',
        (data) => ({})
    );
}