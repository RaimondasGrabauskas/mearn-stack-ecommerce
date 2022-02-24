import { Card } from 'antd';
import appleMac from '../../images/appleMac.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
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
        <EditOutlined className="text-warning" />,
        <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger" />,
      ]}
    >
      <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
    </Card>
  );
};

export default AdminProductCard;
