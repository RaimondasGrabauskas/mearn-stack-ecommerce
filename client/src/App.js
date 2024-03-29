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
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import Product from './pages/Product';
import History from './pages/user/History';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import SideDrawer from './component/drawer/SideDrawer';
import Checkout from './pages/Checkout';
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';
import Payment from './pages/Payment';

import UserRoute from './component/routes/UserRoute';
import AdminRoute from './component/routes/AdminRoute';

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
      <SideDrawer />
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
        <Route
          exact
          path="/admin/products"
          element={
            <AdminRoute>
              <AllProducts />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/product/:slug"
          element={
            <AdminRoute>
              <ProductUpdate />
            </AdminRoute>
          }
        />
        <Route exact path="/product/:slug" element={<Product />} />
        <Route exact path="/category/:slug" element={<CategoryHome />} />
        <Route exact path="/sub/:slug" element={<SubHome />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route
          exact
          path="/checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/admin/coupon"
          element={
            <AdminRoute>
              <CreateCouponPage />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/payment"
          element={
            <UserRoute>
              <Payment />
            </UserRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
