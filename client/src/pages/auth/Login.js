import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { auth, googleProvider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrUpdateUser } from '../../utils/request';

const Login = () => {
  const [email, setEmail] = useState('rggrabauskas@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/history');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
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
          roleBasedRedirect(res);
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Yourpassword"
            />
          </div>
          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
          >
            Login
          </Button>
        </form>
      </>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h4>Login</h4> : <h4 className="text-danger">Loading...</h4>}
          {loginForm()}
          <Button
            onClick={handleGoogleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login
          </Button>
          <Link to="/forgot/password" className="ml-auto text-danger">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
