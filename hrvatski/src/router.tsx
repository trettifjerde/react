import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";
import MainErrorPage from "./pages/MainErrorPage";
import ChoosePage from "./pages/ChoosePage";
import { berlitzLoader, berlitzLevelLoader, languageLoader, homePageLoader, writeTaskLoader, wordBlocksTaskLoader, grammarTaskLoader, negationsTaskLoader } from "./router-loaders";
import Write from "./components/Write";
import Grammar from "./components/Grammar";
import WordBlocks from "./components/WordBlocks";

const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    errorElement: <MainErrorPage />,
    children: [
        { index: true, element: <ChoosePage animationName="jumpUp" />, loader: homePageLoader },
        { path: 'signin', element: <SignIn />},
        { 
            path: 'berlitz', 
            children: [
                {index: true, element: <ChoosePage animationName="appearFromLeft" />, loader: berlitzLoader},
                {path: ':level', children: [
                    {index: true, element: <ChoosePage animationName="appearFromRight" />, loader: berlitzLevelLoader},
                    {path: 'write', children: [
                        {index: true, element: <ChoosePage animationName="jumpUp" />, loader: languageLoader},
                        {path: ':lang', element: <Write />, loader: writeTaskLoader}
                    ]},
                    {path: 'blocks', children: [
                        {index: true, element: <ChoosePage animationName="jumpUp" />, loader: languageLoader},
                        {path: ':lang', element: <WordBlocks />, loader: wordBlocksTaskLoader}
                    ]},
                    {path: 'negations', element: <Write />, loader: negationsTaskLoader}

                ]}
            ]
        },
        {
            path: 'random',
            children: [
                {index: true, element: <ChoosePage animationName="appearFromLeft" />, loader: () => ({paths: [{name: 'Grammar', path: 'grammar'}], back: true})},
                {path: 'grammar', children: [
                    {index: true, element: <ChoosePage animationName="appearFromRight"/>, loader: () => ({
                        paths: [
                            {name: '"biti"', path: 'biti'},
                            {name: 'One random verb', path: 'random'},
                            {name: 'Verbs in prezent', path: 'prezent'}
                        ],
                        back: true
                    })},
                    {path: ':task', element: <Grammar />, loader: grammarTaskLoader}
                ]}
            ]
        }
    ]
}]);

export default router;