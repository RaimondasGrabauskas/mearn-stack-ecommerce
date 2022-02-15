import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../component/forms/CategoryForm';
import AdminNav from '../../../component/nav/AdminNav';
import { getCategories } from '../../../utils/categoryRequest';
import { getSingleSubCategory, updateSubCategory } from './../../../utils/subCategoryRequest';

const SubCategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  const navigate = useNavigate();
  let { slug } = useParams();

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const loadSubCategory = () =>
    getSingleSubCategory(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateSubCategory(slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/sub');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update Sub Category</h4>}
          <div className="form-group">
            <label>Category</label>
            <select value={parent} className="form-control" name="category" onChange={(e) => setParent(e.target.value)}>
              <option>--</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
