import React, { useEffect, useState } from 'react';
import './css/Home.css';

const Home = () => {
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/streams')
            .then((response) => response.json())
            .then((data) => setStreams(data))
            .catch((error) => console.error('Ошибка при загрузке стримов:', error));
    }, []);

    return (
        <div>
            <h1>Добро пожаловать на платформу стриминга!</h1>
            <ul>
                {streams.map((stream) => (
                    <li key={stream.id}>{stream.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
