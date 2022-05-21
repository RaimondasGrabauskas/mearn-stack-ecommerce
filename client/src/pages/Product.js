import { getProduct, productStar } from '../utils/productRequest';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './../component/cards/ProductCard';
import SingleProduct from './../component/cards/SingleProduct';
import { getRelatedProduct } from './../utils/productRequest';
import { useSelector } from 'react-redux';

const Product = () => {
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find((element) => element.postedBy.toString() === user._id.toString());

      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [user]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelatedProduct(res.data._id).then((res) => {
        setRelatedProduct(res.data);
      });
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      loadSingleProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} onStarClick={onStarClick} star={star} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
          {}
        </div>
      </div>
      <div className="row pb-5">
        {relatedProduct.length ? (
          relatedProduct.map((r) => (
            <div className="col-md-4" key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No products found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
