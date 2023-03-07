import { useEffect } from "react";
import { CSSTransition } from 'react-transition-group';

const Dropdown = (props) => {
    const {isVisible, onBgClick, btn} = props;

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('click', (event) => {
                if (event.target !== btn.current)
                    onBgClick()
            }, {once: true, capture: true})
        }

    }, [isVisible, onBgClick, btn]);

    return (
        <CSSTransition in={isVisible} classNames="dd-trans" timeout={150}>
            <div className="dropdown-menu">
                <div className="dropdown-menu-inner">{props.children}</div>
            </div>
        </CSSTransition>
    )
}
export default Dropdown;