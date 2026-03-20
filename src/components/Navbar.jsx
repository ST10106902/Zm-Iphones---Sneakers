import React, { useState, useEffect } from 'react';
import { ShoppingCart, Smartphone, Laptop, Footprints, Menu, X, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/products' },
        { name: 'iPhones', path: '/products?category=iphone' },
        { name: 'Laptops', path: '/products?category=laptop' },
        { name: 'Sneakers', path: '/products?category=sneakers' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
            ? 'py-4 bg-black/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl'
            : 'py-8 bg-transparent'
            }`}>
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Link to="/" className="flex items-center gap-3 group">
                        <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:scale-105 transition-transform">
                            ZM <span className="text-amber-500">iPhones</span> <span className="text-white/40">&</span> Sneakers
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all duration-300 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-8">
                    <Link to="/cart" className="relative group p-2 rounded-xl hover:bg-white/5 transition-all">
                        <ShoppingCart size={22} className="text-white group-hover:text-amber-500 transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-amber-500 rounded-full text-[10px] font-black flex items-center justify-center text-black px-1 shadow-lg ring-2 ring-black">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        className="lg:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-all"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-bold text-lg text-slate-300 hover:text-white"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
