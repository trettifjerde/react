import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";
import Translate from "./components/Translate";
import Write from "./components/Write";
import MainErrorPage from "./pages/MainErrorPage";
import { LoaderArgs } from "./types";
import { berlitz, isValidBerlitzTask } from "./data/translateData";
import ChoosePage from "./pages/ChoosePage";
import { translateTaskLoader, writeTaskLoader } from "./reducers/taskStore";
import Grammar from "./components/Grammar";

const taskTypeRoutes = [
    {name: 'Translate', path: 'translate'},
    {name: 'Write', path: 'write'}
]
const langRoutes = [
    {name: 'Croatian to English', path: 'en'},
    {name: 'English to Croatian', path: 'hrv'}
];

const grammarRoutes = [
    {name: '"biti"', path: 'biti'},
    {name: 'One random verb', path: 'random'},
    {name: 'Random verbs', path: 'prezent'}
]

const berlitzTaskLoader: (l: LoaderArgs) => number | Response = ({params}) => {
    const task = params.task;
    if (isValidBerlitzTask(task)) {
        return +task!;
    }
    return redirect('/')
}

const grammarTaskLoader: (l: LoaderArgs) => string | Response = ({params}) => {
    if (params.task === 'biti' || params.task === 'random' || params.task === 'prezent') 
        return params.task;
    else return redirect('/grammar');
}

const router = createBrowserRouter([{
        path: '/',
        element: <App />,
        errorElement: <MainErrorPage />,
        children: [
            { index: true, element: <ChoosePage animationName="jumpUp" paths={[{name: 'Berlitz', path: 'berlitz'}, {name: 'Random', path: 'random'}]} /> },
            { path: 'signin', element: <SignIn />},
            { 
                path: 'berlitz', 
                children: [
                    {index: true, element: <ChoosePage animationName="appearFromLeft" paths={berlitz.map(({name, path}) => ({name, path}))} />},
                    {path: ':task', loader: berlitzTaskLoader, children: [
                        {index: true, element: <ChoosePage animationName="appearFromLeft" paths={taskTypeRoutes} /> },
                        {path: 'translate', children: [
                            {index: true, element: <ChoosePage animationName="appearFromRight" paths={langRoutes} />},
                            {path: ':targetLang', loader: translateTaskLoader, element: <Translate />},
                        ]},
                        { path: 'write', children: [
                            {index: true, element: <ChoosePage animationName="appearFromRight" paths={langRoutes} />},
                            {path: ':targetLang', loader: writeTaskLoader,  element: <Write />},
                        ]}
                    ]}
                ]
            },
            {
                path: 'random', 
                children: [
                    {index: true, element: <ChoosePage animationName="appearFromLeft" paths={[{name: 'Grammar', path: 'grammar'}]} />},
                    {
                        path: 'grammar', 
                        children: [
                            {index: true, element: <ChoosePage animationName="appearFromRight"  paths={grammarRoutes}/>},
                            {path: ':task', loader: grammarTaskLoader, element: <Grammar />}
                        ]
                    }
                ]    
            }
        ]
}]);

export default router;