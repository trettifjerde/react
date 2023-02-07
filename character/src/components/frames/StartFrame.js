import Card from "../UI/Card";
import './StartFrame.css';

const StartFrame = (props) => {
    return(
        <Card className="start-frame">
            <div>Кто ты из субличностей Фантомки?</div>
            <div>
                <button className="btn" type="button" onClick={props.startTest}>Начать тест</button>
            </div>
        </Card>
    );
}
export default StartFrame;