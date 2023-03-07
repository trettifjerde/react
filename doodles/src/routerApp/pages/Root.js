import { Fragment, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import { CSSTransition } from 'react-transition-group';

const RootLayout = () => {
    const [shown, setShown] = useState(false);
    return (
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>

            <CSSTransition in={shown} timeout={300} classNames='meow' mountOnEnter>
                <div>meow</div>
            </CSSTransition>

            <button onClick={() => setShown(true)}>Meow</button>
        </Fragment>
    )

}
export default RootLayout;