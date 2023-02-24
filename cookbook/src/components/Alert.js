import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const error = useSelector(state => state.general.error);
    console.log(error);

    return (
        <Fragment>
            {error && <div className="mt-3 alert alert-danger">
                <span>{error.message}</span>
                </div>
            }
        </Fragment>
    )
}

export default Alert;