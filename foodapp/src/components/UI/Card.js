import './Card.css';

const Card = (props) => {
    console.log('Card');
    return <div className={`card ${props.className ? props.className : ''}`}>
        {props.children}
    </div>
}
export default Card;