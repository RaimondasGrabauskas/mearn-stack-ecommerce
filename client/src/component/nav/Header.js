import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { SubMenu, Item } = Menu; // Menu.SubMenu

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    console.log('state', user);

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

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
          className="ml-auto"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="ml-auto">
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
