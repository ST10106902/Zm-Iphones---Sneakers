import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0B] text-white border-t border-white/5">
            {/* Newsletter Section - Refined */}
            <section className="py-32 border-b border-white/5">
                <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase italic">Stay in the Loop</h2>
                    <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Get exclusive deals, new arrivals, and special offers delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-white/5 p-2 rounded-[32px] border border-white/10 backdrop-blur-xl hover:border-amber-500/30 transition-all duration-500">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow bg-transparent border-none py-4 px-8 text-white focus:outline-hidden text-lg font-medium"
                        />
                        <button className="px-12 py-5 bg-amber-500 text-black font-black rounded-[24px] hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 uppercase tracking-[0.2em] text-[10px]">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Footer Content */}
            <div className="py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-20">
                        <div className="lg:col-span-5">
                            <Link to="/" className="inline-block mb-10 group">
                                <span className="text-3xl font-black tracking-tighter uppercase group-hover:scale-105 transition-transform block">
                                    ZM <span className="text-amber-500">iPhones</span> <span className="text-white/40">&</span> Sneakers
                                </span>
                            </Link>
                            <p className="text-slate-500 text-lg mb-12 max-w-md leading-relaxed font-medium">
                                Your trusted destination for authentic iPhones, premium laptops, and exclusive sneakers. Quality guaranteed on every purchase.
                            </p>
                            <div className="flex gap-4">
                                {[Instagram, Twitter, Facebook, Github].map((Icon, i) => (
                                    <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/20 transition-all duration-300">
                                        <Icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-3 lg:offset-1">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-10">Quick Links</h4>
                            <ul className="flex flex-col gap-5">
                                {['All Products', 'iPhones', 'Laptops', 'Sneakers'].map((item) => (
                                    <li key={item}>
                                        <Link to="/products" className="text-slate-500 hover:text-white font-medium transition-all hover:translate-x-1 inline-block">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-3">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-10">Support</h4>
                            <ul className="flex flex-col gap-5">
                                {['Contact Us', 'Shipping Info', 'Returns Policy', 'FAQ'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-slate-500 hover:text-white font-medium transition-all hover:translate-x-1 inline-block">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-slate-600 text-xs font-black uppercase tracking-[0.2em]">
                            © 2026 ZM iPhones & Sneakers. Engineered by ZM Store.
                        </p>
                        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
