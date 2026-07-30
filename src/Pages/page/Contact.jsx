import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Activity, 
  Menu, 
  X, 
  PhoneCall, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Award,
  ShieldCheck,
  Building2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  UserCheck,
  Bot,
  MessageSquare,
  Sparkle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ==========================================
// 1. NAVBAR COMPONENT
// ==========================================
const Navbar = ({ isScrolled, HOSPITAL_NAME = "AMIR", HOSPITAL_SUFFIX = "HEALTH" }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Services', link: '/Services' },
    { name: 'Login', link: '/login' },
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
      isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          onClick={() => { navigate('/'); setMobileMenuOpen(false); }} 
          className="flex items-center gap-2 font-black text-2xl tracking-tighter cursor-pointer group"
        >
          <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
            <Activity size={22}/>
          </div>
          <span className="text-slate-900">{HOSPITAL_NAME}<span className="text-blue-600">{HOSPITAL_SUFFIX}</span></span>
        </motion.div>

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
              whileHover={{ y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              Book Appointment
            </motion.button>
          </div>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

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
                onClick={() => { window.location.href = 'tel:+251911000000'; setMobileMenuOpen(false); }} 
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

// ==========================================
// 2. FOOTER COMPONENT
// ==========================================
const Footer = () => {
  return (
    <footer className="relative z-20 bg-slate-950 text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
                <Activity size={22} strokeWidth={2.5} className="animate-pulse" />
              </div>
              AMIR<span className="text-blue-500">HEALTH</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The leading healthcare provider in Addis Ababa. Our ultimate goal is to deliver accessible and high-quality medical services to everyone.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="text-slate-400 space-y-4 text-sm font-medium">
              <li className="hover:text-blue-500 transition cursor-pointer">About Our Clinic</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Specialist Doctors</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Medical Packages</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Our Services</h4>
            <ul className="text-slate-400 space-y-4 text-sm font-medium">
              <li className="hover:text-blue-500 transition cursor-pointer">Cardiology Unit</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Diagnostic Lab</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Dental Care</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Contact Us</h4>
            <div className="space-y-6 text-slate-400 text-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><MapPin size={18}/></div>
                <span>Bisrate Gabriel, Nifas Silk-Lafto, <br />Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><Phone size={18}/></div>
                <span>+251 911 00 00 00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left border-t border-slate-900">
          <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em]">
            © 2026 AMIR HEALTH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// 3. MAIN CONTACT PAGE COMPONENT
// ==========================================
export default function Contact() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  
  // ቻቱ ሲከፈት መጀመሪያ አንድ ሰላምታ ብቻ ይይዛል
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! I am your AMIR HEALTH AI Assistant. How can I help you today?' }
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'General Administration',
    message: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);

  const pioneerPhotos = [
    {
      id: 1,
      name: "Dr. Charles Drew",
      subtitle: "Blood Bank Medical Pioneer",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 2,
      name: "Dr. Daniel Hale Williams",
      subtitle: "Cardiac Surgery Pioneer",
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 3,
      name: "Dr. Jane Cooke Wright",
      subtitle: "Oncology & Cancer Researcher",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  // AI መልስ ሲመልስ አንድ መልስ ብቻ እንዲሰጥ የተዘጋጀ ኤለመንት
  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    const userQuery = aiMessage;
    setAiMessage("");

    // ጥያቄውን መጨመር እና አንድ መልስ ብቻ መስጠት
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: userQuery },
      { sender: 'bot', text: `Thank you for asking about "${userQuery}". How else can I assist you with our medical services?` }
    ]);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error("Please accept the privacy policy.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Your message has been sent successfully!");
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: 'General Administration',
        message: '',
        consent: false
      });
    }, 1200);
  };

  const contactCards = [
    {
      icon: <Phone className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />,
      title: "Main Reception",
      desc: "For general inquiries & appointments",
      detail: "+251 911 00 00 00",
      action: "tel:+251911000000",
      badge: "Direct Line"
    },
    {
      icon: <Mail className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />,
      title: "Email Address",
      desc: "For secure document exchanges",
      detail: "clinical@amirhealth.com",
      action: "mailto:clinical@amirhealth.com",
      badge: "Encrypted"
    },
    {
      icon: <Building2 className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />,
      title: "Main Building",
      desc: "Outpatient Medical Center",
      detail: "Bisrate Gabriel, Addis Ababa",
      action: "#map",
      badge: "HQ Branch"
    },
    {
      icon: <Clock className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />,
      title: "Working Hours",
      desc: "Regular outpatient services",
      detail: "Mon - Sat: 08:00 AM - 08:00 PM",
      action: null,
      badge: "Hours"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      
      <Navbar isScrolled={true} />

      <main className="pt-32 relative z-10 flex-grow">

        {/* 1. EMERGENCY ALERT BANNER */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-900/5 border border-amber-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-amber-950 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/15 rounded-xl text-amber-700 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium leading-relaxed">
                <span className="font-extrabold uppercase tracking-wider text-amber-900 block md:inline md:mr-2">Emergency Notice:</span>
                For urgent life-threatening conditions, please contact our emergency response hotline directly.
              </div>
            </div>
            <a 
              href="tel:+251911000000" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0 transition-all shadow-md shadow-amber-600/20 flex items-center gap-2 hover:scale-105"
            >
              <PhoneCall size={14} /> Emergency: +251 911 00 00 00
            </a>
          </div>
        </section>

        {/* 2. HERO SECTION - AMIR HEALTH MEDICAL CENTER */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm">
                <ShieldCheck size={14} /> Certified Healthcare Center
              </div>

              <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                AMIR HEALTH Medical Center
              </h1>

              <p className="text-slate-600 text-xs lg:text-sm leading-relaxed max-w-xl font-medium">
                We provide high-quality medical, laboratory, specialist, and emergency care services with utmost commitment in Addis Ababa, Bisrate Gabriel.
              </p>

              <div className="pt-2 flex flex-wrap gap-6 border-t border-slate-100 text-xs text-slate-700 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600" /> Specialist Physicians
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600" /> Modern Diagnostic Tools
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-64 lg:h-72 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
                  alt="AMIR HEALTH Medical Center" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white text-xs font-bold flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  <Sparkles size={14} className="text-amber-400" /> AMIR HEALTH Main Facility
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            3. AI ASSISTANT SECTION (ለስላሳ ቀለም/SUBTLE COLORS)
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="bg-slate-100/90 border border-slate-200 text-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-7 h-7" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkle size={10} /> 24/7 Support
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Have Questions? Talk to AMIR Health AI</h3>
                <p className="text-xs text-slate-500 mt-0.5 max-w-xl font-medium">
                  Get quick assistance about medical services, booking guidelines, and specialist availability.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsAiOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0"
            >
              <MessageSquare size={16} /> Ask AI Assistant
            </button>
          </div>
        </section>

        {/* 4. CARDS SECTION */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => (
              <div 
                key={idx} 
                className="h-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors tracking-tight">{card.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-6">
                  {card.action ? (
                    <a href={card.action} className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      <span>{card.detail}</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-xs font-extrabold text-slate-800">{card.detail}</span>
                  )}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 5. PIONEERS SECTION */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-sm">
            <div className="mb-8 pb-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md mb-2 tracking-wider uppercase">
                  <Award size={14} /> Global Medical Icons
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                  Medical Pioneers
                </h2>
              </div>
              <div className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 self-start md:self-auto">
                <UserCheck size={14} className="text-blue-600" /> History & Legacy
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {pioneerPhotos.map((pioneer) => (
                <div key={pioneer.id} className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-80 sm:h-96 group">
                  <img 
                    src={pioneer.img} 
                    alt={pioneer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded backdrop-blur-md inline-block mb-1 uppercase">
                        Pioneer
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white">{pioneer.name}</h3>
                      <p className="text-xs text-blue-300 font-semibold mt-0.5">{pioneer.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. INQUIRY FORM SECTION */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Send Us a Message</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Feel free to reach out to us with any general inquiries or feedback.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+251 911 000000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Department</label>
                    <select 
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                    >
                      <option value="General Administration">General Administration</option>
                      <option value="Cardiology Department">Cardiology Department</option>
                      <option value="Laboratory Diagnostics">Laboratory Diagnostics</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Message Details *</label>
                  <textarea 
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <input 
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="consent" className="cursor-pointer text-[11px] leading-relaxed font-medium">
                    I agree to the processing of my information according to the clinic's privacy policy.
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  {loading ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl space-y-4 shadow-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 text-amber-400 p-2.5 rounded-xl border border-amber-500/30">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Direct Hotline</h3>
                    <p className="text-slate-400 text-xs">24/7 Available</p>
                  </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                  For immediate medical assistance and emergency support, call us directly at any hour.
                </p>
                <div className="pt-2">
                  <a 
                    href="tel:+251911000000" 
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Call Now (+251 911 00 00 00) <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. MAP SECTION */}
        <section id="map" className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Visit Our Location</h3>
                <p className="text-xs text-slate-500 font-medium">Bisrate Gabriel, Addis Ababa, Ethiopia</p>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Bisrate+Gabriel+Addis+Ababa" 
                target="_blank" 
                rel="noreferrer"
                className="bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <MapPin size={15} /> Open in Google Maps
              </a>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
              <iframe
                title="AMIR HEALTH - Bisrate Gabriel Location"
                src="https://maps.google.com/maps?q=Bisrate%20Gabriel%20Addis%20Ababa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

      </main>

      {/* AI ASSISTANT CHAT BOX (SUBTLE & SOFT DESIGN) */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-[120] w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col h-[450px] overflow-hidden"
          >
            {/* Soft Blue Header */}
            <div className="bg-slate-100 border-b border-slate-200 text-slate-800 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">AMIR Health AI Assistant</h4>
                  <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                    Online Assistant
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsAiOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Container */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
              {chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-xl max-w-[85%] font-medium leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleAiSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask a question..." 
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                className="flex-1 bg-slate-100 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-all"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}