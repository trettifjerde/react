import './Alert.css';

const Alert = (props) => {
    return (
        <div class="mt-3 alert alert-danger">
            <span>{props.message}</span>
        </div>
    )
}

export default Alert;