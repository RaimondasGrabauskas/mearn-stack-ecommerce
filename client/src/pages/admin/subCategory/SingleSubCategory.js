import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const SingleSubCategory = ({ subCategory, onHandleRemove }) => {
  return (
    <div className="alert alert-secondary">
      {subCategory.name}{' '}
      <span onClick={() => onHandleRemove(subCategory.slug)} className="btn btn-sm float-right">
        <DeleteOutlined className="text-danger" />
      </span>{' '}
      <Link to={`/admin/subCategory/${subCategory.slug}`}>
        <span className="btn btn-sm float-right">
          <EditOutlined className="text-warning" />
        </span>
      </Link>
    </div>
  );
};

export default SingleSubCategory;
