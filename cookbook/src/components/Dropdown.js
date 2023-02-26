import { useEffect } from "react";

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
        <div className={`dropdown-menu ${isVisible ? 'show' : ''}`}>
            {props.children}
        </div>
    )
}
export default Dropdown;