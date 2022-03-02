import { Card } from 'antd';
import appleMac from '../../images/appleMac.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, images, description, slug } = product;
  return (
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
  );
};

export default ProductCard;
