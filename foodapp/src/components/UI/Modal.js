import Card from './Card';
import './Modal.css';

const Modal = (props) => {
    return (
        <div className={`modal ${props.isVisible ? '' : 'hidden'}`}>
            <div className='modal-shadow' onClick={props.hide}></div>
            <Card className="modal-content">
                {props.children}
            </Card>
        </div>
    )
}
export default Modal;