import { getProduct, productStar } from '../utils/productRequest';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleProduct from './../component/cards/SingleProduct';

import { useSelector } from 'react-redux';

const Product = () => {
  const [product, setProduct] = useState([]);
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

  const loadSingleProduct = () => getProduct(slug).then((res) => setProduct(res.data));

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
        </div>
      </div>
    </div>
  );
};

export default Product;
