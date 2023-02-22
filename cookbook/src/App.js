import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import EmptyComponent from "./components/Empty";
import ErrorPage from "./pages/Error";
import RecipeErrorPage from "./pages/recipes/RecipeError";
import Root from "./pages/Root";
import { Provider } from "react-redux";
import { store } from "./store/store";

import RecipesPage, {loader as recipesLoader} from "./pages/recipes/Recipes";
import RecipeDetailsPage, { recipeLoader } from "./pages/recipes/RecipeDetails";

const router = createBrowserRouter([
    { 
        path: '/', 
        element: <Root />, 
        errorElement: <ErrorPage />,
        children: [
            { index: true, loader: () => redirect('/recipes')},
            {
                path: 'recipes', 
                element: <RecipesPage />, 
                loader: recipesLoader,
                id: 'recipes',
                children: [
                    { index: true, element: <EmptyComponent message='No recipe selected' />},
                    /*{ path: 'new', element: <RecipeFormPage /> },*/
                    { 
                        path: ':id', 
                        element: <RecipeDetailsPage />, 
                        errorElement: <RecipeErrorPage />,
                        loader: recipeLoader 
                    },
                    /*{ path: ':id/edit', element: <RecipeFormPage />, loader: recipeLoader },*/
                ]
            },
            {path: 'list'},
            {path: 'login'},
        ]}
]);

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export default App;

