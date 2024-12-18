import React, { useEffect, useState } from 'react';

const ChannelPage = ({ streamId }) => {
    const [stream, setStream] = useState(null);

    useEffect(() => {
        // Загрузка информации о стриме
        fetch(`http://localhost:5000/api/streams/${streamId}`)
            .then((response) => response.json())
            .then((data) => setStream(data))
            .catch((error) => console.error('Ошибка загрузки стрима:', error));
    }, [streamId]);

    if (!stream) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>{stream.title}</h1>
            <p>{stream.description}</p>
            {stream.isLive ? (
                <div>
                    <h2>Live</h2>
                    <iframe
                        src={`http://localhost:8080/hls/${streamId}.m3u8`}
                        frameBorder="0"
                        allowFullScreen
                        style={{ width: '100%', height: '500px' }}
                    ></iframe>
                    <p>Зрителей: {stream.viewers}</p>
                </div>
            ) : (
                <p>Стрим оффлайн</p>
            )}
        </div>
    );
};

export default ChannelPage;
