import User from "./User";

function Users(props) {
    return (
        <div>
            {props.users.map(user => <User key={user.id} user={user}/>)}
        </div>
    )
}
export default Users;