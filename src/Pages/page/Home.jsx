import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
// ማስተካከያ፡ PhoneCall እና X አይኮኖችን እዚህ ጋር ጨምሬአቸዋለሁ
import { Activity, Menu, X, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isScrolled, HOSPITAL_NAME = "AMIR", HOSPITAL_SUFFIX = "HEALTH" }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // ማስተካከያ፦ ሊንኩን በትክክል ባለፈው ወደ ፈጠርከው '/page/Services' ቀይሬዋለሁ
  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Services', link: '/Services' },
    { name: 'LOgin', link: '/login' },
    { name: 'Contact', link: '/Contact' }
  ];

  const isAuthenticated = false;

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to continue", {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 'bold'
        },
      });
      navigate('/login', { state: { from: '/book-appointment' } });
    } else {
      navigate('/book-appointment');
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="flex items-center gap-2 font-black text-2xl tracking-tighter cursor-pointer group">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
            <Activity size={22}/>
          </div>
          <span className="text-slate-900">{HOSPITAL_NAME}<span className="text-blue-600">{HOSPITAL_SUFFIX}</span></span>
        </motion.div>

        {/* Desktop Navigation (Large Screens) */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-8 text-[11px] font-black text-slate-600 uppercase tracking-[0.2em]">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.link)}
                className="hover:text-blue-600 transition-colors text-left py-4"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-slate-200"></div>

          <div className="flex items-center gap-6">
            <motion.button 
              onClick={handleBookAppointment}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              Book Appointment
            </motion.button>
          </div>
        </div>

        {/* Hamburger / Close Button for Mobile */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Animated Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-3 shadow-xl absolute w-full left-0 top-full"
          >
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { navigate(item.link); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3.5 rounded-xl text-sm font-black text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
              >
                {item.name}
              </button>
            ))}
            
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button 
                onClick={() => { handleBookAppointment(); setMobileMenuOpen(false); }}
                className="w-full text-center py-4 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg"
              >
                Book Appointment
              </button>
              
              <button 
                onClick={() => { window.location.href = 'tel:+25191100000'; setMobileMenuOpen(false); }} 
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100"
              >
                <PhoneCall className="w-4 h-4" /> Emergency Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;