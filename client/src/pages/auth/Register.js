import React, { useEffect, useState } from 'react';
import { registration } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await registration(email, config);

    toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);

    window.localStorage.setItem('emailForRegistration', email);

    setEmail('');
  };

  const registerForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
          <br />
          <button className="btn btn-primary">Register</button>
        </form>
      </>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
