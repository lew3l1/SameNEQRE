import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('home');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <aside className="sidebar">
            <ul>
                <li
                    className={activeLink === 'home' ? 'active' : ''}
                    onClick={() => handleLinkClick('home')}
                >
                    <Link to="/">
                        <i className="icon">🏠</i>
                    </Link>
                </li>
                <li
                    className={activeLink === 'top-streaming' ? 'active' : ''}
                    onClick={() => handleLinkClick('top-streaming')}
                >
                    <Link to="/top-streaming">
                        <i className="icon">📺</i>
                    </Link>
                </li>
                <li
                    className={activeLink === 'games' ? 'active' : ''}
                    onClick={() => handleLinkClick('games')}
                >
                    <Link to="/games">
                        <i className="icon">🎮</i>
                    </Link>
                </li>
                <li
                    className={activeLink === 'teams' ? 'active' : ''}
                    onClick={() => handleLinkClick('teams')}
                >
                    <Link to="/teams">
                        <i className="icon">👥</i>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
