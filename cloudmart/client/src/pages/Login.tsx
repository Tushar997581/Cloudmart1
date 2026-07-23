import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <input
                            type="email" required
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange sm:text-sm"
                            placeholder="Email address"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password" required
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange sm:text-sm"
                            placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amazon hover:bg-amazon-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon-orange">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;