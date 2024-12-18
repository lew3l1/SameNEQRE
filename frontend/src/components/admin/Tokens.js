import React, { useEffect, useState } from 'react';

const Tokens = () => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/tokens', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setTokens(data))
            .catch((err) => console.error('Ошибка:', err));
    }, []);

    return (
        <div>
            <h2>Токены</h2>
            {tokens.map((token) => (
                <div key={token.userId}>
                    <p>Пользователь: {token.username}</p>
                    <p>Токен: {token.token}</p>
                </div>
            ))}
        </div>
    );
};

export default Tokens;
