import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Smartphone, Laptop, Footprints, Search, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User as UserIcon, LogIn } from 'lucide-react';

const Navbar = ({ scrolled }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cartCount } = useCart();
    const { user, logout, isAdmin, isAuthenticated } = useAuth();
    const location = useLocation();

    const navLinks = [
        { name: 'Store', path: '/', icon: <Smartphone size={16} />, show: true },
        { name: 'Manage', path: '/admin', icon: <LayoutDashboard size={16} />, show: isAdmin },
    ];

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <header className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 h-20`}>
            <nav className={`container h-full flex items-center justify-between rounded-3xl border transition-all duration-500 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl border-gray-100 shadow-xl px-10'
                : 'bg-white shadow-xl lg:bg-white/10 lg:backdrop-blur-md border-gray-100 lg:border-white/20 px-10'}`}>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group relative z-[60]">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-sky-500 transition-all duration-500 shadow-lg">
                        <span className="text-white font-black text-xl tracking-tighter">ZM</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tighter uppercase text-gray-900 leading-none">
                            Store
                        </span>
                        <span className="text-[8px] font-bold tracking-widest uppercase text-sky-500 leading-none mt-1">The iPhone Specialist</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.filter(link => link.show).map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${scrolled
                                ? 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
                                : 'text-gray-700 hover:text-sky-600 hover:bg-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/support/contact"
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${scrolled
                            ? 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
                            : 'text-gray-700 hover:text-sky-600 hover:bg-white'
                            }`}
                    >
                        Support
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 relative z-[60]">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-3 rounded-2xl transition-all text-gray-700 hover:text-sky-600 hover:bg-white shadow-sm"
                    >
                        <Search size={20} />
                    </button>

                    <Link
                        to="/cart"
                        className="group relative p-3 rounded-2xl transition-all text-gray-700 hover:text-sky-600 hover:bg-white shadow-sm"
                    >
                        <ShoppingCart size={20} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 min-w-[18px] h-4.5 bg-sky-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white px-1 shadow-lg ring-2 ring-white"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <span className="text-[10px] font-black text-gray-900 leading-none uppercase">{user.name}</span>
                                <span className="text-[8px] font-bold text-sky-500 uppercase leading-none mt-1">{user.role}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="p-3 rounded-2xl transition-all text-red-500 hover:bg-red-50 shadow-sm"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="p-3 rounded-2xl transition-all text-sky-600 hover:bg-sky-50 shadow-sm flex items-center gap-2"
                        >
                            <LogIn size={20} />
                            <span className="text-xs font-bold hidden sm:block uppercase tracking-widest">Login</span>
                        </Link>
                    )}

                    <button
                        className="lg:hidden p-3 rounded-2xl transition-all text-gray-700 hover:text-sky-600 hover:bg-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

            </nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-10 right-10 p-4 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={32} className="text-gray-900" />
                        </button>

                        <div className="w-full max-w-4xl">
                            <span className="text-sky-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-center">Search ZM Store</span>
                            <div className="relative mb-12">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={32} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search iPhone models 7 - 14..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-20 pr-8 py-10 bg-gray-50 border-b-4 border-gray-900 text-4xl font-bold tracking-tight focus:outline-none focus:bg-gray-100 transition-all uppercase"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                                        POPULAR CATEGORIES
                                    </h4>
                                    <div className="flex flex-col gap-4">
                                        {['iPhone 14 Pro', 'iPhone 13', 'iPhone 12', 'iPhone 11'].map((cat) => (
                                            <button key={cat} className="text-left text-xl font-bold text-gray-900 hover:text-sky-500 transition-colors tracking-tight uppercase">
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                                        SHOPPING ASSISTANCE
                                    </h4>
                                    <p className="text-gray-900 text-xl font-bold leading-tight tracking-tight mb-8">
                                        Looking for the best gear? Our support team can help you find exactly what you need.
                                    </p>
                                    <Link to="/support/contact" className="text-sky-600 font-bold text-sm uppercase tracking-widest border-b-2 border-sky-600 pb-1">
                                        Talk to an Expert
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[50] pt-24 pb-12 px-6 bg-white flex flex-col lg:hidden"
                    >
                        <div className="flex flex-col gap-2 mt-8">
                            {navLinks.filter(link => link.show).map((link, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={link.name}
                                >
                                    <Link
                                        to={link.path}
                                        className="flex items-center gap-4 p-4 rounded-2xl text-xl font-bold text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                                    >
                                        <div className="p-3 bg-gray-50 rounded-xl text-sky-500">
                                            {link.icon}
                                        </div>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <Link
                                to="/cart"
                                className="flex items-center justify-center gap-3 w-full p-5 bg-gray-900 text-white rounded-2xl font-bold text-lg"
                            >
                                <ShoppingCart size={22} />
                                View Shopping Cart ({cartCount})
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
