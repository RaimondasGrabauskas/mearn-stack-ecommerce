import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    auth.signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      <Item key="search" className="ml-auto">
        <Search />
      </Item>

      {user && (
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]}>
          {user && user.role === 'subscriber' && (
            <Item key="setting:1">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === 'admin' && (
            <Item key="setting:1">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>
      )}

      {!user && (
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
