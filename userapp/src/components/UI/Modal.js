import './Modal.css';
import Card from './Card';

function Modal(props) {

    return (
        <div className={`modal ${props.isVisible ? '' : 'hidden'}`}>
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
export default Modal;