import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import Users from './components/admin/Users';
import Tokens from './components/admin/Tokens';
import ChannelPage from './ChannelPage';


// Компонент для защищенных маршрутов
const ProtectedRoute = ({ element, condition, redirectTo = '/' }) => {
    return condition ? element : <Navigate to={redirectTo} />;
};

function App() {
    const isLoggedIn = Boolean(localStorage.getItem('token')); // Проверка авторизации
    const userRole = localStorage.getItem('role'); // Роль пользователя
    const isAdmin = userRole === 'admin'; // Проверка на администратора

    return (
        <Router>
            <Routes>
                {/* Главная страница */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />

                {/* Главная страница */}
                <Route
                    path="/home"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />

                {/* Авторизация и регистрация */}
                <Route
                    path="/login"
                    element={
                        <Layout>
                            <LoginForm />
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout>
                            <RegisterForm />
                        </Layout>
                    }
                />

                {/* Профиль пользователя */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute
                            condition={isLoggedIn}
                            element={
                                <Layout>
                                    <Profile />
                                </Layout>
                            }
                            redirectTo="/login"
                        />
                    }
                />

                {/* Административные маршруты */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            condition={isAdmin}
                            element={<AdminPanel />}
                        />
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute
                            condition={isAdmin}
                            element={<Users />}
                        />
                    }
                />
                <Route
                    path="/admin/tokens"
                    element={
                        <ProtectedRoute
                            condition={isAdmin}
                            element={<Tokens />}
                        />
                    }
                />

                {/* Другие страницы */}
                <Route
                    path="/top-streaming"
                    element={
                        <Layout>
                            <div>Top Streaming Page</div>
                        </Layout>
                    }
                />
                <Route
                    path="/games"
                    element={
                        <Layout>
                            <div>Games Page</div>
                        </Layout>
                    }
                />
                <Route
                    path="/teams"
                    element={
                        <Layout>
                            <div>Teams Page</div>
                        </Layout>
                    }
                />
            <Routes>
                <Route path="/channel/:streamId" element={<ChannelPage />} />
        </Routes>
            </Routes>
        </Router>
    );
}

export default App;
