import { Fragment } from 'react';
import Card from './Card';
import './Modal.css';

const Modal = (props) => {
    console.log('Modal');
    return (
        <Fragment>
        { props.isVisible && <div className='modal'>
                <div className='modal-shadow' onClick={props.hide}></div>
                <Card className="modal-content">
                    {props.children}
                </Card>
            </div>
        }
        </Fragment>
    )
}
export default Modal;