import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CreditCard, ShieldCheck, CheckCircle2, X, AlertCircle } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, total, onPaymentSuccess }) => {
    const [step, setStep] = useState('form'); // form, processing, success
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Basic formatting for card number
        if (name === 'cardNumber') {
            const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
            setFormData({ ...formData, [name]: formatted });
        } else if (name === 'expiry') {
            const formatted = value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim().slice(0, 5);
            if (formatted.endsWith('/')) {
                setFormData({ ...formData, [name]: formatted.slice(0, -1) });
            } else {
                setFormData({ ...formData, [name]: formatted });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Invalid card number';
        if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'Use MM/YY';
        if (formData.cvc.length < 3) newErrors.cvc = 'Invalid CVC';
        if (!formData.name) newErrors.name = 'Cardholder name required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setStep('processing');
            setTimeout(() => {
                setStep('success');
                setTimeout(() => {
                    onPaymentSuccess();
                }, 2000);
            }, 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100"
                >
                    {step === 'form' && (
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-sky-500 uppercase tracking-widest mb-1">
                                        <Lock size={10} /> Secure Checkout
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Payment Method</h3>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="bg-gray-900 rounded-3xl p-6 mb-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-500/30 transition-all"></div>
                                <div className="flex justify-between items-start mb-8">
                                    <CreditCard size={32} className="text-sky-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">ZM Secure Card</span>
                                </div>
                                <div className="text-xl font-mono tracking-[0.2em] mb-8">
                                    {formData.cardNumber || '**** **** **** ****'}
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Card Holder</div>
                                        <div className="text-xs font-bold uppercase tracking-widest">{formData.name || 'Your Name'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">Expires</div>
                                        <div className="text-xs font-bold tracking-widest">{formData.expiry || 'MM/YY'}</div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="0000 0000 0000 0000"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        className={`w-full px-6 py-4 bg-gray-50 border ${errors.cardNumber ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all`}
                                    />
                                    {errors.cardNumber && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.cardNumber}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={formData.expiry}
                                            onChange={handleInputChange}
                                            className={`w-full px-6 py-4 bg-gray-50 border ${errors.expiry ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all`}
                                        />
                                        {errors.expiry && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.expiry}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">CVC</label>
                                        <input
                                            type="text"
                                            name="cvc"
                                            placeholder="***"
                                            maxLength="3"
                                            value={formData.cvc}
                                            onChange={handleInputChange}
                                            className={`w-full px-6 py-4 bg-gray-50 border ${errors.cvc ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all`}
                                        />
                                        {errors.cvc && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.cvc}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Cardholder Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name as on card"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-6 py-4 bg-gray-50 border ${errors.name ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 transition-all`}
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-6 bg-sky-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-gray-900 active:scale-95 shadow-xl shadow-sky-500/10 mt-4"
                                >
                                    Pay R{total.toLocaleString()} Now
                                </button>

                                <div className="flex items-center justify-center gap-2 opacity-40">
                                    <ShieldCheck size={12} className="text-gray-900" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-900">Encrypted 256-bit Payment</span>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="py-32 px-10 text-center">
                            <div className="relative w-24 h-24 mx-auto mb-10">
                                <div className="absolute inset-0 border-4 border-sky-100 rounded-3xl"></div>
                                <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-3xl animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Lock size={32} className="text-sky-500" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-4">Securing Assets...</h3>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Do not close this window</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="py-24 px-10 text-center bg-gray-900 text-white">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-24 h-24 bg-sky-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-sky-500/40"
                            >
                                <CheckCircle2 size={48} className="text-white" />
                            </motion.div>
                            <h3 className="text-4xl font-black tracking-tighter uppercase italic mb-6">Payment Success</h3>
                            <p className="text-sky-400 font-black text-xs uppercase tracking-[0.3em] mb-10">Verification Complete</p>
                            <div className="inline-block px-8 py-4 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Auth Code</span>
                                <span className="text-xl font-black italic tracking-tighter">ZM-{Math.floor(100000 + Math.random() * 900000)}</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PaymentModal;
