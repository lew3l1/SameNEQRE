import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Profile.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('data');
    const [userData, setUserData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Загрузка данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error('Failed to fetch user data');
                const data = await response.json();
                setUserData(data);
                setEditData(data); // Устанавливаем данные для редактирования
            } catch (err) {
                console.error(err);
                setError('Ошибка загрузки данных пользователя');
            }
        };

        fetchUserData();
    }, [navigate]);

    // Обновление данных в форме
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    // Отправка изменений на сервер
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editData),
            });

            if (!response.ok) throw new Error('Failed to update user data');
            const updatedData = await response.json();
            setUserData(updatedData);
            setEditData(updatedData);
            alert('Данные успешно обновлены');
            setActiveTab('data'); // Возвращаемся на вкладку "Данные"
        } catch (err) {
            console.error(err);
            setError('Ошибка обновления данных');
        }
    };

    // Выход из аккаунта
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    if (!userData) return <p>Загрузка...</p>;

    return (
        <div className="profile-container">
            <h2>Профиль пользователя</h2>
            <div className="tabs">
                <button
                    className={activeTab === 'data' ? 'active' : ''}
                    onClick={() => setActiveTab('data')}
                >
                    Данные
                </button>
                <button
                    className={activeTab === 'edit' ? 'active' : ''}
                    onClick={() => setActiveTab('edit')}
                >
                    Изменить данные
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'data' && (
                    <div className="user-data">
                        <p>
                            <strong>Имя пользователя:</strong> {userData.username}
                        </p>
                        <p>
                            <strong>Email:</strong> {userData.email}
                        </p>
                        <p>
                            <strong>Роль:</strong> {userData.role}
                        </p>
                        <button className="logout-btn" onClick={handleLogout}>
                            Выйти из аккаунта
                        </button>
                    </div>
                )}

                {activeTab === 'edit' && (
                    <form onSubmit={handleEditSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Имя пользователя"
                            value={editData.username}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={editData.email}
                            onChange={handleEditChange}
                            required
                        />
                        <button type="submit">Сохранить изменения</button>
                    </form>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Profile;
