import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="pt-60 pb-40 min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center container text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center mb-10 shadow-2xl relative group"
                >
                    <ShoppingBag size={50} className="text-slate-700 group-hover:text-amber-500 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-amber-500/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
                <h2 className="text-5xl font-black mb-6 italic tracking-tighter uppercase">Your Vault is Empty</h2>
                <p className="text-slate-500 mb-12 max-w-sm uppercase font-black text-[10px] tracking-[0.3em] leading-relaxed">
                    No elite assets have been secured yet. <br /> Explore the catalog to begin your acquisition.
                </p>
                <Link to="/products" className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-amber-500 transition-all shadow-2xl uppercase tracking-widest text-xs active:scale-95">
                    Browse Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-40 min-h-screen bg-[#0A0A0B] text-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-24 bg-white/5 p-12 rounded-[60px] border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                    <div className="w-20 h-1.5 bg-amber-500 mb-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">Your Vault</h1>
                    <p className="text-slate-400 font-black text-xs italic tracking-[0.4em] uppercase mt-4">Pending Acquisitions</p>

                    <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                        <ShoppingBag size={300} strokeWidth={1} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {cartItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="group relative bg-[#111112] border-white/5 border hover:border-amber-500/30 transition-all p-8 flex flex-col md:flex-row gap-12 items-center rounded-[40px] shadow-2xl overflow-hidden"
                            >
                                <div className="w-full md:w-56 aspect-square rounded-3xl overflow-hidden bg-[#1A1A1B] flex-shrink-0 relative group-hover:scale-105 transition-transform duration-700">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:rotate-3" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                                </div>

                                <div className="flex-grow flex flex-col w-full">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.4em] mb-3 italic">{item.category}</p>
                                            <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none group-hover:text-amber-500 transition-colors">{item.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600 hover:text-white hover:bg-rose-500 transition-all active:scale-90 shadow-xl"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-between items-center mt-auto gap-10 pt-8 border-t border-white/5">
                                        <div className="flex items-center gap-8 bg-black/40 border border-white/10 p-2.5 rounded-2xl backdrop-blur-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-amber-500 hover:text-black rounded-xl text-white transition-all active:scale-90"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="font-black italic text-2xl min-w-[40px] text-center tracking-tighter">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-amber-500 hover:text-black rounded-xl text-white transition-all active:scale-90"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                        <div className="text-4xl font-black italic tracking-tighter text-white">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#111112] backdrop-blur-3xl border border-white/10 p-12 rounded-[60px] sticky top-40 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-12">Acquisition Total</h2>
                            <div className="flex flex-col gap-8 mb-16">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="text-white">${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                    <span>Logistics</span>
                                    <span className="text-amber-500 text-[10px] italic">Complimentary</span>
                                </div>
                                <div className="h-px bg-white/5 my-4"></div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Final Investment</span>
                                    <span className="text-6xl font-black italic tracking-tighter text-amber-500 leading-none">${cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="w-full bg-white text-black hover:bg-amber-500 py-8 rounded-[32px] font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl relative group overflow-hidden">
                                <span className="relative z-10 flex items-center gap-4">
                                    Finalize Acquisition
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>

                            <p className="text-[9px] text-center text-slate-700 mt-12 uppercase tracking-[0.3em] font-black italic">
                                Secured via 512-bit quantum encryption
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
