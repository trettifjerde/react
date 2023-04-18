import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Vocabulary from "./pages/Vocabulary";
import Translate from "./pages/Translate";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'signin', element: <SignIn />},
            { path: 'vocabulary', element: <Vocabulary />},
            { path: 'translate', element: <Translate /> }, 

        ]
    }
])

export default router;