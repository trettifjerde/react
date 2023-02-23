import { transformFirebaseRecipe, transformRecipeList } from './utils';

export const MAX_FETCH_BATCH = 3;

const makeUrl = (path) => {
    return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/recipes${path ? '/' + path : ''}.json`;
}

const makeError = (error) => {
    console.log(error);
    return {error: {message: error.message, status: error.cause}};
}

export async function fetchRecipes(startAt='') {
    const url = makeUrl() + '?' + encodeURI(
        [["orderBy", '"$key"'].join('='),
        ["startAt", `${startAt ? `"${startAt}0"` : ''}`].join('='),
        ["limitToFirst", `${MAX_FETCH_BATCH}`].join('=')].join('&')
    )

    return fetch(url)
        .then(response => {
            if (!response.ok) 
                throw new Error('Failed to fetch recipes', {cause: response.status})
            else
                return response.json()
        })
        .then(data => transformRecipeList(data))
        .catch(makeError);
}

export async function fetchRecipe(recipeId) {
    return fetch(makeUrl(recipeId))
        .then(res => {
            if (!res.ok)
                throw new Error('Failed to fetch recipe', {cause: res.status})
            else 
                return res.json()
        })
        .then(data => transformFirebaseRecipe(data, recipeId))
        .catch(makeError);
}

export async function sendRecipe(recipe, id) {
    return fetch(makeUrl(id ? id : ''), {
            method: id ? 'PATCH' : 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to send recipe', {cause: res.status})
            else return res.json();
        })
        .catch(makeError);
    
}