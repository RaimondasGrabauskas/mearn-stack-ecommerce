import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../component/nav/AdminNav';
import { getProduct } from './../../../utils/productRequest';
import { getCategories, getCategorySubs } from './../../../utils/categoryRequest';
import { useNavigate, useParams } from 'react-router-dom';
import ProductUpdateForm from './../../../component/forms/ProductUpdateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  categories: [],
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product update</h4>
          <hr />
          <ProductUpdateForm
            values={values}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
