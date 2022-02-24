import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../../component/forms/ProductCreateForm';
import AdminNav from '../../../component/nav/AdminNav';
import { createProduct } from './../../../utils/productRequest';
import { getCategories, getCategorySubs } from './../../../utils/categoryRequest';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../../component/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product update</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
