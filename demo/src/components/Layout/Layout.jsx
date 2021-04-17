import React from 'react';
/** Components */
import Header from './Header';
import Footer from './Footer';
/** Styles */
import './Layout.scss';

const Layout = ({ children }) => (
  <div className="layout__container">
    <Header />
    <div className="layout__content">{children}</div>
    <Footer />
  </div>
);

export default Layout;
