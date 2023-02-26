import { useAsyncError } from 'react-router-dom';
import EmptyComponent from '../../components/Empty';

const RecipeErrorPage = () => {
    const error = useAsyncError();

    return (
        <div className="fadeIn empty">
            <EmptyComponent message={error} />
        </div>
    )
}

export default RecipeErrorPage;