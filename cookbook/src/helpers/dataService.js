export const MAX_FETCH_BATCH = 3;

const makeUrl = (path) => {
    return `https://academind34-default-rtdb.europe-west1.firebasedatabase.app/recipes${path ? '/' + path : ''}.json`;
}

const makeError = (error) => {
    console.log(error);
    return {error: {message: error.message, status: error.cause}};
}

function transformRecipeList(data) {
    return data ? Object.entries(data).reduce(
        (acc, [id, recipe]) => {
            acc.push({
                name: recipe.name,
                id: id,
                description: recipe.description,
                imagePath: recipe.imagePath
            })
            return acc;
        }, []) : [];
}

function transformFirebaseRecipe(recipe, id) {
    return recipe ? {
        name: recipe.name,
        id: id,
        description: recipe.description,
        imagePath: recipe.imagePath,
        steps: [...recipe.steps],
        ingredients: recipe.ingredients.map(ing => ({
            name: ing.name,
            amount: ing.amount ? ing.amount : '',
            unit: ing.unit ? ing.unit : ''
        }))
    } : null;
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