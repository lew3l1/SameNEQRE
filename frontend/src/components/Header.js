import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
    const isLoggedIn = localStorage.getItem('token'); // Проверка авторизации
    const username = localStorage.getItem('username') || 'Profile'; // Имя пользователя

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">NEQRE</Link>
            </div>
            <nav className="nav-links">
                <Link to="/top-streaming">Top Streaming</Link>
                <Link to="/games">Games</Link>
                <Link to="/teams">Teams</Link>
            </nav>
            <div className="profile-btn">
                {isLoggedIn ? (
                    <Link to="/profile">{username}</Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
