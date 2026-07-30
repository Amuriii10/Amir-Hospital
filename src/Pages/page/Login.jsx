import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Activity, MapPin, Phone, Mail, User, Lock, ChevronRight, ArrowLeft, Search, Menu, PhoneCall } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); 
  const [authMethod, setAuthMethod] = useState('email');
  const [timer, setTimer] = useState(59);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ወደ ሎግኢን ካርዱ በቀጥታ ለመውሰድ የሚያገለግል ሪፈረንስ (Ref)
  const loginCardRef = useRef(null);

  const HOSPITAL_NAME = "Amir";
  const HOSPITAL_SUFFIX = "Health";

  // Home ወደ "/" እንዲሄድ ተደርጓል
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/Services" },
    { name: "Books", link: "#doctors" },
    { name: "Contact", link: "/Contact" }
  ];

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    fullName: '',
    dob: '',
    gender: '',
    otp: ['', '', '', '', '', '']
  });

  const from = location.state?.from || '/';

  // Book Appointment ሲነካ ወደ ካርዱ Smooth ስክሮል እንዲያደርግ
  const scrollToLoginCard = () => {
    if (loginCardRef.current) {
      loginCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let interval;
    if (!isLogin && step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer, isLogin]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    handleInputChange('otp', newOtp);

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleAuthAction = (e) => {
    e.preventDefault();
    if (isLogin) {
      toast.success("Welcome Back!");
      navigate(from, { replace: true });
    } else {
      if (step === 1) {
        setStep(2);
        setTimer(59);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        toast.success("Account Created Successfully!");
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* 1. DYNAMIC NAVIGATION BAR (border-b ሙሉ በሙሉ ጠፍቷል) */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-slate-100 backdrop-blur-xl py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <div onClick={() => navigate('/')} className="flex items-center gap-2 font-black text-2xl tracking-tighter cursor-pointer group">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <Activity size={22}/>
            </div>
            <span className="text-blue-900">{HOSPITAL_NAME}<span className="text-blue-600">{HOSPITAL_SUFFIX}</span></span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.link === "/") {
                      navigate("/"); // ወደ App.jsx ዋና ገጽ ይመልሰዋል
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      // ለሌሎቹ አይዲዎች በዋናው ገጽ ላይ እንዲፈልግ
                      if (window.location.pathname !== '/') {
                        navigate('/', { state: { scrollTo: item.link } });
                      } else {
                        document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="hover:text-blue-500 transition-colors text-left py-4 bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="h-8 w-[1px] bg-slate-800"></div>

            <div className="flex items-center gap-6">
              
              {/* User Icon */}

              {/* Main CTA */}
              <button 
                onClick={scrollToLoginCard}
                className="bg-blue-600 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all border-none cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white hover:bg-slate-900 rounded-lg bg-transparent border-none cursor-pointer"><Menu size={28}/></button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-900 px-4 pt-1 pb-3 space-y-1 shadow-inner">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { 
                  setMobileMenuOpen(false);
                  if (item.link === "/") {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    if (window.location.pathname !== '/') {
                      navigate('/', { state: { scrollTo: item.link } });
                    } else {
                      document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-900 bg-transparent border-none cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-900 space-y-2">
              <button onClick={scrollToLoginCard} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold border-none cursor-pointer">
                Book Appointment
              </button>
              <button onClick={() => { setMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold border-none cursor-pointer">
                <PhoneCall className="w-3 h-3" /> Emergency Call
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. MAIN SPLIT SECTION */}
      <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-2 pt-24 min-h-[calc(100vh-80px)]">
        
        {/* የጀርባው የሆስፒታል ፎቶ */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000" 
            className="w-full h-full object-cover object-center" 
            alt="Memorial Hospital Background" 
          />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]" />
        </div>

        {/* በግራ በኩል የሚቀመጥ ጽሑፍ */}
        <div className="relative z-10 flex items-center p-8 sm:p-12 lg:pl-24">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md text-blue-300 text-xs font-bold uppercase tracking-wider">
              Memorial Excellence
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Your Health, <br />Our Absolute Priority.
            </h1>
            <p className="text-slate-300 text-xs font-medium leading-relaxed max-w-sm">
              Experience healthcare re-imagined. Combining state-of-the-art medical technology with high-end luxury hospitality.
            </p>
          </div>
        </div>

        {/* በቀኝ በኩል የሚቀመጥ የካርድ ክፍል (framer-motion ሙሉ በሙሉ ወጥቷል) */}
        <div ref={loginCardRef} className="relative z-10 flex items-center justify-center lg:justify-end p-6 sm:p-12 lg:pr-24 scroll-mt-28">
          <div className="w-full max-w-[420px] bg-white/85 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 shadow-[0_40px_90px_-15px_rgba(0,0,0,0.6)] text-slate-900 border border-white/40 flex flex-col justify-between min-h-[680px]">
            <div>
              {/* Card Logo */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md shadow-blue-600/20">
                  <Activity size={20} />
                </div>
                <span className="font-black tracking-tighter text-xl uppercase italic text-slate-900">
                  Amir<span className="text-blue-600">Health</span>
                </span>
              </div>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight text-blue-600">
                  {isLogin ? 'Welcome Back' : step === 1 ? 'Create Account' : step === 2 ? 'Security Code' : 'Personal Details'}
                </h2>
                <p className="text-slate-500 text-[11px] font-bold mt-1 uppercase tracking-wider">
                  {isLogin ? 'Sign in to access your dashboard' : 'Join our luxury healthcare network'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleAuthAction} className="space-y-5">
                {isLogin ? (
                  /* --- SIGN IN FORM --- */
                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input type="email" placeholder="Email Address" required className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white/60 border border-slate-300/60 focus:border-blue-600 focus:bg-white outline-none text-xs font-bold transition-all text-slate-900 placeholder-slate-500" />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input type="password" placeholder="Password" required className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white/60 border border-slate-300/60 focus:border-blue-600 focus:bg-white outline-none text-xs font-bold transition-all text-slate-900 placeholder-slate-500" />
                    </div>
                    <div className="text-right">
                      <button type="button" className="text-[11px] font-black text-blue-600 hover:underline bg-transparent border-none cursor-pointer uppercase tracking-wider">Forgot Password?</button>
                    </div>
                  </div>
                ) : (
                  /* --- REGISTER FORM (STEPS) --- */
                  <div className="space-y-4">
                    
                    {/* STEP 1 */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="flex bg-slate-900/10 p-1 rounded-xl border border-slate-300/40 font-bold text-[9px] mb-1 backdrop-blur-sm">
                          <button type="button" onClick={() => setAuthMethod('email')} className={`flex-1 py-2 rounded-lg transition-all font-black uppercase tracking-wider ${authMethod === 'email' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>EMAIL</button>
                          <button type="button" onClick={() => setAuthMethod('phone')} className={`flex-1 py-2 rounded-lg transition-all font-black uppercase tracking-wider ${authMethod === 'phone' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}>PHONE</button>
                        </div>
                        
                        <input 
                          type={authMethod === 'email' ? 'email' : 'tel'} 
                          placeholder={authMethod === 'email' ? 'Enter Email Address' : 'Enter Phone Number'} 
                          value={formData.emailOrPhone}
                          onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
                          required 
                          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-slate-300/60 focus:border-blue-600 focus:bg-white outline-none text-xs font-bold transition-all text-slate-900 placeholder-slate-500" 
                        />
                        <input 
                          type="password" 
                          placeholder="Create Password" 
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required 
                          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-slate-300/60 focus:border-blue-600 focus:bg-white outline-none text-xs font-bold transition-all text-slate-900 placeholder-slate-500" 
                        />
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <button type="button" onClick={() => setStep(1)} className="p-1 hover:bg-white/50 rounded-lg text-slate-600 bg-transparent border-none cursor-pointer"><ArrowLeft size={14}/></button>
                          <span className="text-[10px] font-black uppercase tracking-wider">Verification Code</span>
                        </div>
                        <div className="flex justify-between gap-1.5">
                          {formData.otp.map((digit, i) => (
                            <input 
                              key={i} 
                              id={`otp-${i}`}
                              type="text" 
                              maxLength="1" 
                              value={digit}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              className="w-10 h-12 bg-white/60 border border-slate-300/60 rounded-xl text-center text-base font-black outline-none focus:border-blue-600 focus:bg-white text-slate-900" 
                            />
                          ))}
                        </div>
                        <p className="text-center text-[10px] font-bold text-blue-600 tracking-wider uppercase">Resend Code in {timer}s</p>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                          <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            required 
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white/60 border border-slate-300/60 focus:border-blue-600 focus:bg-white outline-none text-xs font-bold transition-all text-slate-900 placeholder-slate-500" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            type="date" 
                            value={formData.dob}
                            onChange={(e) => handleInputChange('dob', e.target.value)}
                            required 
                            className="w-full px-3 py-3.5 rounded-xl bg-white/60 border border-slate-300/60 focus:border-blue-600 text-[11px] font-bold text-slate-900" 
                          />
                          <select 
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            required 
                            className="w-full px-3 py-3.5 rounded-xl bg-white/60 border border-slate-300/60 focus:border-blue-600 text-xs font-bold text-slate-900"
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-5 rounded-xl font-black text-xs transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest active:scale-[0.98] flex items-center justify-center gap-2 border-none cursor-pointer mt-4">
                  {isLogin ? 'Sign In' : step === 1 ? 'Continue' : step === 2 ? 'Verify Code' : 'Complete Registration'}
                  <ChevronRight size={14} />
                </button>
              </form>
            </div>

            {/* Switch Toggle */}
            <div className="mt-6 text-center pt-4 border-t border-slate-900/10">
              <button onClick={() => { setIsLogin(!isLogin); setStep(1); }} className="text-[10px] font-black tracking-wider text-slate-500 hover:text-slate-700 transition-colors uppercase bg-transparent border-none cursor-pointer">
                {isLogin ? "Don't have an account? " : "Already a member? "} 
                <span className="text-blue-600 ml-1 underline underline-offset-4 font-black">{isLogin ? 'Register Here' : 'Login'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FULL LUXURY FOOTER */}
      <footer className="relative z-20 bg-slate-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20">
            
            {/* Column 1: Brand Info */}
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
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-400 transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-pink-600 transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="text-slate-400 space-y-4 text-sm font-medium">
                <li className="hover:text-blue-500 transition cursor-pointer">About Our Clinic</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Specialist Doctors</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Medical Packages</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Latest News</li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Our Services</h4>
              <ul className="text-slate-400 space-y-4 text-sm font-medium">
                <li className="hover:text-blue-500 transition cursor-pointer">Cardiology Unit</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Diagnostic Lab</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Dental Care</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Emergency 24/7</li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Contact Us</h4>
              <div className="space-y-6 text-slate-400 text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><MapPin size={18}/></div>
                  <span>Bole Medhanialem, <br />Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><Phone size={18}/></div>
                  <span>+251 911 00 00 00</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><Mail size={18}/></div>
                  <span>info@amirhealth.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              © 2026 AMIR HEALTH. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;