import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

const RootLayout = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
        </Fragment>
    )

}
export default RootLayout;