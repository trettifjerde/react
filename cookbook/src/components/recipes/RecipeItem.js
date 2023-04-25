import { NavLink } from 'react-router-dom';
import { memo } from 'react';

const RecipeItem = (props) => {
    const { recipe } = props;

    return (
        <NavLink className="card p-2" to={recipe.id}>
            <div className="card-wrapper">
                <div className="card-body">
                    <h4 className="card-title">{ recipe.name }</h4>
                    <div className="card-text">{ recipe.description.length > 110 ? recipe.description.slice(0, 100) + '...' : recipe.description }</div>
                </div>
                <div className="c">
                    <picture>
                        <source media="(max-width: 430px)" srcSet={recipe.imagePath} width="161" height="215" />
                        <source media="(max-width: 576px)" srcSet={recipe.imagePath} width="123" height="164" />
                        <source media="(max-width: 768px)" srcSet={recipe.imagePath} width="161" height="215" />
                        <source media="(max-width: 990px)" srcSet={recipe.imagePath} width="250" height="334" />
                        <source media="(max-width: 1200px)" srcSet={recipe.imagePath} width="113" height="150" />
                        <source media="(max-width: 1399px)" srcSet={recipe.imagePath} width="139" height="186" />
                        <source media="(min-width: 1400px)" srcSet={recipe.imagePath} width="162" height="216" />
                        <img src={recipe.imagePath} alt={recipe.name}/> 
                    </picture>
                </div>
            </div>
        </NavLink>
    )
}

export default memo(RecipeItem);