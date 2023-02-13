import axios from 'axios';

const url = 'http://localhost:8000';
const getCouponsUrl = url + '/coupons';
const couponUrl = url + '/coupon';

export const getCoupons = async () => await axios.get(getCouponsUrl);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(couponUrl + `/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    couponUrl,
    {
      coupon,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
