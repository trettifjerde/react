import { Fragment } from 'react';
import Card from './Card';
import './Modal.css';

const Modal = (props) => {
    console.log('Modal');
    return (
        <Fragment>
        { props.isVisible && <div className='modal'>
            <div className='modal-shadow' onClick={props.hide}></div>
                <div className='modal-content'>
                    <Card className={props.className ? props.className : ''}>
                        {props.children}
                    </Card>
                </div>    
            </div>
        }
        </Fragment>
    )
}
export default Modal;