import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNav from '../../../component/nav/AdminNav';
import { getSingleCategory, updateCategory } from './../../../utils/categoryRequest';

const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  let { slug } = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => getSingleCategory(slug).then((c) => setName(c.data.name));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/category');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button className="btn btn-outline-primary mt-3">Save</button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update category</h4>}
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
