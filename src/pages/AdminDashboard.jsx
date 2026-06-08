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
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    X,
    Check,
    Settings,
    Mail,
    Key,
    Phone,
    MapPin,
    ChevronRight
} from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { getOrders, updateOrderStatus, deleteOrder, getSettings, saveSettings } from '../utils/emailService';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
    const { isSuperAdmin } = useAuth();
    const [products, setProducts] = useState(initialProducts);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Order states
    const [orders, setOrders] = useState(() => getOrders());
    const [statusFilter, setStatusFilter] = useState('All');

    // Settings state
    const [settings, setSettingsData] = useState(() => getSettings());

    const handleUpdateStatus = (id, newStatus) => {
        if (!isSuperAdmin && (newStatus === 'Completed' || newStatus === 'Shipped')) {
            alert('Access Denied: Standard admins cannot set order status to Shipped or Completed.');
            return;
        }
        updateOrderStatus(id, newStatus);
        setOrders(getOrders());
    };

    const handleDeleteOrder = (id) => {
        if (!isSuperAdmin) {
            alert('Access Denied: Only Super Admins can delete orders from reference logs.');
            return;
        }
        if (window.confirm('Are you sure you want to remove this order from reference logs?')) {
            deleteOrder(id);
            setOrders(getOrders());
        }
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        if (!isSuperAdmin) {
            alert('Access Denied: Only Super Admins can save configurations.');
            return;
        }
        saveSettings(settings);
        alert('Settings saved successfully!');
    };

    const handleDeleteProduct = (id) => {
        if (!isSuperAdmin) {
            alert('Access Denied: Only Super Admins can delete products.');
            return;
        }
        if (window.confirm('Are you sure you want to remove this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    // Derived statistics
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const uniqueCustomerEmails = Object.keys(orders.reduce((acc, o) => {
        acc[o.customer.email.toLowerCase()] = true;
        return acc;
    }, {}));

    const stats = [
        { label: 'Total Revenue', value: `R${totalRevenue.toLocaleString()}`, icon: TrendingUp, change: totalRevenue > 0 ? '+100%' : '0%', isPositive: true },
        { label: 'Total Products', value: products.length, icon: Package, change: '+0%', isPositive: true },
        { label: 'Total Orders', value: orders.length, icon: ShoppingBag, change: orders.length > 0 ? '+100%' : '0%', isPositive: orders.length > 0 },
        { label: 'Total Customers', value: uniqueCustomerEmails.length, icon: Users, change: uniqueCustomerEmails.length > 0 ? '+100%' : '0%', isPositive: true }
    ];

    // Filter products
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesQuery =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `${order.customer.firstName} ${order.customer.lastName || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        return matchesQuery && matchesStatus;
    });

    // Unique customers aggregation
    const customerMap = {};
    orders.forEach(order => {
        const email = order.customer.email.toLowerCase();
        if (!customerMap[email]) {
            customerMap[email] = {
                name: `${order.customer.firstName} ${order.customer.lastName || ''}`,
                email: order.customer.email,
                phone: order.customer.phone,
                city: order.customer.city || 'N/A',
                orderCount: 0,
                totalSpend: 0
            };
        }
        customerMap[email].orderCount += 1;
        customerMap[email].totalSpend += order.total;
    });
    const uniqueCustomers = Object.values(customerMap).filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
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
                    {isSuperAdmin && (
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Settings size={20} /> Settings
                        </button>
                    )}
                </div>

                <div className="mt-auto bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-xl font-bold tracking-tight mb-2 relative z-10">Need Help?</h3>
                    <p className="text-xs text-gray-400 mb-6 relative z-10">Access our exclusive admin support documentation.</p>
                    {isSuperAdmin ? (
                        <button onClick={() => setActiveTab('settings')} className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all">Setup Web3Forms Key</button>
                    ) : (
                        <button className="w-full py-3 bg-white/10 text-white/50 rounded-xl font-bold text-xs uppercase tracking-widest cursor-not-allowed" disabled>Standard Admin Mode</button>
                    )}
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
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">
                            Control <span className="text-sky-600">{activeTab}</span>
                        </h1>
                    </div>
                    {activeTab === 'inventory' && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-sky-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                        >
                            <Plus size={20} /> Add New Product
                        </button>
                    )}
                </header>

                {/* Stats Grid - show on Overview, Inventory and Orders tabs */}
                {(activeTab === 'overview' || activeTab === 'inventory' || activeTab === 'orders') && (
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
                )}

                {/* TAB: OVERVIEW */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Dynamic Recent Orders */}
                        <div className="xl:col-span-2 bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black uppercase italic tracking-tighter text-gray-900">Recent Orders</h2>
                                <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-sky-600 hover:text-gray-900 flex items-center gap-1">
                                    View All <ChevronRight size={14} />
                                </button>
                            </div>

                            {orders.length === 0 ? (
                                <div className="py-12 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                                    No orders logged yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.slice(0, 5).map((order) => (
                                        <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-mono text-sm font-bold text-gray-900">{order.id}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${order.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                                        order.status === 'Shipped' ? 'bg-sky-50 text-sky-600' :
                                                            order.status === 'Processing' ? 'bg-purple-50 text-purple-600' :
                                                                'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.customer.firstName} {order.customer.lastName} • {new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right w-full sm:w-auto flex justify-between sm:block border-t sm:border-0 pt-2 sm:pt-0">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest sm:block mr-2 sm:mr-0">Value</span>
                                                <span className="font-black text-gray-900 italic">R{order.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Store Settings Quick Access */}
                        <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-black uppercase italic tracking-tighter text-gray-900 mb-6">Delivery Config</h2>
                                <div className="bg-sky-50/50 border border-sky-100 rounded-3xl p-6 mb-6">
                                    <h4 className="text-xs font-black text-sky-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Mail size={14} /> Web3Forms Status
                                    </h4>
                                    <p className="text-[10px] text-gray-500 font-bold leading-normal uppercase">
                                        {settings.web3formsKey ? "Live mode enabled. Online notifications will dispatch to owner email." : "Sandbox mode active. Custom Web3Forms key is required for live delivery."}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold leading-normal uppercase mb-6">
                                    Configure notifications so you receive email updates on every purchase made on your store.
                                </p>
                                <button onClick={() => setActiveTab('settings')} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-sky-600 transition-all flex items-center justify-center gap-2 animate-pulse">
                                    <Settings size={14} /> Settings Panel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: INVENTORY */}
                {activeTab === 'inventory' && (
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
                                                    <button type="button" className="p-3 hover:bg-white hover:text-sky-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="p-3 hover:bg-white hover:text-red-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* TAB: ORDERS */}
                {activeTab === 'orders' && (
                    <section className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
                        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <h2 className="text-xl font-black uppercase italic tracking-tighter text-gray-900">Orders Database</h2>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <div className="relative flex-1 md:w-80">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search order reference or client..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all toggle-search"
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all dropdown-clean select-status"
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div className="p-16 text-center text-gray-400 font-bold text-xs uppercase tracking-widest bg-white">
                                No matching orders found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client & Details</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Items</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Value</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 select-order-body">
                                        {filteredOrders.map((order) => (
                                            <tr key={order.id} className="group hover:bg-gray-50/30 transition-all">
                                                <td className="px-8 py-6 align-top">
                                                    <span className="font-mono font-black text-gray-900 block text-xs">{order.id}</span>
                                                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">
                                                        {new Date(order.date).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 align-top max-w-xs">
                                                    <h4 className="font-bold text-gray-900 uppercase italic tracking-tight">{order.customer.firstName} {order.customer.lastName}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{order.customer.email}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-2">{order.customer.phone}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-normal mt-2">{order.customer.address}, {order.customer.city}</p>
                                                </td>
                                                <td className="px-8 py-6 align-top">
                                                    <div className="space-y-1.5 max-w-sm">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="text-[10px] font-bold text-gray-600 uppercase tracking-tight flex items-center justify-between gap-10">
                                                                <span className="truncate">{item.name}</span>
                                                                <span className="text-gray-400 font-bold block shrink-0">Qty: {item.quantity}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 align-top text-center">
                                                    <span className="font-black text-sky-600 italic text-sm">R{order.total.toLocaleString()}</span>
                                                </td>
                                                <td className="px-8 py-6 align-top text-center">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:outline-none border border-transparent change-status-select ${order.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' :
                                                            order.status === 'Shipped' ? 'bg-sky-50 text-sky-600 border-sky-200' :
                                                                order.status === 'Processing' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                                                    'bg-amber-50 text-amber-600 border-amber-200'
                                                            }`}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </td>
                                                <td className="px-8 py-6 align-top text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                        className="p-3 bg-gray-50 text-gray-400 hover:text-red-650 rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-150 inline-block delete-order-btn"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {/* TAB: CUSTOMERS */}
                {activeTab === 'customers' && (
                    <section className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
                        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <h2 className="text-xl font-black uppercase italic tracking-tighter text-gray-900">Customer Base</h2>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search customer base..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all search-customers"
                                />
                            </div>
                        </div>

                        {uniqueCustomers.length === 0 ? (
                            <div className="p-16 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                                No clients logged.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Name</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Orders Placed</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Spend</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 customers-list-body">
                                        {uniqueCustomers.map((customer, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50/30 transition-all">
                                                <td className="px-8 py-6">
                                                    <h4 className="font-bold text-gray-905 uppercase italic tracking-tight">{customer.name}</h4>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none block">{customer.email}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1 block">{customer.phone}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[10px] text-gray-900 font-bold uppercase tracking-widest">{customer.city}</span>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-905 text-xs font-black rounded-lg">
                                                        {customer.orderCount}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="font-black text-sky-600 italic">R{customer.totalSpend.toLocaleString()}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {/* TAB: SETTINGS */}
                {activeTab === 'settings' && (
                    !isSuperAdmin ? (
                        <div className="bg-white rounded-[40px] border border-gray-100 p-16 text-center shadow-sm">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-red-500 mb-4">Access Denied</h2>
                            <p className="text-gray-450 font-bold uppercase tracking-widest text-xs">Only Super Admins can access and modify configuration settings.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                            <section className="xl:col-span-3 bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
                                <h2 className="text-xl font-black uppercase italic tracking-tighter text-gray-900 mb-8">System Configuration</h2>
                                <form onSubmit={handleSaveSettings} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Order Notification Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 focus-within:text-sky-500 transition-colors" size={18} />
                                            <input
                                                type="email"
                                                value={settings.notificationEmail}
                                                onChange={(e) => setSettingsData({ ...settings, notificationEmail: e.target.value })}
                                                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all font-sans"
                                                placeholder="support@zmstore.com"
                                                required
                                            />
                                        </div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-1">For interface logs reference.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Web3Forms Access Key</label>
                                        <div className="relative group">
                                            <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 focus-within:text-sky-500 transition-colors" size={18} />
                                            <input
                                                type="text"
                                                value={settings.web3formsKey}
                                                onChange={(e) => setSettingsData({ ...settings, web3formsKey: e.target.value })}
                                                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-mono focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all web3forms-key-input"
                                                placeholder="xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                            />
                                        </div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider ml-1">Required to trigger checkout emails directly to your mailbox.</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-6 bg-sky-600 text-white rounded-[24px] font-black uppercase tracking-[0.4em] text-xs hover:bg-gray-900 transition-all shadow-2xl shadow-sky-500/20 active:scale-95 save-settings-btn"
                                    >
                                        Save Configurations
                                    </button>
                                </form>
                            </section>

                            <div className="xl:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[40px] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-4 text-sky-400">Setup Notification Emails</h3>
                                    <p className="text-xs text-gray-300 font-semibold mb-6 leading-relaxed">
                                        ZM Store uses Web3Forms for clean client-side dynamic order email automation. To link your email:
                                    </p>
                                    <ol className="space-y-4 text-xs font-semibold text-gray-400">
                                        <li className="flex gap-3">
                                            <span className="w-5 h-5 bg-white/5 rounded-lg flex items-center justify-center text-[10px] text-sky-400 font-black shrink-0">1</span>
                                            <span>Navigate to <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-sky-400 underline hover:text-sky-300">web3forms.com</a>.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="w-5 h-5 bg-white/5 rounded-lg flex items-center justify-center text-[10px] text-sky-400 font-black shrink-0">2</span>
                                            <span>Enter the email address where you want to receive store receipts and submit.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="w-5 h-5 bg-white/5 rounded-lg flex items-center justify-center text-[10px] text-sky-400 font-black shrink-0">3</span>
                                            <span>Copy the access key you receive via email.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="w-5 h-5 bg-white/5 rounded-lg flex items-center justify-center text-[10px] text-sky-400 font-black shrink-0">4</span>
                                            <span>Paste the key in the settings input on the left and save.</span>
                                        </li>
                                    </ol>
                                </div>
                                <div className="pt-8 border-t border-white/5 text-[9px] uppercase tracking-wider text-gray-500 font-bold mt-8">
                                    Web3Forms is completely free & requires no sign-up registration.
                                </div>
                            </div>
                        </div>
                    )
                )}
            </main>

            {/* Product Add Modal */}
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

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                const newProduct = {
                                    id: products.length + 1,
                                    name: form.name.value,
                                    price: Number(form.price.value),
                                    category: form.category.value,
                                    brand: form.brand.value,
                                    image: form.image.value || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600'
                                };
                                setProducts([newProduct, ...products]);
                                setIsAddModalOpen(false);
                            }} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Asset Name</label>
                                        <input required name="name" type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all font-sans" placeholder="iPhone 14 Pro" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-405 ml-1">Price (ZAR)</label>
                                        <input required name="price" type="number" className="w-full px-6 py-4 bg-gray-55 border border-gray-101 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all font-sans" placeholder="18499" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-405 ml-1">Brand</label>
                                        <input required name="brand" type="text" className="w-full px-6 py-4 bg-gray-55 border border-gray-101 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all font-sans" placeholder="Apple" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-405 ml-1">Category</label>
                                        <select name="category" className="w-full px-6 py-4 bg-gray-55 border border-gray-101 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all appearance-none">
                                            <option value="Phones">Phones</option>
                                            <option value="Sneakers">Sneakers</option>
                                            <option value="Audio">Audio</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-405 ml-1">Image URL</label>
                                    <input name="image" type="text" className="w-full px-6 py-4 bg-gray-55 border border-gray-101 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all font-sans" placeholder="https://example.com/phone.jpg" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-6 bg-sky-600 text-white rounded-[24px] font-black uppercase tracking-[0.4em] text-xs hover:bg-gray-900 transition-all shadow-2xl shadow-sky-500/20 mt-6"
                                >
                                    Confirm Asset Entry
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
