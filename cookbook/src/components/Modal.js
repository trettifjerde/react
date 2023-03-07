import './Modal.css';

const Modal = (props) => {
    return (
        <div className="m">
            <div className='m-shadow' onClick={props.onClose}></div>
            <div className='m-content'>
                {props.children}
            </div>
        </div>
    )
}
export default Modal;