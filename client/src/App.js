import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './component/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import ForgotPassword from './pages/auth/ForgotPassword';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './utils/request';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        currentUser(token)
          .then((res) => {
            const { name, email, role, _id } = res.data;
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name,
                email,
                token: token,
                role,
                _id,
              },
            });
          })
          .catch((error) => console.log(error.message));
      }
    });
    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/register/complete" exact element={<RegisterComplete />} />
        <Route path="/forgot/password" exact element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
