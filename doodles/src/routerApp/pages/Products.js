import { Link } from "react-router-dom";
const products = ['meow', 'mev', 'miuk', 'myau'];

const ProductsPage = () => {
    return (
        <main>
            <h3>Products</h3>
            <ul>
                { products.map((p, i) => <li key={i}><Link to={`${i}`}>{p}</Link></li>)}
            </ul>

            
        </main>
    )
}
export default ProductsPage;