import { NavLink } from 'react-router-dom';
import { memo } from 'react';

const RecipeItem = (props) => {
    const { recipe } = props;
    console.log('Recipe Item', recipe.name);

    return (
        <NavLink className="card p-2" to={recipe.id}>
            <div className="row g-1 flex-nowrap align-items-center">
                <div className="card-body col-8">
                    <h4 className="card-title">{ recipe.name }</h4>
                    <div className="card-text">{ recipe.description.length > 110 ? recipe.description.slice(0, 100) + '...' : recipe.description }</div>
                </div>
                <div className="col-4 d-flex justify-content-end">
                    <img src={recipe.imagePath} className="img-fluid img-mini" />
                </div>
            </div>
        </NavLink>
    )
}

export default memo(RecipeItem);