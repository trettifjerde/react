import './RecipeDetails.css';
import { useRouteError } from 'react-router-dom';
import EmptyComponent from '../../components/Empty';

const RecipeErrorPage = () => {
    const error = useRouteError();

    let message = 'Something went wrong';
    
    if (error.message){
        message = error.message;
    }

    return (
        <div className="fadeIn empty">
            <EmptyComponent message={message} />
        </div>
    )
}

export default RecipeErrorPage;