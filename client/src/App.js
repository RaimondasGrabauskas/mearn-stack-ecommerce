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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: token,
          },
        });
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

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
