import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { Provider } from "react-redux";
import EmptyComponent from "./components/Empty";
import ErrorPage from "./pages/Error";
import Root from "./pages/Root";
import { store } from "./store/store";

import RecipesPage, {loader as recipesLoader} from "./pages/recipes/Recipes";
import RecipeDetailsPage, { recipeLoader } from "./pages/recipes/RecipeDetails";
import RecipeFormPage, {loader as recipeFormLoader } from "./pages/recipes/RecipeForm";
import AuthPage, {loginAction, signUpAction} from "./pages/Auth";
import Spinner from "./components/Spinner";

const ShoppingListPage = lazy(() => import('./pages/Shopping'));

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
                shouldRevalidate: () => false,
                id: 'recipes',
                children: [
                    { 
                        index: true, 
                        element: <EmptyComponent message='No recipe selected' />
                    },
                    { 
                        path: 'new', 
                        element: <RecipeFormPage />, 
                        loader: recipeFormLoader
                    },
                    { 
                        path: ':id',
                        children: [
                            {
                                index: true, 
                                element: <RecipeDetailsPage />, 
                                loader: recipeLoader
                            },
                            {   
                                path: 'edit', 
                                element: <RecipeFormPage />,
                                loader: recipeFormLoader                   
                            },
                        ]
                    },

                ]
            },
            {
                path: 'list',
                element: <Suspense fallback={<Spinner/>}><ShoppingListPage /></Suspense>,
                loader: (args) => import ('./pages/Shopping').then(module => module.loader(args)),
                action: (args) => import('./pages/Shopping').then(module => module.action(args))
            },
            {
                path: 'login',
                element: <AuthPage mode="login" />,
                action: loginAction
            },
            {
                path: 'signup',
                element: <AuthPage mode="signup" />,
                action: signUpAction
            }
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

