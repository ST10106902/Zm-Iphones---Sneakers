import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Plus, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const categoryStyles = {
        phones: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100', accent: 'bg-sky-500' },
        laptop: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100', accent: 'bg-violet-500' },
        sneakers: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', accent: 'bg-orange-500' },
        audio: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-100', accent: 'bg-gray-800' }
    };

    const style = categoryStyles[product.category] || categoryStyles.audio;

    const handleQuickAdd = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -10 }}
            onClick={() => navigate(`/products/${product.id}`)}
            className="group relative bg-white rounded-[40px] border border-gray-100 p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50"
        >
            {/* Simple Status Badges */}
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                {product.featured && (
                    <div className="px-3 py-1 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        Best Seller
                    </div>
                )}
                {product.isNew && (
                    <div className="px-3 py-1 bg-sky-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        New Arrival
                    </div>
                )}
            </div>

            {/* Price Badge */}
            <div className="absolute top-8 right-8 z-10 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-50 rounded-2xl shadow-xl">
                <span className="text-xs font-bold text-gray-900">R{product.price.toLocaleString()}</span>
            </div>

            {/* Product Image Area */}
            <div className="relative aspect-square mb-8 p-10 bg-gray-50/50 rounded-[32px] overflow-hidden flex items-center justify-center transition-all duration-700 group-hover:bg-white">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-700"
                />

                {/* Quick Actions Portal - iStore Style */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                    <button
                        onClick={handleQuickAdd}
                        className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-sky-600 transition-all active:scale-90"
                        title="Add to Cart"
                    >
                        <Plus size={24} />
                    </button>
                    <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="w-14 h-14 bg-white text-gray-900 border border-gray-100 rounded-2xl flex items-center justify-center shadow-2xl hover:border-sky-500 hover:text-sky-600 transition-all active:scale-90"
                        title="View Details"
                    >
                        <Eye size={24} />
                    </button>
                </div>
            </div>

            {/* Simple Info */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${style.text}`}>
                        {product.brand}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-full">
                        <div className="w-1 h-1 rounded-full bg-green-500"></div>
                        <span className="text-[8px] font-bold text-green-600 uppercase">In Stock</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-tight group-hover:text-sky-600 transition-colors">
                    {product.name}
                </h3>

                <p className="text-[11px] text-gray-400 font-medium line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Footer Link */}
                <div className="pt-6 flex items-center justify-between border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">View Shop Entry</span>
                    <ArrowUpRight size={16} className="text-sky-500" />
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
