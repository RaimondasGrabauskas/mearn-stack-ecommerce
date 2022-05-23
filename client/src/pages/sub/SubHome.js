import { getSingleSubCategory } from '../../utils/subCategoryRequest';
import ProductCard from './../../component/cards/ProductCard';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SubHome = () => {
  const { slug } = useParams();
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSingleSubCategory(slug).then((s) => {
      setSub(s.data.subCategory);
      setProducts(s.data.products);
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
              {products.length} Products in "{sub.name}" Sub
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

export default SubHome;
