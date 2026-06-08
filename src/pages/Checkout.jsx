import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Mail, User, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import PaymentModal from '../components/PaymentModal';
import { saveOrder, sendOrderEmail } from '../utils/emailService';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paidAmount, setPaidAmount] = useState(0);
    const [orderRef, setOrderRef] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
        if (!formData.firstName) newErrors.firstName = 'First name required';
        if (!formData.address) newErrors.address = 'Address required';
        if (!formData.phone) newErrors.phone = 'Phone required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProceedToPayment = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsPaymentModalOpen(true);
        }
    };

    const handlePaymentSuccess = () => {
        const refCode = 'ZM-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const finalTotal = getCartTotal();

        const orderData = {
            id: refCode,
            date: new Date().toISOString(),
            customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city
            },
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            total: finalTotal,
            status: 'Pending'
        };

        saveOrder(orderData);
        sendOrderEmail(orderData);

        setOrderRef(refCode);
        setPaidAmount(finalTotal);
        setIsPaymentModalOpen(false);
        setIsSuccess(true);
        clearCart();
    };

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="pt-48 pb-24 text-center">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8">Cart is empty</h2>
                <Link to="/" className="btn-primary">Return to Store</Link>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="pt-48 pb-24 min-h-screen bg-white">
                <div className="container max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-50 rounded-[48px] p-16 border border-gray-100 shadow-xl"
                    >
                        <div className="w-24 h-24 bg-sky-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg shadow-sky-500/20">
                            <CheckCircle2 size={48} />
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-6 uppercase italic">Order Secured</h1>
                        <p className="text-lg text-gray-400 font-bold mb-10 italic uppercase tracking-tight">
                            Your tech and sneaker upgrade is on the way. Check your mail for details.
                        </p>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 mb-10 inline-block w-full">
                            <div className="flex justify-between items-center px-4">
                                <div className="text-left">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Reference</span>
                                    <span className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">{orderRef}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Amount Paid</span>
                                    <span className="text-xl font-black text-sky-600 tracking-tighter italic">R{paidAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <Link
                            to="/"
                            className="block w-full py-8 bg-gray-900 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.4em] hover:bg-sky-600 transition-all active:scale-95 shadow-2xl shadow-gray-900/10"
                        >
                            Return to Store
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 bg-white min-h-screen">
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                total={getCartTotal()}
                onPaymentSuccess={handlePaymentSuccess}
            />

            <div className="container px-4 sm:px-10">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest mb-12 transition-all group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
                </button>

                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="flex-grow">
                        <div className="mb-12">
                            <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic mb-6">Checkout</h1>
                            <div className="flex items-center gap-4 py-4 px-6 bg-gray-50 border border-gray-100 rounded-2xl w-fit">
                                <ShieldCheck size={20} className="text-sky-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure AES-256 encrypted checkout</span>
                            </div>
                        </div>

                        <form onSubmit={handleProceedToPayment} className="space-y-12">
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-900 mb-8 flex items-center gap-3">
                                    <span className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-[10px]">01</span>
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full pl-14 pr-6 py-5 bg-gray-50 border ${errors.email ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full pl-14 pr-6 py-5 bg-gray-50 border ${errors.phone ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all`}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-900 mb-8 flex items-center gap-3">
                                    <span className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-[10px]">02</span>
                                    Shipping Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`w-full pl-14 pr-6 py-5 bg-gray-50 border ${errors.firstName ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all`}
                                            />
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Shipping Address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full pl-14 pr-6 py-5 bg-gray-50 border ${errors.address ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City / Area"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:bg-white focus:border-sky-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </section>

                            <button
                                type="submit"
                                className="w-full py-8 bg-sky-600 text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-xs transition-all hover:bg-gray-900 active:scale-95 shadow-2xl shadow-sky-500/10 flex items-center justify-center gap-4"
                            >
                                Proceed to Payment <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>

                    <div className="lg:w-[450px]">
                        <div className="bg-gray-50 rounded-[56px] p-12 sticky top-32 border border-gray-100">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-10 text-gray-900">Your Assets</h2>
                            <div className="space-y-6 mb-10 border-b border-gray-200 pb-10">
                                {cart.map((item) => (
                                    <div key={item.cartId} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-white rounded-2xl p-2 border border-gray-100 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-[10px] font-black uppercase tracking-tighter text-gray-900 leading-tight">{item.name}</h4>
                                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-[10px] font-black text-gray-900 italic">
                                            R{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-center text-gray-400 uppercase tracking-widest text-[10px] font-black">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 italic">R{getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400 uppercase tracking-widest text-[10px] font-black">
                                    <span>Shipping</span>
                                    <span className="text-sky-600">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-900 pt-4 border-t border-gray-200">
                                    <span className="text-xs font-black uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-black italic tracking-tighter">R{getCartTotal().toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
