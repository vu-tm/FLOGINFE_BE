import React, { useState } from 'react';
import api from '../../services/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { username, password });
            alert(res.data);
        } catch (err) {
            alert(err.response?.data || 'Login failed');
        }
    };

    return (
        <form onSubmit={submit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
            <button type="submit">Login</button>
        </form>
    );
}
