import { Link, useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const params = useParams();
    return (
        <main>
            <h3>Product {params.productId}</h3>
            <Link to=".." relative="path">Back</Link>
        </main>
    )
}
export default ProductDetailPage;