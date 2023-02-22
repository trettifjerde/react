import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmptyComponent from "./components/Empty";
import ErrorPage from "./pages/Error";
import Root from "./pages/Root";

import RecipesPage, {loader as recipesLoader} from "./pages/recipes/Recipes";

const router = createBrowserRouter([
    { 
        path: '/', 
        element: <Root />, 
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'recipes', 
                element: <RecipesPage />, 
                errorElement: <RecipeError />,
                loader: recipesLoader,
                children: [
                    { index: true, element: <EmptyComponent message='No recipe selected' />},
                    { path: 'new', element: <RecipeFormPage /> },
                    { path: ':idd', element: <RecipeDetailsPage />, loader: recipeLoader },
                    { path: ':id/edit', element: <RecipeFormPage />, loader: recipeLoader },
                ]},
            {path: 'list'},
            {path: 'login'},
        ]}
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default App;

