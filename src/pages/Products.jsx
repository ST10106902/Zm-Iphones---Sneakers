import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['all', 'iphone', 'laptop', 'sneakers'];

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-40 pb-32 min-h-screen bg-[#0A0A0B] text-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 bg-white/5 p-12 rounded-[48px] border border-white/10 backdrop-blur-3xl">
                    <div>
                        <div className="w-20 h-1.5 bg-amber-500 mb-8 rounded-full"></div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 italic uppercase leading-none">The Catalog</h1>
                        <p className="text-slate-400 font-black text-xs italic tracking-[0.4em] uppercase">Curated Elite Assets</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                        <div className="relative group flex-grow lg:w-96">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="SEARCH THE VAULT"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-black/40 border border-white/10 rounded-2xl text-[10px] font-black tracking-[0.2em] text-white focus:outline-hidden focus:border-amber-500 transition-all uppercase placeholder:text-slate-700"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-amber-500 transition-all shadow-xl active:scale-95">
                            <SlidersHorizontal size={18} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-4 mb-20 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeCategory === cat
                                ? 'bg-amber-500 text-black border-amber-500 shadow-2xl shadow-amber-500/20 scale-105'
                                : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 border-white/5'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white/5 rounded-[60px] border border-white/5 backdrop-blur-3xl">
                        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search size={40} className="text-amber-500/30" />
                        </div>
                        <h3 className="text-4xl font-black italic mb-4 uppercase tracking-tighter">No assets found</h3>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] max-w-sm mx-auto leading-relaxed">Adjust your search parameters to find elite items in our inventory.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
