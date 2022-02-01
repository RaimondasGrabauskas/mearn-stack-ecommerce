import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const SingleCategory = ({ category, onHandleRemove }) => {
  return (
    <div className="alert alert-secondary">
      {category.name}{' '}
      <span onClick={() => onHandleRemove(category.slug)} className="btn btn-sm float-right">
        <DeleteOutlined className="text-danger" />
      </span>{' '}
      <Link to={`/admin/category/${category.slug}`}>
        <span className="btn btn-sm float-right">
          <EditOutlined className="text-warning" />
        </span>
      </Link>
    </div>
  );
};

export default SingleCategory;
