import { Fragment} from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import { CSSTransition } from 'react-transition-group';

const ConfirmationModal = (props) => {

    const {info, onConfirm, onClose, question} = props;

    return (
        <CSSTransition in={info.visible} timeout={300} classNames="m-trans" mountOnEnter unmountOnExit>
            <Fragment>
                {
                    createPortal(<Modal onClose={onClose}>
                        <div className="m-message">
                            {question}
                            <span className='b'>{' ' + info.name}</span>
                            ?
                        </div>
                        <div className='m-btns'>
                            <button type='button' className='btn btn-success' onClick={() => onConfirm(info.id)}>Confirm</button>
                            <button type="button" className='btn btn-outline-success' onClick={onClose}>Cancel</button>
                        </div>
                    </Modal>,
                    document.getElementById('confirmationModal'))
                }
            </Fragment>
        </CSSTransition>
    )
}

export default ConfirmationModal;