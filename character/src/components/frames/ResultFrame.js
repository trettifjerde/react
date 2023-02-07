import Card from "../UI/Card";
import './ResultFrame.css';

const ResultFrame = (props) => {
    return(
        <Card className="result-frame">
            <p className="catch-phrase">{props.result.phrase}</p>
            <div>
              <div className="img-cont"><img alt={`${props.result.character}`} src={props.result.imagePath} /></div>
              <div className="desc">{props.result.description}</div>
              <div><button className="btn" type="button" onClick={props.startTest}>Начать заново</button></div>
            </div>
        </Card>
    );
}
export default ResultFrame;