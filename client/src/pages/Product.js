import { getProduct } from '../utils/productRequest';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleProduct from './../component/cards/SingleProduct';

const Product = () => {
  const [product, setProduct] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, []);

  const loadSingleProduct = () => getProduct(slug).then((res) => setProduct(res.data));

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div>Related products</div>
      </div>
    </div>
  );
};

export default Product;
