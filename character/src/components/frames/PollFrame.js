import Card from '../UI/Card';
import './PollFrame.css';

const PollFrame = (props) => {
    return(
        <Card className="poll-frame">
            <div>
                <div className="q-number">{props.qNum > props.qLength ? 'Финальный вопрос' : `Вопрос ${props.qNum}/${props.qLength}`}</div>
                <div className="q-text">{props.question.question}</div>
                { props.question.options.map(option => (
                    <button id={`${props.qNum}-${option.id}`} key={`${props.qNum}-${option.id}`} type="button" className="btn option" 
                        onClick={() => props.selectOption(option.id)}>{option.text}</button>
                ))}
            </div>
            <button className={`btn btn-secondary ${(props.qNum === 1  || props.qNum > props.qLength) ? 'invisible' : ''}`} type="button" onClick={props.unselect}>Назад</button>
        </Card>
    );
}
export default PollFrame;