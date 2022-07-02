import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './layout/nav/NavBar';
import Home from './layout/pages/Home';
import Login from './layout/pages/Login';
import PageNotFound from './layout/pages/PageNotFound';
import Signup from './layout/pages/Signup';
import LoginSignupBGImage from './assets/img/login_signup_bg.jpg';

const renderNavBar = (component: React.FC) => {
  return (
    <>
      <NavBar />
      {React.createElement(component)}
    </>
  );
};

const RoutesComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div
              className='d-flex grayscale fit'
              style={{
                minHeight: '100vh',
                backgroundImage: `url(${LoginSignupBGImage})`,
              }}
            >
              <Login />
            </div>
          }
        />
        <Route
          path='/signup'
          element={
            <div
              className='d-flex grayscale fit'
              style={{
                minHeight: '100vh',
                backgroundImage: `url(${LoginSignupBGImage})`,
              }}
            >
              <Signup />
            </div>
          }
        />
        <Route path='/home' element={renderNavBar(Home)} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
