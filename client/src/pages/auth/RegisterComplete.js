import React, { useState, useEffect } from 'react';
import { registrationComplete, auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../utils/request';
import { useNavigate } from 'react-router-dom';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = window.location.href;

    // validation
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await registrationComplete(email, url);
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        // user id token
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user, 'idtoken', idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            const { name, email, role, _id } = res.data;
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name,
                email,
                token: idTokenResult.token,
                role,
                _id,
              },
            });
          })
          .catch((error) => console.log(error.message));

        //redirect
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const completeRegistrationForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type="email" className="form-control" value={email} disabled />
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="btn btn-primary">Register Complete</button>
        </form>
      </>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
