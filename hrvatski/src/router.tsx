import { Params, createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Translate from "./components/Translate";
import ChooseLanguagePage from "./pages/ChooseLanguagePage";
import Write from "./components/Write";
import MainErrorPage from "./pages/MainErrorPage";
import { Language } from "./types";

const targetLanguageLoader: (l: LoaderArgs) => Language | Response = ({params}) => {
    if (params.targetLang === 'hrv' || params.targetLang === 'en')
        return params.targetLang as Language;
    else 
        return redirect('/translate');
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <MainErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: 'signin', element: <SignIn />},
            { path: 'translate', element: <ChooseLanguagePage /> },
            { path: 'translate/:targetLang', element: <Translate />, loader: targetLanguageLoader},
            { path: 'write', element: <ChooseLanguagePage />},
            { path: 'write/:targetLang', element: <Write />, loader: targetLanguageLoader},
        ]},
])

type LoaderArgs = {request: Request, params: Params};

export default router;