import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Создание корневого элемента
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендер приложения
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
