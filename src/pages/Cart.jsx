import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [status, setStatus] = useState('idle'); // idle, processing, success

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (status === 'success') {
        return (
            <div className="pt-48 pb-24 min-h-screen bg-white">
                <div className="container max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-50 rounded-[48px] p-16 border border-gray-100 shadow-xl"
                    >
                        <div className="w-24 h-24 bg-green-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/20">
                            <CheckCircle2 size={48} />
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6">Order Received!</h1>
                        <p className="text-xl text-gray-400 font-medium mb-10 italic">
                            Thank you for shopping at ZM Store. Your tech gems are being prepared for delivery.
                        </p>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-10 inline-block">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Order Reference</span>
                            <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                        <Link
                            to="/"
                            className="block w-full py-6 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-sky-600 transition-all active:scale-95 shadow-xl shadow-gray-900/10"
                        >
                            Return to Store
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 bg-white min-h-screen">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 flex-grow">
                        <div className="mb-12">
                            <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic mb-4">Shopping Cart</h1>
                            <p className="text-gray-400 font-medium text-lg">Total Assets: {cart.length}</p>
                        </div>

                        {cart.length === 0 ? (
                            <div className="bg-gray-50 rounded-[48px] p-24 text-center border border-dashed border-gray-200">
                                <ShoppingBag size={64} className="mx-auto text-gray-200 mb-8" />
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
                                <p className="text-gray-400 font-medium mb-10">Start browsing our tech and sneaker collection.</p>
                                <Link to="/" className="inline-flex items-center gap-3 px-10 py-5 bg-sky-600 text-white rounded-2xl font-bold transition-all hover:bg-sky-700 shadow-xl shadow-sky-500/10">
                                    Start Shopping <ArrowRight size={20} />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.cartId}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            className="group bg-white border border-gray-100 p-8 rounded-[40px] flex flex-col sm:flex-row items-center gap-10 hover:shadow-xl hover:border-sky-100 transition-all duration-500"
                                        >
                                            <div className="w-32 h-32 bg-gray-50 rounded-[30px] p-4 flex items-center justify-center shrink-0 border border-transparent group-hover:bg-white group-hover:border-gray-100 group-hover:scale-105 transition-all duration-500">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-grow text-center sm:text-left">
                                                <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{item.brand}</span>
                                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic mb-2">{item.name}</h3>
                                                <p className="text-gray-400 font-bold text-sm">R{item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, Math.max(1, item.quantity - 1))}
                                                    className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-300 hover:text-sky-500 transition-all shadow-sm active:scale-90"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="text-lg font-black text-gray-900 w-4 text-center italic">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                    className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-300 hover:text-sky-500 transition-all shadow-sm active:scale-90"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.cartId)}
                                                className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                            >
                                                <Trash2 size={24} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-[450px] shrink-0">
                        <div className="bg-gray-900 rounded-[56px] p-12 text-white sticky top-32 shadow-2xl ring-1 ring-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-10 relative z-10">Order Summary</h2>

                            <div className="space-y-6 mb-10 border-b border-white/10 pb-10 relative z-10">
                                <div className="flex justify-between items-center text-gray-400 uppercase tracking-widest text-[10px] font-black">
                                    <span>Subtotal</span>
                                    <span className="text-white">R{getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400 uppercase tracking-widest text-[10px] font-black">
                                    <span>Shipping</span>
                                    <span className="text-sky-500">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400 uppercase tracking-widest text-[10px] font-black">
                                    <span>Insurance</span>
                                    <span className="text-sky-500">FREE</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-12 relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Total Payment</span>
                                <span className="text-5xl font-black tracking-tighter italic leading-none">R{getCartTotal().toLocaleString()}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0 || status === 'processing'}
                                className="w-full py-8 bg-sky-600 text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-xs transition-all hover:bg-white hover:text-gray-900 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative z-10 shadow-2xl"
                            >
                                {status === 'processing' ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        SECURE PROCESSING...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-4">
                                        Confirm Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </button>

                            <div className="mt-12 space-y-4 relative z-10">
                                <div className="flex items-center gap-4 text-gray-400">
                                    <ShieldCheck size={18} className="text-sky-500" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Store Verified 256-Bit SSL</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <Truck size={18} className="text-sky-500" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Free Priority Courier</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
