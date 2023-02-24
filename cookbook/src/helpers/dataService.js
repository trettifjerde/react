import { transformFirebaseIngredientsToList, transformFirebaseRecipe, transformRecipeList } from './utils';

export const MAX_FETCH_BATCH = 3;

const makeUrl = (path) => {
    return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/recipes${path ? '/' + path : ''}.json`;
}

const makeError = (error) => {
    console.log('Error caught inside make Error', error);
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
    console.log('fetching recipe');
    return fetch(makeUrl(recipeId))
        .then(res => {
            if (!res.ok) {
                console.log('Failed to fetch recipe');
                throw new Error('Failed to fetch recipe', {cause: res.status})
            }
            else {
                return res.json()
            }
        })
        .then(data => {
            if (data)
                return transformFirebaseRecipe(data, recipeId)
            else {
                console.log('no data, recipe does not exist');
                    throw new Error('Recipe does not exist', {cause: 404});
            }
        })
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

export async function deleteRecipe(id) {
    return fetch(makeUrl(id), {method: 'DELETE'})
        .then(res => ({}))
        .catch(makeError)
}

export async function fetchIngredients() {
    return fetch(`https://academind34-default-rtdb.europe-west1.firebasedatabase.app/list.json`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch ingredients', {cause: res.status})
            else return res.json()
        })
        .then(data => transformFirebaseIngredientsToList(data))
        .catch(makeError)
}