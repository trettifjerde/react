import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const Root = () => {
    //const navigation = useNavigation();

    return (
        <Fragment>
            <MainNavigation />
            <main>
                
                <Outlet />
            </main>
        </Fragment>
    )
}
export default Root;
// {navigation.state === 'loading' && <p>Loading...</p>}