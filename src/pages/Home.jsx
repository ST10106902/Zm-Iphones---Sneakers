import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Laptop, Footprints, ShieldCheck, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
    const featuredProducts = products.filter(p => p.featured).slice(0, 4);

    const categories = [
        {
            title: 'iPhones',
            subtitle: 'Latest Apple iPhones with warranty',
            image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000',
            icon: <Smartphone size={24} />,
            link: '/products?category=iphone'
        },
        {
            title: 'Laptops',
            subtitle: 'Powerful laptops for work & play',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000',
            icon: <Laptop size={24} />,
            link: '/products?category=laptop'
        },
        {
            title: 'Sneakers',
            subtitle: 'Exclusive kicks & streetwear',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
            icon: <Footprints size={24} />,
            link: '/products?category=sneakers'
        }
    ];

    return (
        <div className="bg-[#0A0A0B] text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Premium Tech & Lifestyle
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
                            ZM iPhones <br />
                            <span className="text-white/40">&</span> Sneakers
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
                            Your destination for premium iPhones, powerful laptops, and exclusive sneakers. Authentic products, unbeatable prices.
                        </p>

                        <div className="flex flex-wrap gap-5 mb-16">
                            <Link to="/products" className="px-10 py-5 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all flex items-center gap-3 shadow-2xl shadow-amber-500/20 group">
                                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/products" className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-slate-100 transition-all shadow-xl">
                                Discover More
                            </Link>
                        </div>

                        <div className="flex gap-10">
                            <div className="flex flex-col items-center gap-3 group cursor-pointer">
                                <div className="p-5 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                                    <Smartphone size={28} className="group-hover:text-amber-500 transition-colors" />
                                </div>
                                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors">iPhones</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 group cursor-pointer">
                                <div className="p-5 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                                    <Laptop size={28} className="group-hover:text-amber-500 transition-colors" />
                                </div>
                                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors">Laptops</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 group cursor-pointer">
                                <div className="p-5 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                                    <Footprints size={28} className="group-hover:text-amber-500 transition-colors" />
                                </div>
                                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors">Sneakers</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 bg-[#111112]">
                            <img
                                src="https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1000"
                                alt="iPhone Hero"
                                className="w-full h-auto object-cover scale-105"
                            />
                        </div>

                        <div className="absolute -bottom-8 -right-8 z-20 bg-amber-500 text-black p-8 rounded-[40px] shadow-2xl transform rotate-3">
                            <div className="flex flex-col leading-tight">
                                <span className="text-4xl font-black italic tracking-tighter">100%</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Authentic <br /> Guaranteed</span>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-amber-500/5 rounded-full blur-[140px] -z-10"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                    </motion.div>
                </div>
            </section>

            {/* Category Section */}
            <section className="py-32 bg-white text-black rounded-[60px] -mt-10 relative z-20 shadow-2xl">
                <div className="container mx-auto px-4 md:px-8 text-center mb-20">
                    <span className="text-amber-500 text-xs font-black tracking-[0.4em] uppercase mb-4 block">Browse Categories</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase underline decoration-amber-500 underline-offset-8">Shop by Category</h2>
                </div>

                <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {categories.map((cat, i) => (
                        <Link to={cat.link} key={i} className="group relative h-[550px] rounded-[48px] overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-500">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-10 w-full">
                                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 w-fit mb-6 shadow-xl group-hover:bg-amber-500 group-hover:border-amber-600 transition-all duration-300">
                                    {cat.icon}
                                </div>
                                <h3 className="text-4xl font-black mb-2 text-white italic tracking-tighter uppercase">{cat.title}</h3>
                                <p className="text-slate-300 font-medium tracking-wide group-hover:text-white transition-colors">{cat.subtitle}</p>

                                <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-xl">
                                    <ArrowRight className="text-black" size={24} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-32 bg-white text-black">
                <div className="container mx-auto px-4 md:px-8 text-center mb-20">
                    <span className="text-amber-500 text-xs font-black tracking-[0.4em] uppercase mb-4 block">Handpicked For You</span>
                    <h2 className="text-6xl font-black tracking-tighter italic uppercase">Featured Products</h2>
                </div>

                <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-32 bg-[#0A0A0B] text-white overflow-hidden relative">
                <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase">Stay in the Loop</h2>
                        <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium caps">
                            Get exclusive deals, new arrivals, and special offers delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-white/5 p-2 rounded-[32px] border border-white/10 backdrop-blur-xl">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow bg-transparent border-none py-4 px-8 text-white focus:outline-hidden text-lg font-medium"
                            />
                            <button className="px-12 py-5 bg-amber-500 text-black font-black rounded-[24px] hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 uppercase tracking-widest text-xs">
                                Subscribe
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent to-black/50"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
            </section>
        </div>
    );
};

export default Home;