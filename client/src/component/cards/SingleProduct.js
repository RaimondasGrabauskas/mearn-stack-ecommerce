import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import { Carousel } from 'react-responsive-carousel';
import StarRatings from 'react-star-ratings';
import appleMac from '../../images/appleMac.png';
import ProductListItems from './ProductListItems';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../utils/rating';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;

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
    }
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img alt="" src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img alt="" src={appleMac} className="mb-3 card-image" />}></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on +xxx xxx xxx xx to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCard}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
              </a>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
