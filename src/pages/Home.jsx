import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smartphone, Laptop, Footprints, Shield, Truck, RefreshCw, Headphones, ChevronRight, ChevronLeft, Play, Star, Search, ShieldCheck, HelpCircle, Quote, Plus, Minus, MoveRight, ChevronDown } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
    const featuredProducts = products.filter(p => p.featured).slice(0, 4);
    const arrivals = products.slice(0, 8);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = React.useState(categoryParam || 'all');
    const [searchQuery, setSearchQuery] = React.useState('');
    const storeRef = React.useRef(null);

    React.useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
            setTimeout(() => {
                storeRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
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

    const categoryTabs = [
        { id: 'all', label: 'All Products', color: 'sky' },
        { id: 'phones', label: 'iPhones', color: 'sky' },
        { id: 'sneakers', label: 'Sneakers', color: 'orange' }
    ];

    const scrollToStore = () => {
        storeRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative bg-white">
            {/* Simple Premium Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-20">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Content Side */}
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8">
                                    <span className="text-sky-600 text-[10px] font-bold uppercase tracking-widest">New Arrivals Now In Stock</span>
                                </div>

                                <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-8">
                                    The best <span className="text-sky-500">iPhones</span> <br />
                                    in South Africa.
                                </h1>

                                <p className="text-lg text-gray-500 font-medium max-w-md leading-relaxed mb-12">
                                    Explore our curated selection of iPhones from model 7 to 14. Ready for immediate delivery.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={scrollToStore} className="px-10 py-5 bg-sky-600 text-white rounded-2xl font-bold transition-all hover:bg-sky-700 active:scale-95 shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2">
                                        Shop Now <ArrowRight size={20} />
                                    </button>
                                    <button className="px-10 py-5 border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center">
                                        Discover ZM Store
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Visual Side */}
                        <div className="w-full lg:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                style={{ y: y1 }}
                                className="relative z-10"
                            >
                                <div className="relative aspect-square rounded-[48px] overflow-hidden shadow-2xl bg-gray-50/50 flex items-center justify-center p-12 group">
                                    <img
                                        src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1200"
                                        alt="Premium iPhone"
                                        className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-8 right-8 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-50">
                                        <ShieldCheck size={28} className="text-sky-500" />
                                    </div>
                                    <div className="absolute bottom-8 left-8 px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-xl">
                                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block mb-1">Authentic Gear</span>
                                        <p className="text-gray-900 font-bold text-sm">Verified Product Only</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Simple Gallery */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Latest Visuals</h2>
                        <p className="text-gray-500 font-medium">Our latest gear in high definition.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800",
                            "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800",
                            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
                            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                className="aspect-[3/4] rounded-[32px] overflow-hidden bg-gray-50 transition-all duration-500 hover:shadow-xl group"
                            >
                                <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery item" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Store Explorer */}
            <section id="store-explorer" ref={storeRef} className="py-24 bg-gray-50/50">
                <div className="container">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-8">All Products</h2>

                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group flex-1 w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for iPhone 11, 12, 13, 14..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all shadow-sm"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categoryTabs.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`px-6 py-4 rounded-xl text-xs font-bold transition-all ${activeCategory === cat.id
                                            ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20'
                                            : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="min-h-[400px]">
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-400 mb-8 font-medium">Try searching for something else.</p>
                                <button
                                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                                    className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Simple New Arrivals Scroller */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mb-16 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-none mb-4">New Arrivals</h2>
                        <p className="text-gray-500 font-medium">The latest additions to our store.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center text-gray-300 hover:text-sky-600 transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <button className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white hover:bg-sky-600 transition-all">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="pl-6 md:pl-20 overflow-x-auto scrollbar-hide pb-8">
                    <div className="flex gap-8">
                        {arrivals.map((product) => (
                            <div key={product.id} className="min-w-[300px] md:min-w-[400px]">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;