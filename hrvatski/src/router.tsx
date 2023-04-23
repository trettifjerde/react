import { Params, createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Translate from "./components/Translate";
import Write from "./components/Write";
import MainErrorPage from "./pages/MainErrorPage";
import { Language } from "./types";
import Grammar from "./components/Grammar";
import { sentences, taskPaths } from "./data/translateData";
import ChoosePage from "./pages/ChoosePage";
import { grammarTaskPaths } from "./data/grammarData";

const targetLanguageLoader: (l: LoaderArgs) => {targetLang: Language, path: string} | Response = ({params}) => {
    const {targetLang, path} = params;
    if (path && targetLang && (targetLang === 'hrv' || targetLang === 'en') &&taskPaths.includes(path)) {
        return {targetLang, path};
    }
    else 
        return redirect('/');
}

const translationTaskLoader: (l: LoaderArgs) => string | Response = ({params}) => {
    const path = params.path;
    if (path && taskPaths.includes(path)) {
        return path;
    }
    else 
        return redirect('/')
}

const grammarTaskLoader: (l: LoaderArgs) => string | Response = ({params}) => {
    if (params.task === 'biti' || params.task === 'random' || params.task === 'prezent') 
        return params.task;
    else return redirect('/grammar');
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <MainErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: 'signin', element: <SignIn />},
            { path: 'translate', children: [
                {index: true, element: <ChoosePage animationName="appearFromLeft" paths={sentences} />},
                {path: ':path', loader: translationTaskLoader, children: [
                    { index: true, element: <ChoosePage animationName="appearFromRight" 
                    paths={[
                        {path: 'hrv', name: 'English to Croatian'},
                        {path: 'en', name: 'Croatian to English'}
                    ]} />},
                    {path: ':targetLang', id: 'targetLang', element: <Translate />, loader: targetLanguageLoader}
                ]}
            ] },
            { path: 'write', children: [
                {index: true, element: <ChoosePage animationName="appearFromLeft" paths={sentences} />},
                {path: ':path', loader: translationTaskLoader, children: [
                    { index: true, element: <ChoosePage animationName="appearFromRight" 
                        paths={[
                            {path: 'hrv', name: 'English to Croatian'},
                            {path: 'en', name: 'Croatian to English'}
                        ]} />},
                    { path: ':targetLang', element: <Write />, loader: targetLanguageLoader}
                ]}
            ]},
            {path: 'grammar', children: [
                {index: true, element: < ChoosePage paths={grammarTaskPaths} animationName="appearFromRight" />},
                {path: ':task', element: <Grammar />, loader: grammarTaskLoader}
            ]}
        ]},
])

type LoaderArgs = {request: Request, params: Params};

export default router;