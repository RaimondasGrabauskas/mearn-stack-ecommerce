import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from '../../../utils/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from './../../../component/nav/AdminNav';

const CreateCouponPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
