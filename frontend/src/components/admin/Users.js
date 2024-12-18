import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error('Ошибка:', err));
    }, []);

    return (
        <div>
            <h2>Пользователи</h2>
            {users.map((user) => (
                <div key={user._id}>
                    <p>Имя: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Роль: {user.role}</p>
                </div>
            ))}
        </div>
    );
};

export default Users;
