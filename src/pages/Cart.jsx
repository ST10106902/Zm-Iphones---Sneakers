import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 pb-20 min-h-[60vh] flex flex-col items-center justify-center container text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-slate-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-slate-400 mb-10 max-w-sm">Looks like you haven't added anything to your cart yet. Let's find something amazing for you!</p>
                <Link to="/products" className="btn-primary">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-32 min-h-screen bg-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-20">
                    <div className="w-20 h-1 bg-indigo-600 mb-6"></div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">YOUR VAULT</h1>
                    <p className="text-slate-500 font-medium text-lg italic tracking-tight uppercase tracking-[0.2em]">Pending Acquisitions</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 flex flex-col gap-1">
                        {cartItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative bg-white/2 border-white/5 border hover:bg-white/5 transition-all p-8 flex flex-col md:flex-row gap-10 items-center rounded-3xl"
                            >
                                <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden bg-white/5 flex-shrink-0 relative">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                                </div>

                                <div className="flex-grow flex flex-col w-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] mb-2 italic">{item.category}</p>
                                            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">{item.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-95"
                                        >
                                            <Trash2 size={22} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-between items-center mt-auto gap-8 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-6 bg-black border border-white/10 p-2 rounded-2xl">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-indigo-600 rounded-xl text-white transition-all active:scale-90"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="font-black italic text-xl min-w-[30px] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-indigo-600 rounded-xl text-white transition-all active:scale-90"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                        <div className="text-3xl font-black italic tracking-tighter text-cyan-400">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[48px] sticky top-40 shadow-2xl">
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-10">ACQUISITION TOTAL</h2>
                            <div className="flex flex-col gap-6 mb-12">
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                                    <span>SUBTOTAL</span>
                                    <span className="text-white">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                                    <span>LOGISTICS</span>
                                    <span className="text-indigo-400 text-xs italic">COMPLIMENTARY</span>
                                </div>
                                <div className="h-px bg-white/10 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black uppercase tracking-widest text-white">TOTAL DUE</span>
                                    <span className="text-5xl font-black italic tracking-tighter text-indigo-400 leading-none">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-indigo-600/40">
                                ACQUIRE NOW
                                <ArrowRight size={24} />
                            </button>

                            <p className="text-[10px] text-center text-slate-600 mt-10 uppercase tracking-[0.2em] font-black italic">
                                SECURED VIA 256-BIT ENCRYPTION
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
