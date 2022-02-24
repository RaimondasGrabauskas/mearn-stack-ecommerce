import { useEffect, useState } from 'react';
import AdminProductCard from '../../../component/cards/AdminProductCard';
import AdminNav from '../../../component/nav/AdminNav';
import { getProductsByCount, removeProduct } from '../../../utils/productRequest';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(5)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
    const answer = window.confirm('Are you sure want to delete');
    if (answer) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Lodaing...</h4> : <h4>All products</h4>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mb-4 pb-3">
                <AdminProductCard product={p} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
