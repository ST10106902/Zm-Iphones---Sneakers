import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Github, ArrowUp, ShieldCheck, Truck, Lock, CreditCard } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
                    <div className="lg:col-span-4">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-sky-500 transition-all duration-500 shadow-lg shadow-black/5">
                                <span className="text-white font-black text-xl italic tracking-tighter">ZM</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black tracking-tighter uppercase italic leading-none text-gray-900">
                                    Store
                                </span>
                                <span className="text-[7px] font-black tracking-[0.4em] uppercase text-sky-500 leading-none mt-1">The iPhone Specialist</span>
                            </div>
                        </Link>
                        <p className="text-text-muted mb-10 max-w-sm leading-relaxed">
                            The leading destination for authentic iPhones in South Africa. Specializing in models 7 through 14 with verified quality.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-gray-900 mb-8 uppercase text-xs tracking-[0.2em]">Store</h4>
                        <div className="flex flex-col gap-4">
                            {[
                                { name: 'Browse iPhones', path: '/' },
                                { name: 'Refurbished Units', path: '/' }
                            ].map((item) => (
                                <Link key={item.name} to={item.path} className="text-text-muted hover:text-sky-500 transition-colors w-fit font-medium">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-black text-gray-900 mb-8 uppercase text-[10px] tracking-[0.3em] italic">Support</h4>
                        <div className="flex flex-col gap-5">
                            {[
                                { name: 'Contact Us', path: '/support/contact' },
                                { name: 'Shipping Info', path: '/support/shipping' },
                                { name: 'Returns Policy', path: '/support/returns' }
                            ].map((item) => (
                                <Link key={item.name} to={item.path} className="text-text-muted hover:text-sky-500 transition-colors w-fit font-bold uppercase text-[10px] tracking-widest">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-gray-900 p-10 rounded-[40px] border border-white/10 shadow-2xl shadow-black/20">
                        <h4 className="font-black text-white mb-4 uppercase italic tracking-tighter text-2xl">Newsletter</h4>
                        <p className="text-sm text-gray-400 mb-8 font-medium">Join our community for exclusive drops and early access to new releases.</p>
                        <div className="space-y-4 mb-8">
                            {[
                                { icon: ShieldCheck, text: 'Verified Authentic' },
                                { icon: Truck, text: 'Priority Logistics' },
                                { icon: Lock, text: 'Secure Transaction' }
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-sky-500/80">
                                    <badge.icon size={14} className="text-sky-500" />
                                    {badge.text}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="ACCESS KEY (EMAIL)"
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 uppercase tracking-widest"
                            />
                            <button className="w-14 h-14 bg-sky-500 text-gray-900 rounded-2xl flex items-center justify-center hover:bg-sky-400 transition-colors shadow-xl shadow-sky-500/20">
                                <ArrowUp size={22} className="rotate-45" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted text-sm font-medium">
                    <p>© {new Date().getFullYear()} ZM Store. All rights reserved.</p>
                    <div className="flex gap-8">
                        <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-sky-500 transition-colors">
                            Back to top <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

