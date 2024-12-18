import React, { useState, useEffect } from 'react';
import './css/AdminPanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        // Получение данных пользователей
        fetch('http://localhost:5000/api/admin/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error('Ошибка:', err));

        // Получение токенов
        fetch('http://localhost:5000/api/admin/tokens', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setTokens(data))
            .catch((err) => console.error('Ошибка:', err));
    }, []);

    const handleUserUpdate = (userId, updatedData) => {
        fetch(`http://localhost:5000/api/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Данные пользователя обновлены');
                setUsers(users.map((user) => (user._id === userId ? data : user)));
            })
            .catch((err) => console.error('Ошибка обновления пользователя:', err));
    };

    const handleRegenerateToken = (userId) => {
        fetch(`http://localhost:5000/api/admin/tokens/${userId}/regenerate`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Токен обновлен');
                setTokens(tokens.map((token) => (token.userId === userId ? data : token)));
            })
            .catch((err) => console.error('Ошибка перегенерации токена:', err));
    };

    const handleMakeAdmin = (userId) => {
        fetch(`http://localhost:5000/api/admin/users/${userId}/make-admin`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setUsers(users.map((user) =>
                    user._id === userId ? { ...user, role: 'admin' } : user
                ));
            })
            .catch((err) => console.error('Ошибка назначения администратора:', err));
    };

    return (
        <div className="admin-panel">
            <h2>Панель администратора</h2>
            <div className="tabs">
                <button
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    Пользователи
                </button>
                <button
                    className={activeTab === 'tokens' ? 'active' : ''}
                    onClick={() => setActiveTab('tokens')}
                >
                    Токены
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'users' && (
                    <div>
                        <h3>Пользователи</h3>
                        {users.map((user) => (
                            <div key={user._id} className="user-item">
                                <p>Имя: {user.username}</p>
                                <p>Email: {user.email}</p>
                                <p>Роль: {user.role}</p>
                                <button onClick={() => handleMakeAdmin(user._id)}>
                                    Сделать администратором
                                </button>
                                <button
                                    onClick={() =>
                                        handleUserUpdate(user._id, {
                                            username: prompt('Новое имя:', user.username),
                                            email: prompt('Новый email:', user.email),
                                        })
                                    }
                                >
                                    Изменить данные
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'tokens' && (
                    <div>
                        <h3>Токены</h3>
                        {tokens.map((token) => (
                            <div key={token.userId} className="token-item">
                                <p>Пользователь: {token.username}</p>
                                <p>Токен: {token.token}</p>
                                <button onClick={() => handleRegenerateToken(token.userId)}>
                                    Перегенерировать токен
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
