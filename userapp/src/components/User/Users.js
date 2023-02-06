import Card from '../UI/Card';
import './Users.css';

function Users(props) {
    let content = <p className='c'>No users yet</p>;
    if (props.users.length > 0) {
        content = (<ul className="users">
            {props.users.map(user => <li key={user.id}>{user.username} ({user.age})</li>)}
            </ul>
        );
    }
    return (
        <Card>
            <h3 className='users-title'>Registered users</h3>
            {content}
        </Card>
    )

}
export default Users;