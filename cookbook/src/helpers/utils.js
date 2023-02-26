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

export function transformFirebaseIngredientsToList(data) {
    return data ? Object.entries(data).map(([id, ing]) => (transformFirebaseIngredientToClientObject(id, ing))) : [];
}

export function transformFirebaseIngredientToClientObject(id, data) {
    return {
        id: id,
        name: data.name,
        amount: data.amount ? +data.amount : 0,
        unit: data.unit || ''
    }
}