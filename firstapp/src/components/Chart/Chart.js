import ChartBar from './ChartBar';
import './Chart.css';

function Chart(props) {
    const maxValue = Math.max(...props.bars.map(b => b.value));
    return (
        <div className="chart">
            {props.bars.map((b, i) => <ChartBar key={i} maxValue={maxValue} value={b.value} label={b.label}/>)}
        </div>
    )
}
export default Chart;