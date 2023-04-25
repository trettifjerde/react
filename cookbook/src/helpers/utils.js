import { addIngredient, updateIngredient } from "./dataService";

export function transformRecipeList(data) {
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

export function transformFirebaseRecipe(recipe, id) {
    return recipe ? makeRecipe(recipe, id) : null;
}

export function makeRecipe(recipeData, id) {
    let recipe = {
        name: '',
        id: id || null,
        description: '',
        imagePath: '',
        steps: [],
        ingredients: []
    }

    if (recipeData) {
        recipe = {
            name: recipeData.name,
            id: id,
            description: recipeData.description,
            imagePath: recipeData.imagePath,
            steps: [...recipeData.steps],
            ingredients: recipeData.ingredients.map(ing => ({
                name: ing.name,
                amount: ing.amount || '',
                unit: ing.unit || ''
            }))
        };
    }

    return recipe;
}

export function castIngredsDbToClient(data) {
    return data ? Object.entries(data).filter(([id, ing]) => ing).map(([id, ing]) => (castIngredDbToClient(id, ing))) : [];
}

export function castIngredDbToClient(id, data) {
    return {
        id: id,
        name: data.name,
        amount: data.amount ? +data.amount : 0,
        unit: data.unit || null
    }
}

export function castIngredFormDataToClient(formData, id) {
    const name = formData.get('name').trim();
    const amount = formData.get('amount').trim();
    const unit = formData.get('unit').trim();
    return {
        id,
        name,
        amount: +amount || 0,
        unit: unit || null,
    };
}

export function castIngredClientToDb(ingred) {
    return {
        name: ingred.name,
        amount: ingred.amount || null,
        unit: ingred.unit || null
    }
}

export function checkIfIngredExists(data, items) {
    const ex = items.find(it => it.name === data.name && it.unit === data.unit);
    if (ex) {
        if (data.amount)
            return [ex.id, {...ex, amount: ex.amount + data.amount}];
        else
            return [ex.id, null];
    }
    else 
        return [null, null];
}

export function prepareIngredientSubmit(formData, id, items) {
    const data = castIngredFormDataToClient(formData);
    let submitFn;
    let message;

    if (id) {
        submitFn = updateIngredient.bind(null, id, castIngredClientToDb(data));
        message = `Item updated: ${data.name}`;
    }
    else {
        const [existId, updatedData] = checkIfIngredExists(data, items);
        if (existId) {
            if (updatedData) {
                submitFn = updateIngredient.bind(null, existId, castIngredClientToDb(updatedData));
                message = `Item updated: ${data.name}`;
            }
            else {
                submitFn = null;
                message = 'Item already on the list: ' + data.name;
            }
        }
        else {
            submitFn = addIngredient.bind(null, castIngredClientToDb(data));
            message = `Item added: ${data.name}`;
        }
    }
    return [submitFn, message];
}

function castRecipeIngredToClient(item) {
    return {
        id: null,
        name: item.name,
        amount: +item.amount || 0,
        unit: item.unit || null,
    };
}

export function castRecipeIngredsToClient(items) {
    return items.map(item => castRecipeIngredToClient(item))
}