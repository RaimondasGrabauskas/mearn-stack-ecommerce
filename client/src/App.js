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
import Password from './pages/user/Password';
import WishList from './pages/user/WishList';
import AdminDash from './pages/admin/AdminDas';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCategoryCreate from './pages/admin/subCategory/SubCategoryCreate';
import SubCategoryUpdate from './pages/admin/subCategory/SubCategoryUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';

import UserRoute from './component/routes/UserRoute';
import AdminRoute from './component/routes/AdminRoute';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './utils/request';
import History from './pages/user/History';

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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<RegisterComplete />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
        <Route
          exact
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/user/password"
          element={
            <UserRoute>
              <Password />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/user/wishlist"
          element={
            <UserRoute>
              <WishList />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDash />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/category"
          element={
            <AdminRoute>
              <CategoryCreate />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/category/:slug"
          element={
            <AdminRoute>
              <CategoryUpdate />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/sub/:slug"
          element={
            <AdminRoute>
              <SubCategoryUpdate />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/sub"
          element={
            <AdminRoute>
              <SubCategoryCreate />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <AdminRoute>
              <ProductCreate />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
