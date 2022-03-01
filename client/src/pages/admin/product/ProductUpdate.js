import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../component/nav/AdminNav';
import { getProduct, updateProduct } from './../../../utils/productRequest';
import { getCategories, getCategorySubs } from './../../../utils/categoryRequest';
import { useNavigate, useParams } from 'react-router-dom';
import ProductUpdateForm from './../../../component/forms/ProductUpdateForm';
import FileUpload from './../../../component/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS', 'MSI'],
  color: '',
  brand: '',
};

const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => arr.push(s._id));

      setArrayOfSubIds((prev) => arr);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Product is updated`);
        navigate('/admin/products');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubIds([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Product create</h4>}
          <hr />

          <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
          </div>

          <ProductUpdateForm
            values={values}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            categories={categories}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
