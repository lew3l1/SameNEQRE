import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './css/Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                {children}
            </div>
        </div>
    );
};

export default Layout;
