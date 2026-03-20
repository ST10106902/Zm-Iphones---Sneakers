import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    // Dynamic background colors for the image container based on brand/category for premium feel
    const getBgColor = () => {
        if (product.category === 'iphone') return 'bg-[#F9F9FB]';
        if (product.category === 'laptop') return 'bg-[#F2F2F2]';
        if (product.category === 'sneakers') return 'bg-[#F5F5F7]';
        return 'bg-slate-50';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full group bg-white rounded-[40px] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100"
        >
            <div className={`relative aspect-[4/5] ${getBgColor()} p-10 flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-amber-500/5`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                />

                {/* Featured Badge */}
                {product.featured && (
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                        Featured
                    </div>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs shadow-2xl hover:bg-black hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0 duration-500 uppercase tracking-widest">
                        <Eye size={18} /> View
                    </button>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-4 bg-amber-500 text-black rounded-2xl shadow-2xl hover:bg-black hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0 duration-500 delay-75"
                    >
                        <ShoppingCart size={22} />
                    </button>
                </div>
            </div>

            <div className="p-8 flex flex-col items-start text-left bg-white">
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">{product.brand || 'Premium'}</span>
                <h3 className="text-xl md:text-2xl font-black text-black mb-2 line-clamp-1 italic tracking-tighter uppercase">
                    {product.name}
                </h3>
                <p className="text-2xl font-black text-black/90 tracking-tighter italic">${product.price}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
