import { getSingleCategory } from '../../utils/categoryRequest';
import ProductCard from './../../component/cards/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CategoryList from './../../component/category/CategoryList';

const CategoryHome = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSingleCategory(slug).then((c) => {
      setCategory(c.data.category);
      setProducts(c.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-4 display-4 jumbotron">Loading...</h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-4 display-4 jumbotron">
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
