import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../component/nav/AdminNav';
import { getCategories } from './../../../utils/categoryRequest';
import { createSubCategory, getSubCategories, deleteSubCategory } from './../../../utils/subCategoryRequest';
import SingleSubCategory from './SingleSubCategory';
import CategoryForm from '../../../component/forms/CategoryForm';
import LocalSearch from '../../../component/forms/LocalSearch';

const SubCategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState('');

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const loadSubCategories = () => getSubCategories().then((s) => setSubCategories(s.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createSubCategory({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadSubCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    setLoading(true);

    await deleteSubCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.name}" deleted`);
        loadSubCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create sub category</h4>}

          <div className="form-group">
            <label>Category</label>
            <select className="form-control" name="category" onChange={(e) => setCategory(e.target.value)}>
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

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subCategories.filter(searched(keyword)).map((s) => (
            <SingleSubCategory key={s._id} subCategory={s} onHandleRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
