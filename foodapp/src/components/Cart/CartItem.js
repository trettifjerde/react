const CartItem = (props) => {
    return (
        <li>
            <div>
                <span>{props.name}</span>
                <span>{`Amount: ${props.amount}`}</span>
                <span>{`Total: $ ${(props.price * props.amount).toFixed(2)}`}</span>
            </div>
        </li>
    )
}
export default CartItem;