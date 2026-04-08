import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="pt-40 pb-24 min-h-screen bg-gray-50/50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[48px] shadow-2xl overflow-hidden border border-gray-100"
            >
                <div className="p-12">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <span className="text-white font-black text-2xl tracking-tighter">ZM</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic mb-2">Welcome Back</h1>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Access Your Creative Vault</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs text-red-500 font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-6 bg-sky-600 text-white rounded-[24px] font-black uppercase tracking-[0.4em] text-xs hover:bg-gray-900 transition-all shadow-2xl shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-3"
                        >
                            Log In <LogIn size={18} />
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-gray-50 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">New to ZM Store?</p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 text-sky-600 font-black text-xs uppercase tracking-[0.2em] hover:text-gray-900 transition-colors"
                        >
                            Create Account <UserPlus size={16} />
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 border-t border-gray-100 flex items-center justify-center gap-3">
                    <ShieldCheck size={14} className="text-sky-500" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 leading-none">Secured via AES-256 Encryption</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
