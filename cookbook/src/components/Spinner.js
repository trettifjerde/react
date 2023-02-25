import './Spinner.css';

const Spinner = (props) => {
    return (
        <div className={`spinner-cont ${props.className ? props.className : ''}`}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
export default Spinner;