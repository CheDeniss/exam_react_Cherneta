import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Реалізуйте логіку входу, наприклад, виклик функції onLogin
        onLogin({ username, password });
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

const RegistrationForm = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Реалізуйте логіку реєстрації, наприклад, виклик функції onRegister
        onRegister({ username, password });
    };

    return (
        <div>
            <h2>Registration</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    );
};

const AuthPage = () => {
    const handleLogin = (credentials) => {
        // Логіка входу - може викликати API або інші необхідні дії
        console.log('Logging in with credentials:', credentials);
    };

    const handleRegister = (userInfo) => {
        // Логіка реєстрації - може викликати API або інші необхідні дії
        console.log('Registering user with info:', userInfo);
    };

    return (
        <div>
            <LoginForm onLogin={handleLogin} />
            <RegistrationForm onRegister={handleRegister} />
        </div>
    );
};

export default AuthPage;
