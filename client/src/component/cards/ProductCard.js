import { Card, Tooltip } from 'antd';
import appleMac from '../../images/appleMac.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { showAverage } from '../../utils/rating';
import _ from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, images, description, slug, price } = product;

  const [tooltip, setTooltip] = useState('Click to add');
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCard = () => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem('cart', JSON.stringify(unique));

      setTooltip('Added');

      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });

      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        hoverable
        cover={
          <img
            alt=""
            src={images && images.length ? images[0].url : appleMac}
            style={{ height: '150px', objectFit: 'cover' }}
            className="p-1"
          />
        }
        actions={[
          <Link to={'/product/' + slug}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,

          <Tooltip title={tooltip}>
            <a onClick={handleAddToCard} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 40)}...`} />
      </Card>
    </>
  );
};

export default ProductCard;
