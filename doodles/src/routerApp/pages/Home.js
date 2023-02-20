import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/products');
    };

    return (
        <main>
            <h3>Home page!</h3>
            <button type="button" onClick={navigateHandler}>Navigate</button>
        </main>
    )
}
export default HomePage;