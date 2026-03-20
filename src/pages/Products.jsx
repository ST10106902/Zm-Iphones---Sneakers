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
        <div className="pt-40 pb-32 min-h-screen bg-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
                    <div>
                        <div className="w-20 h-1 bg-indigo-600 mb-6"></div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">THE CATALOG</h1>
                        <p className="text-slate-500 font-medium text-lg italic tracking-tight uppercase tracking-[0.2em]">Curated Elite Assets</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                        <div className="relative group flex-grow lg:w-96">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="SEARCH THE VAULT"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-widest text-white focus:outline-hidden focus:border-indigo-500 transition-all uppercase"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-white/10 hover:border-white/20 transition-all">
                            <SlidersHorizontal size={18} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30'
                                : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 border border-white/5'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white/5 rounded-[48px] border border-white/5">
                        <h3 className="text-3xl font-black italic mb-4 uppercase tracking-tighter">No assets found</h3>
                        <p className="text-slate-500 font-medium uppercase text-xs tracking-widest leading-relaxed">Adjust your search parameters to find elite items.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
