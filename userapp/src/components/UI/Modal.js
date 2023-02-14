import './Modal.css';
import Card from './Card';
import ReactDOM from 'react-dom';
import { Fragment } from 'react';

function Modal(props) {
    return (
        <div className={`modal ${props.isVisible ? '' : 'hidden'}`}>
            <div className='modal-shadow' onClick={props.hide}></div>
            <Card className="modal-content">
                <div className="modal-content__title">{props.title}</div>
                <div className="modal-content__content">{props.children}</div>
                <div className='modal-content__button'>
                    <button type="button" onClick={props.hide}>OK</button>
                </div>
            </Card>
        </div>
    )
}

function ErrorModal(props) {
    return (
        <Fragment>
            {
                ReactDOM.createPortal(
                    <Modal title={props.title} isVisible={props.isVisible} hide={props.hide}>{props.children}</Modal>, 
                    document.getElementById('modal-root')
                )
            }
        </Fragment>
    )
}
export default ErrorModal;