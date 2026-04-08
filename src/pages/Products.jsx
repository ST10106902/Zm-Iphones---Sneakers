import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronRight, Grid, List, X, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categories = [
        { id: 'all', label: 'All Assets' },
        { id: 'phones', label: 'Phones' },
        { id: 'laptop', label: 'Laptops' },
        { id: 'sneakers', label: 'Sneakers' }
    ];

    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        setSearchParams(catId === 'all' ? {} : { category: catId });
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-32 pb-24 min-h-screen bg-bg-main">
            <div className="container">
                {/* Header Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-6">
                        <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
                        <ChevronRight size={10} className="text-gray-300" />
                        <span className="text-gray-900">Collections</span>
                        {activeCategory !== 'all' && (
                            <>
                                <ChevronRight size={10} className="text-gray-300" />
                                <span className="text-sky-500">{activeCategory}</span>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                        <div className="max-w-2xl">
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-6 uppercase italic leading-[0.9]">
                                The <span className="text-sky-500">Inventory</span>
                            </h1>
                            <p className="text-text-muted font-medium text-lg leading-relaxed max-w-md">
                                Curated excellence. Every item in our catalog is verified for authenticity and premium quality.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative group flex-grow lg:min-w-[400px]">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by model or brand..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center justify-center gap-2 px-8 py-5 rounded-2xl text-sm font-bold transition-all shadow-sm border ${isFilterOpen ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-100 text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <SlidersHorizontal size={18} />
                                Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-gray-100 pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`relative px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'text-sky-500' : 'text-text-muted hover:text-gray-900'
                                }`}
                        >
                            {cat.label}
                            {activeCategory === cat.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                    <div className="ml-auto flex items-center gap-4 text-text-muted text-xs font-bold uppercase tracking-widest hidden md:flex">
                        <span>Showing {filteredProducts.length} Results</span>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="min-h-[400px]">
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-40 bg-gray-50 rounded-[40px] border border-dashed border-gray-200"
                        >
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                                <Search size={40} className="text-gray-200" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase italic">No Match Found</h3>
                            <p className="text-text-muted max-w-sm mx-auto font-medium mb-10">We couldn't find any assets matching your criteria. Try adjusting your search or filters.</p>
                            <button
                                onClick={() => { handleCategoryChange('all'); setSearchQuery(''); }}
                                className="btn-primary mx-auto"
                            >
                                Clear All Search
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;

