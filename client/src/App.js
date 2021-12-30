import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './component/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
