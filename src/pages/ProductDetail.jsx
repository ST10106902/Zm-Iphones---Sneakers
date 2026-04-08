import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            window.scrollTo(0, 0);
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    if (!product) return null;

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);


    const handleAddToCart = () => {
        addToCart(product, quantity);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container">
                {/* Feedback Toast */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-32 right-10 z-[60] bg-gray-900 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10"
                        >
                            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                                <CheckCircle2 size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-sky-400">Inventory Updated</p>
                                <p className="text-sm font-bold tracking-tight">Added to your vault</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Simple Breadcrumbs */}
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">
                    <Link to="/" className="hover:text-sky-500 transition-colors">Store /</Link>
                    <span className="text-sky-500">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
                    {/* Product Gallery */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square bg-gray-50/50 rounded-[48px] overflow-hidden p-12 flex items-center justify-center border border-gray-100"
                        >
                            <motion.img
                                key={product.image}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                            {product.featured && (
                                <div className="absolute top-8 left-8 px-4 py-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl">
                                    Our Recommendation
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Product Information */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <span className="text-sky-500 text-xs font-bold uppercase tracking-widest mb-4 block">{product.brand}</span>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6 shadow-text">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                                <div className="flex text-sky-500 gap-0.5">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">High Rating 4.9/5</span>
                            </div>

                            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10">
                                {product.description}
                            </p>

                            <div className="mb-10 p-8 bg-gray-50 rounded-[32px] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Premium Listing</span>
                                <div className="text-6xl font-black text-gray-900 tracking-tighter italic">
                                    R{product.price.toLocaleString()}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mb-12">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-8 bg-white border border-gray-100 px-8 py-5 rounded-2xl w-full sm:w-fit shadow-sm">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-sky-500 transition-all active:scale-90"
                                        >
                                            <Minus size={22} />
                                        </button>
                                        <span className="text-2xl font-black text-gray-900 w-8 text-center italic">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-sky-500 transition-all active:scale-90"
                                        >
                                            <Plus size={22} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-grow bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white py-5 rounded-2xl font-black flex items-center justify-center gap-4 transition-all uppercase tracking-[0.2em] text-xs"
                                    >
                                        Add to Cart <ShoppingCart size={18} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full bg-sky-600 text-white hover:bg-sky-700 py-7 rounded-[24px] font-black flex items-center justify-center gap-4 transition-all shadow-2xl shadow-sky-500/20 uppercase tracking-[0.4em] text-xs"
                                >
                                    Instant Checkout <ArrowRight size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-10 bg-gray-50 rounded-[40px] border border-gray-100">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 leading-tight">Official<br />Warranty</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm">
                                        <Truck size={28} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 leading-tight">Fast Free<br />Delivery</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="pt-24 border-t border-gray-100">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-2 uppercase">You Might Also Like</h2>
                                <p className="text-gray-500 font-medium">Browse related products in this category.</p>
                            </div>
                            <Link to="/" className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sky-500 hover:text-sky-600 transition-all">
                                View All Products <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
