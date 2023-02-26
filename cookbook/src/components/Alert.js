import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const message = useSelector(state => state.general.message);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 5000);
            return () => clearTimeout(timer);
        }
        else setIsVisible(false);
    }, [message]);

    return (
        <Fragment>
            { isVisible && message && <div className={`fadeIn mt-3 alert ${ message.isError ? 'alert-danger' : 'alert-success'}`}>
                <span>{message.text}</span>
            </div>
            }
        </Fragment>
    )
}

export default Alert;