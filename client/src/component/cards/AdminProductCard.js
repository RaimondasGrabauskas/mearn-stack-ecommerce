import { Card } from 'antd';

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { title, images, description } = product;

  return (
    <Card
      hoverable
      cover={
        <img
          alt=""
          src={images && images.length ? images[0].url : ''}
          style={{ height: '150px', objectFit: 'cover' }}
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;