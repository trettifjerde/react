import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import styles from './ExpenseItem.module.css';

function ExpenseItem(props) {

    return (
        <li id={props.item.id}>
            <Card className={styles.item}>
                <ExpenseDate date={props.item.date} />
                <div className={styles.description}>
                    <h2>{props.item.title}</h2>
                    <div className={styles.price}>$ {props.item.amount}</div>
                </div>
            </Card>
        </li>
    )
}

export default ExpenseItem;