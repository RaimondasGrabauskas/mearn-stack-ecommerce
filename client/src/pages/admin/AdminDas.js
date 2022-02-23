import { useEffect, useState } from 'react';
import AdminProductCard from '../../component/cards/AdminProductCard';
import AdminNav from '../../component/nav/AdminNav';
import { getProductsByCount } from '../../utils/productRequest';

const AdminDash = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
              <div key={p._id} className="col-md-4 mb-4">
                <AdminProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
