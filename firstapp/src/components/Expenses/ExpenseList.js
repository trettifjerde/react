import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = (props) => {

    if (props.items.length === 0) {
        return (<h2 className='expenses-list__fallback'>No expenses found</h2>)
    }
    else {
        return (
            <ul className='expenses-list'>
                { props.items.map(p => <ExpenseItem item={p} key={p.id}/>) }
            </ul>
        )
    }
}

export default ExpenseList;