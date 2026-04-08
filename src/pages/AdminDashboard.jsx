import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    TrendingUp,
    Plus,
    Search,
    Edit2,
    Trash2,
    MoreVertical,
    ExternalLink,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    X,
    Check
} from 'lucide-react';
import { products as initialProducts } from '../data/products';

const AdminDashboard = () => {
    const [products, setProducts] = useState(initialProducts);
    const [activeTab, setActiveTab] = useState('inventory');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const stats = [
        { label: 'Total Revenue', value: 'R142,499', icon: TrendingUp, change: '+12.5%', isPositive: true },
        { label: 'Total Products', value: products.length, icon: Package, change: '+2', isPositive: true },
        { label: 'Total Orders', value: '48', icon: ShoppingBag, change: '-3.2%', isPositive: false },
        { label: 'Total Users', value: '1,240', icon: Users, change: '+18.4%', isPositive: true }
    ];

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-24 min-h-screen bg-gray-50/50 flex">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-gray-100 hidden lg:flex flex-col p-8 sticky top-24 h-[calc(100vh-6rem)]">
                <div className="space-y-2 mb-12">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 px-4">Management</h2>
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Package size={20} /> Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <ShoppingBag size={20} /> Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('customers')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'customers' ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Users size={20} /> Customers
                    </button>
                </div>

                <div className="mt-auto bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-xl font-bold tracking-tight mb-2 relative z-10">Need Help?</h3>
                    <p className="text-xs text-gray-400 mb-6 relative z-10">Access our exclusive admin support documentation.</p>
                    <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all">Doc Library</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500 mb-2">
                            <Check size={12} /> System Status: Online
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">Control <span className="text-sky-600">Center</span></h1>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-sky-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                    >
                        <Plus size={20} /> Add New Product
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-sky-50 group-hover:text-sky-600 transition-all">
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {stat.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</h3>
                            <div className="text-3xl font-black text-gray-900 tracking-tighter italic">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Inventory Table Section */}
                <section className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-gray-900">Product Inventory</h2>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search inventory..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all"
                                />
                            </div>
                            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl border border-gray-100 hover:text-sky-500 hover:bg-sky-50 transition-all">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Price</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="group hover:bg-gray-50/30 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gray-50 rounded-2xl p-2 shrink-0 border border-gray-100">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors uppercase italic tracking-tight">{product.name}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="font-black text-gray-900 italic">R{product.price.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Live</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button className="p-3 hover:bg-white hover:text-sky-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-3 hover:bg-white hover:text-red-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <button className="p-3 hover:bg-white text-gray-300 hover:text-gray-900 rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* Simple Add Modal Placeholder */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900">Add Product</h2>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Register new asset into inventory</p>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Asset Name</label>
                                        <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all" placeholder="iPhone 14 Pro" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (ZAR)</label>
                                        <input type="number" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all" placeholder="18499" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                                    <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all appearance-none">
                                        <option>Phones</option>
                                        <option>Sneakers</option>
                                        <option>Audio</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="w-full py-6 bg-sky-600 text-white rounded-[24px] font-black uppercase tracking-[0.4em] text-xs hover:bg-gray-900 transition-all shadow-2xl shadow-sky-500/20 mt-6"
                                >
                                    Confirm Asset Entry
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
