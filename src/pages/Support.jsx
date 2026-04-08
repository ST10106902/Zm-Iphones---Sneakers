import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Phone, MapPin, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

const Support = () => {
    const { type } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const content = {
        contact: {
            title: 'Contact <br /><span className="text-sky-600">Us</span>',
            titleText: 'Contact Us',
            subtitle: 'We are here to help with any questions or support you need.',
            details: [
                { icon: Mail, label: 'Email', value: 'support@zmstore.com' },
                { icon: Phone, label: 'Call Us', value: '+27 (0) 800 ZM-STORE' }
            ]
        },
        shipping: {
            title: 'Shipping <br /><span className="text-sky-600">Information</span>',
            titleText: 'Shipping Info',
            subtitle: 'Fast, secure, and reliable delivery across South Africa.',
            details: [
                { icon: Truck, label: 'Standard Delivery', value: '3-5 Working Days (Free)' },
                { icon: Truck, label: 'Express Delivery', value: '1-2 Working Days (R150)' },
                { icon: ShieldCheck, label: 'Safe Delivery', value: 'Full Insurance Included' }
            ]
        },
        returns: {
            title: 'Returns <br /><span className="text-sky-600">Policy</span>',
            titleText: 'Returns Policy',
            subtitle: 'Easy 30-day returns for a worry-free shopping experience.',
            details: [
                { icon: RotateCcw, label: 'Return Label', value: '30-Day Period' },
                { icon: ShieldCheck, label: 'Condition', value: 'Original Packaging Only' },
                { icon: Truck, label: 'Pick Up', value: 'Free Return Collection' }
            ]
        }
    };

    const section = content[type] || content.contact;

    return (
        <div className="pt-48 pb-32 bg-white min-h-screen">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">
                        <Link to="/" className="hover:text-sky-500 transition-colors">Home /</Link>
                        <span className="text-sky-500">{section.titleText}</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-24"
                    >
                        <h1
                            className="text-6xl md:text-[8rem] font-bold text-gray-900 tracking-tighter uppercase mb-10 leading-[0.75]"
                            dangerouslySetInnerHTML={{ __html: section.title }}
                        />
                        <p className="text-2xl text-gray-500 font-medium max-w-2xl leading-relaxed">{section.subtitle}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {section.details.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50/50 p-12 rounded-[56px] border border-gray-100 flex flex-col items-center text-center group hover:border-sky-500 hover:bg-white hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-700"
                            >
                                <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center text-sky-500 mb-10 shadow-xl border border-gray-100 group-hover:bg-sky-500 group-hover:text-white transition-all duration-700">
                                    <item.icon size={28} />
                                </div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 leading-none">{item.label}</h4>
                                <p className="text-xl font-bold text-gray-900 tracking-tight uppercase leading-tight">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Simple CTA Block */}
                    <div className="mt-40 p-16 md:p-24 bg-gray-900 rounded-[64px] relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            <span className="text-sky-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-10 block">Support Team</span>
                            <h3 className="text-4xl md:text-6xl font-bold text-white mb-10 uppercase tracking-tighter leading-none">Need more help?</h3>
                            <p className="text-gray-400 font-medium text-xl leading-relaxed max-w-3xl mx-auto mb-16">
                                Our team is available from 8 AM to 5 PM, Monday to Friday.
                                We aim to respond to all inquiries within 24 hours.
                            </p>
                            <button className="px-16 py-8 bg-sky-600 text-white rounded-[32px] font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-gray-900 transition-all shadow-2xl active:scale-95">
                                Send a Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
