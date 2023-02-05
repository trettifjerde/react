import Card from "../UI/Card";

function User(props) {
    return (
        <Card>
            <div>{props.user.username} ({props.user.age})</div>
        </Card>
    )
}
export default User;