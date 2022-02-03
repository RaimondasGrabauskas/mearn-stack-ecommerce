import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../component/nav/AdminNav';
import { createCategory, getCategories, deleteCategory } from './../../../utils/categoryRequest';
import SingleCategory from './SingleCategory';
import CategoryForm from '../../../component/forms/CategoryForm';
import LocalSearch from '../../../component/forms/LocalSearch';

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    setLoading(true);

    await deleteCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.name}" deleted`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create category</h4>}
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

          <LocalSearch keyword={keyword} handleSearchChange={handleSearchChange} />

          {categories.filter(searched(keyword)).map((c) => (
            <SingleCategory key={c._id} category={c} onHandleRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
