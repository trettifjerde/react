import { Fragment, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';

const ConfirmationModal = (props) => {
    const onClose = props.onClose;
    const {onConfirm, question, bold} = props.confirmInfo;

    const handleConfirm = useCallback(() => {
        onClose();
        onConfirm();
    }, [onClose, onConfirm]);

    return (
        <Fragment>
            { createPortal(<Modal onClose={onClose}>
                <div className="m-message">
                    {question + ' '}
                    <span className='b'>{bold}</span>
                    ?
                </div>
                <div className='m-btns'>
                    <button type='button' className='btn btn-success' onClick={handleConfirm}>Confirm</button>
                    <button type="button" className='btn btn-outline-success' onClick={onClose}>Cancel</button>
                </div>
            </Modal>, document.getElementById('confirmationModal') )}
        </Fragment>
    )
}

export default ConfirmationModal;