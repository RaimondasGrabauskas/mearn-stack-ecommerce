import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../utils/stripe';
import { createOder, emptyUserCart } from '../utils/user';

import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import appleMac from '../images/appleMac.png';

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      const { clientSecret, cartTotal, totalAfterDiscount, payable } = res.data;
      console.log('create payment intent', res.data);
      setClientSecret(clientSecret);
      // additional response recaived on succesful payment
      setCartTotal(cartTotal);
      setTotalAfterDiscount(totalAfterDiscount);
      setPayable(payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
        },
      },
    });

    if (payload.error) {
      setError`Payment failed ${payload.error.message}`;
      setProcessing(false);
    } else {
      createOder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== 'undefined') localStorage.removeItem('cart');
          // empty cart from redux
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);
        }
      });

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    const err = e.error;
    // listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(err ? err.message : '');
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount.toFixed(2)}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={<img src={appleMac} alt="" style={{ height: '200px', objectFit: 'cover', marginBottom: '-50px' }} />}
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: ${cartTotal.toFixed(2)}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable: ${payable.toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
        <button className="stripe-button" disabled={processing || disabled || succeeded}>
          <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : 'Pay'}</span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? 'result-message' : 'result-message hiden'}>
          Payment Successful. <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
