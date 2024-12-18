import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Form.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username || 'User');
            localStorage.setItem('role', response.data.role); // Сохраняем роль пользователя
            navigate('/profile');
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при входе');
        }
    };

    return (
        <div className="form-container">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Войти</button>
                <p>Нет аккаунта? <a href="/register">Зарегистрируйтесь</a></p>
            </form>
        </div>
    );
};

export default LoginForm;
