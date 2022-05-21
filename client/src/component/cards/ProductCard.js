import { Card } from 'antd';
import appleMac from '../../images/appleMac.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { showAverage } from '../../utils/rating';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, images, description, slug } = product;
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
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </>,
        ]}
      >
        <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
      </Card>
    </>
  );
};

export default ProductCard;
