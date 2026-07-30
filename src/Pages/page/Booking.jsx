import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // ይ
import { 
  Search, 
  User, 
  Calendar, 
  Phone, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Activity, 
  MapPin,
  ArrowLeft,
  CreditCard,
  ChevronRight,
  ShieldAlert,
  Clock,
  Sparkles,
  QrCode,
  HeartPulse,
  Mail,
  Star,
  Bookmark, // በልብ ምትክ Bookmark አስገብተናል
  Menu
} from 'lucide-react';
// const navigate = useNavigate();
// const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // ይህ ተግባር መኖሩን አረጋግጥ (ስህተቱን የሚያጠፋው ይህ ነው)
// const handleBookAppointment = (e) => {
//   if (e && e.preventDefault) e.preventDefault();
//   navigate('/book-appointment');
// };

const DOCTORS_DATA = [
  {
    id: 1,
    name: "Dr. Selamawit Hagos",
    specialty: "Cardiology",
    hospital: "Amin General Hospital",
    experience: "12 years",
    rating: "4.9",
    reviews: "142",
    image: "https://images.unsplash.com/photo-1685688739798-bce206ab6b42?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fee: "500 ETB",
    bio: "Senior Cardiologist specializing in preventive cardiology, heart failure management, and non-invasive cardiac imaging."
  },
  {
    id: 2,
    name: "Dr. Dawit Yeshitela",
    specialty: "Neurology",
    hospital: "Amin General Hospital",
    experience: "15 years",
    rating: "4.8",
    reviews: "115",
    image: "https://media.istockphoto.com/id/1387071428/photo/young-male-physician-looking-at-camera.jpg?s=2048x2048&w=is&k=20&c=b7dH7l97iuIC9OFNcqIFRK8A1tZDXESBoUwujDJ84Qo=",
    fee: "600 ETB",
    bio: "Expert Neurologist focusing on stroke rehabilitation, epilepsy management, chronic migraines, and neuromuscular disorders."
  },
  {
    id: 3,
    name: "Dr. Kidist Tilahun",
    specialty: "Pediatrics",
    hospital: "Amin General Hospital",
    experience: "8 years",
    rating: "4.9",
    reviews: "98",
    image: "https://media.istockphoto.com/id/1346040732/photo/portrait-of-a-female-doctor.jpg?s=2048x2048&w=is&k=20&c=pETzlEIJn61zChfHrZuVyT80xGGc8clPLhfXrwNInk8=",
    fee: "400 ETB",
    bio: "Dedicated Pediatrician passionate about newborn development, childhood immunizations, and pediatric asthma care."
  },
  {
    id: 4,
    name: "Dr. Yohannes Bereket",
    specialty: "Gynecology",
    hospital: "Amin General Hospital",
    experience: "14 years",
    rating: "4.7",
    reviews: "130",
    image: "https://media.istockphoto.com/id/2151993114/photo/doctor-practitioner-at-hospital-confident-practitioner-doctor-standing-in-medical-office.jpg?s=2048x2048&w=is&k=20&c=DHXa7S9QBlic5a0CNhOTE3NBD0XIUkgiw8i_VJLbcNY=",
    fee: "550 ETB",
    bio: "Compassionate Gynecologist specialized in prenatal care, high-risk pregnancy management, and minimally invasive surgeries."
  },
  {
    id: 5,
    name: "Dr. Meron Getachew",
    specialty: "Dermatology",
    hospital: "Amin General Hospital",
    experience: "10 years",
    rating: "4.8",
    reviews: "84",
    image: "https://media.istockphoto.com/id/923194006/photo/cute-smiling-woman-in-white-medical-gown-stands-against-a-gray-wall-and-looks-at-the-camera-on.jpg?s=2048x2048&w=is&k=20&c=VgPE6FeAw_flGQ1KR2uNxl2g2sZV8vUEFdOn7evs4WM=",
    fee: "500 ETB",
    bio: "Board-certified Dermatologist expert in clinical dermatology, acne treatments, skin cancer screenings, and cosmetic procedures."
  },
  {
    id: 6,
    name: "Dr. Abraham Alula",
    specialty: "Internal Medicine",
    hospital: "Amin General Hospital",
    experience: "11 years",
    rating: "4.6",
    reviews: "76",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
    fee: "450 ETB",
    bio: "Specialist in comprehensive adult medicine, managing chronic multi-system diseases, preventative screenings, and primary health wellness."
  }
];

const SPECIALTIES = ["All", "Cardiology", "Pediatrics", "Neurology", "Gynecology", "Dermatology"];

const getUpcomingDays = () => {
  const days = [];
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  for (let i = 1; i <= 4; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      id: i,
      raw: d.toISOString().split('T')[0],
      formatted: d.toLocaleDateString('en-US', options)
    });
  }
  return days;
};

const TIME_SLOTS = ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM", "02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM"];

export default function Booking() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookAppointment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/book-appointment');
  };
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [formStep, setFormStep] = useState(1);
  
  // Favorites State (ለዶክተሮች የተመረጡ ምልክት መቆጣጠሪያ)
  const [favorites, setFavorites] = useState([]);
  
  // Mobile Touch Control
  const [mobileActiveCardId, setMobileActiveCardId] = useState(null);

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  
  const [payPhoneNumber, setPayPhoneNumber] = useState("");
  const [payPin, setPayPin] = useState("");
  const [formError, setFormError] = useState("");

  const upcomingDays = useMemo(() => getUpcomingDays(), []);

  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter(doc => {
      const matchesSpecialty = selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecialty && matchesSearch;
    });
  }, [selectedSpecialty, searchQuery]);

  const handleOpenProfile = (doctor) => {
    window.scrollTo({ top: 380, behavior: 'smooth' });
    setActiveDoctor(doctor);
    setFormStep(1);
    setPatientName("");
    setPatientPhone("");
    setVisitReason("");
    setAppointmentDate("");
    setAppointmentTime("");
    setPaymentMethod("");
    setPaymentType("");
    setPayPhoneNumber("");
    setPayPin("");
    setFormError("");
  };

  const handleCardTap = (docId) => {
    if (mobileActiveCardId === docId) {
      setMobileActiveCardId(null);
    } else {
      setMobileActiveCardId(docId);
    }
  };

  // ተመራጭ ዶክተሮችን ለመጨመር/ለመቀነስ (Toggle Bookmark)
  const toggleFavorite = (e, docId) => {
    e.stopPropagation(); // ካርዱ እንዳይከፈት ክሊኩን እዚህ ያቆመዋል
    if (favorites.includes(docId)) {
      setFavorites(favorites.filter(id => id !== docId));
    } else {
      setFavorites([...favorites, docId]);
    }
  };

  const handleNextToDateTime = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      setFormError("እባክዎ መጀመሪያ የታካሚውን ስም እና ስልክ ያስገቡ።");
      return;
    }
    setFormError("");
    setFormStep(2);
  };

  const handleBookAtHospital = () => {
    if (!appointmentDate || !appointmentTime) {
      setFormError("እባክዎ የቀጠሮ ቀን እና ሰዓት ይምረጡ።");
      return;
    }
    setPaymentType("At Hospital");
    setPaymentMethod("Pay at Hospital Counter");
    setFormStep(5);
    setTimeout(() => {
      setFormStep(6);
    }, 1500);
  };

  const handlePayOnlineOption = () => {
    if (!appointmentDate || !appointmentTime) {
      setFormError("እባክዎ የቀጠሮ ቀን እና ሰዓት ይምረጡ።");
      return;
    }
    setPaymentType("Online");
    setFormStep(3);
  };

  const handleSelectGateway = (method) => {
    setPaymentMethod(method);
    setPayPhoneNumber(patientPhone);
    setFormStep(4);
  };

  const handleVerifyPaymentPin = (e) => {
    e.preventDefault();
    if (!payPhoneNumber || !payPin) {
      setFormError("እባክዎ ስልክ ቁጥር እና የክፍያ ሚስጥር ቁጥር (PIN) ያስገቡ።");
      return;
    }
    setFormError("");
    setFormStep(5);
    setTimeout(() => {
      setFormStep(6);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      
      {/* 1. በትክክል የተስተካከለው የ CSS ስታይል ክፍል (ያለ ስህተት ይሰራaligned) */}
      <style>
        {`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* 2. አንተ የፈለግከው ፕሪሚየም ስታይል ናቭባር */}
      <header className="sticky top-0 z-50 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.03)] py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-600 select-none cursor-pointer group"
          >
            <div className="bg-blue-600 p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform">
             <Activity size={22} strokeWidth={2.5} className="animate-pulse" />
            </div>
            AMIR<span className="text-blue-500">HEALTH</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-wider text-slate-400">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors uppercase font-black bg-transparent border-none cursor-pointer">Home</button>
            <button onClick={() => navigate('#')} className="text-blue-600 transition-colors uppercase font-black bg-transparent border-none cursor-pointer">Doctors</button>
            <button onClick={() => navigate('/Services')} className="hover:text-blue-600 transition-colors uppercase font-black bg-transparent border-none cursor-pointer">Services</button>
            <button onClick={() => navigate('/Contact')} className="hover:text-blue-600 transition-colors uppercase font-black bg-transparent border-none cursor-pointer">Contact</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-slate-400 mr-2">
              <button onClick={() => navigate('/login')} className="hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer"><User size={18}/></button>

            </div>

            <a 
              href="tel:911" 
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-black text-xs px-5 py-2.5 rounded-2xl transition-all shadow-sm flex items-center gap-2"
            >
              <Phone size={14} /> 911
            </a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-lg ml-2 bg-transparent border-none"
            >
              <Menu size={24}/>
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 absolute left-0 w-full shadow-lg">
            <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-xs font-black uppercase text-slate-600 hover:text-blue-600 bg-transparent border-none">Home</button>
            <button onClick={() => { navigate('#'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-xs font-black uppercase text-blue-600 bg-transparent border-none">Doctors</button>
            <button onClick={() => { navigate('/services'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-xs font-black uppercase text-slate-600 hover:text-blue-600 bg-transparent border-none">Services</button>
            <button onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-xs font-black uppercase text-slate-600 hover:text-blue-600 bg-transparent border-none">Contact</button>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
              <button onClick={(e) => { handleBookAppointment(e); setMobileMenuOpen(false); }} className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold border-none">Book Appointment</button>
              <a href="tel:911" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold"><Phone size={14} /> 911 Emergency Call</a>
            </div>
          </div>
        )}
      </header>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-36">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/70 to-slate-50/40" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-blue-50 text-blue-600 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-6 shadow-sm">
            <Activity size={14} className="animate-pulse text-blue-500" /> Amin Premium Hospital Portal
          </span>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-slate-700 drop-shadow-sm select-none">
            Amin Medical Center <br /> Appointment <span className="text-blue-600">Hub</span>
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto mt-8">
            <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              <span className="text-blue-600 font-black text-sm">50+</span>
              <span className="text-[11px] text-slate-500 font-bold">Specialists</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              <span className="text-blue-600 font-black text-sm">24/7</span>
              <span className="text-[11px] text-slate-500 font-bold">Emergency Care</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
              <span className="text-blue-600 font-black text-sm">100%</span>
              <span className="text-[11px] text-slate-500 font-bold">Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full relative z-20 -mt-10">
        
        {!activeDoctor ? (
          /* ==================== DOCTORS LIST ==================== */
          <div className="animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)] space-y-10">
            
            {/* Search and Filters */}
            <div className="bg-white rounded-3xl p-6 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all"
                />
              </div>

              <div className="pt-2">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {SPECIALTIES.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpecialty(spec)}
                      className={`px-5 py-2.5 rounded-full text-xs font-black transition-all whitespace-nowrap ${
                        selectedSpecialty === spec
                          ? 'bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.2)]'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Area with Fixed Overflow Aspect Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredDoctors.map((doc) => {
                const isCardOpen = mobileActiveCardId === doc.id;
                const isFavorite = favorites.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => handleCardTap(doc.id)}
                    className="group relative bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out h-[480px] cursor-pointer"
                  >
                    {/* Doctor Image Backdrop */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                    </div>

                    {/* BOOKMARK ICON (ከፎቶው ላይ በስተቀኝ በክሊኒካል ሰማያዊ ቀለም) */}
                    <button
                      onClick={(e) => toggleFavorite(e, doc.id)}
                      className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-md group/fav"
                      title={isFavorite ? "Remove Bookmark" : "Save Doctor"}
                    >
                      <Bookmark 
                        size={18} 
                        className={`transition-transform duration-300 active:scale-75 ${isFavorite ? 'fill-blue-600 text-blue-600 scale-110' : 'group-hover/fav:scale-110'}`} 
                      />
                    </button>

                    {/* Sliding Transparent Overlay Info Card */}
                    <div 
                      className={`absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out transform flex flex-col justify-end
                        ${isCardOpen ? 'translate-y-0' : 'translate-y-[150px] md:translate-y-[155px] md:group-hover:translate-y-0'}
                      `}
                    >
                      
                      {/* Header: Specialty & Rating & Name */}
                      <div className="text-center mb-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-[11px] text-blue-300 font-black uppercase tracking-widest block drop-shadow-sm">
                            {doc.specialty}
                          </span>
                          <span className="text-slate-400 text-xs">•</span>
                          {/* Rating Badge */}
                          <div className="flex items-center gap-0.5 text-amber-400">
                            <Star size={11} fill="currentColor" />
                            <span className="text-[11px] font-black text-white">{doc.rating}</span>
                            <span className="text-[9px] text-slate-300 font-medium">({doc.reviews})</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
                          {doc.name}
                        </h3>
                      </div>

                      {/* Expandable Section: Bio & Action Button */}
                      <div 
                        className={`transition-all duration-300 text-center flex flex-col gap-4
                          ${isCardOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 md:group-hover:opacity-100 md:group-hover:scale-100'}
                        `}
                      >
                        <p className="text-xs text-slate-100 leading-relaxed font-semibold max-h-[56px] overflow-hidden drop-shadow-sm">
                          {doc.bio}
                        </p>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenProfile(doc);
                          }}
                          className="w-full bg-white hover:bg-blue-600 text-slate-950 hover:text-white font-black py-3.5 rounded-xl text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20"
                        >
                          View Profile <ArrowRight size={14} />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ==================== PROFILE & STEPPERS ==================== */
          <div className="animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)] space-y-8 max-w-5xl mx-auto">
            
            <button
              onClick={() => setActiveDoctor(null)}
              className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-800 bg-white px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              <ArrowLeft size={14} /> Back to Doctor Directory
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              
              {/* Profile Details (Left Panel) */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="w-full h-[380px] rounded-3xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-sm relative">
                    <img
                      src={activeDoctor.image}
                      alt={activeDoctor.name}
                      className="h-full w-full object-cover object-top"
                    />
                    
                    {/* BOOKMARK ICON (በፕሮፋይል ገጽ ላይ በስተቀኝ) */}
                    <button
                      onClick={(e) => toggleFavorite(e, activeDoctor.id)}
                      className="absolute top-6 right-6 p-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-slate-900 hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
                    >
                      <Bookmark 
                        size={18} 
                        className={favorites.includes(activeDoctor.id) ? 'fill-blue-600 text-blue-600' : ''} 
                      />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-blue-50 text-blue-600 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                        {activeDoctor.specialty}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1.5 rounded-full text-xs font-black">
                        <Star size={13} fill="currentColor" />
                        <span>{activeDoctor.rating}</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">{activeDoctor.name}</h2>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <MapPin size={14} className="text-blue-500" />
                      <span>{activeDoctor.hospital}</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">About the Doctor</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {activeDoctor.bio}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                    <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Experience</span>
                    <span className="font-black text-slate-800 text-sm">{activeDoctor.experience}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                    <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Consultation Fee</span>
                    <span className="font-black text-teal-600 text-sm">{activeDoctor.fee}</span>
                  </div>
                </div>
              </div>

              {/* Booking Step Prompt (Right Panel) */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[32px] flex flex-col justify-between max-w-[460px] w-full mx-auto lg:mx-0 shadow-[0_25px_60px_rgba(0,0,0,0.04)] min-h-[500px]">
                
                {formStep < 6 && (
                  <div className="flex items-center gap-2 mb-8 pb-4 overflow-x-auto">
                    
                  </div>
                )}

                {formError && (
                  <div className="bg-rose-50 text-rose-600 rounded-2xl p-4 text-xs font-black text-center mb-6 animate-[shake_0.5s_ease-in-out]">
                    {formError}
                  </div>
                )}

                {/* --- STEP 1: PATIENT INFO --- */}
                {formStep === 1 && (
                  <form onSubmit={handleNextToDateTime} className="space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900">የታካሚው መረጃ</h3>
                        <p className="text-xs text-slate-400">ቀጠሮ ከመያዝዎ በፊት እባክዎ መጀመሪያ የታካሚውን መረጃ ያስገቡ።</p>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 text-slate-400" size={15} />
                          <input
                            type="text"
                            placeholder="Full Patient Name *"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full bg-slate-50 rounded-2xl py-3.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-slate-100/50 transition-all font-semibold"
                            required
                          />
                        </div>

                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={15} />
                          <input
                            type="tel"
                            placeholder="Phone Number *"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            className="w-full bg-slate-50 rounded-2xl py-3.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-slate-100/50 transition-all font-semibold"
                            required
                          />
                        </div>

                        <div className="relative">
                          <FileText className="absolute left-3.5 top-3.5 text-slate-400" size={15} />
                          <textarea
                            placeholder="Reason for Appointment (Optional)"
                            rows="3"
                            value={visitReason}
                            onChange={(e) => setVisitReason(e.target.value)}
                            className="w-full bg-slate-50 rounded-2xl py-3.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-slate-100/50 resize-none transition-all font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs transition-colors mt-6 flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(37,99,235,0.15)]"
                    >
                      Next: Choose Date & Time <ArrowRight size={14} />
                    </button>
                  </form>
                )}

                {/* --- STEP 2: DATE & TIME SLOT SELECTOR --- */}
                {formStep === 2 && (
                  <div className="space-y-6 flex-grow flex flex-col justify-between animate-[fadeIn_0.2s_ease-out]">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900">የቀጠሮ ቀን እና ሰዓት ይምረጡ</h3>
                        <p className="text-xs text-slate-400">ታካሚ፡ <span className="text-slate-700 font-bold">{patientName}</span></p>
                      </div>

                      {/* Date Choices */}
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                          Select Date *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {upcomingDays.map((day) => (
                            <button
                              key={day.id}
                              type="button"
                              onClick={() => setAppointmentDate(day.raw)}
                              className={`py-3 px-1 rounded-2xl text-xs font-black flex flex-col items-center justify-center gap-0.5 transition-all ${
                                appointmentDate === day.raw
                                  ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.15)]'
                                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100/50'
                              }`}
                            >
                              <span className="text-[9px] opacity-75 uppercase">{day.formatted.split(',')[0]}</span>
                              <span className="text-xs font-black">{day.formatted.split(',')[1]}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slot Choices */}
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                          Select Available Time Slot *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {TIME_SLOTS.slice(0, 6).map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setAppointmentTime(time)}
                              className={`py-2.5 rounded-2xl text-[10px] font-black transition-all ${
                                appointmentTime === time
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100/50'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* TWO CHOICE BUTTONS */}
                    <div className="space-y-3 pt-4 mt-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setFormStep(1)}
                          className="w-1/4 bg-slate-50 text-slate-500 hover:text-slate-800 font-black py-4 rounded-2xl text-xs transition-all"
                        >
                          Back
                        </button>
                        
                        <button
                          onClick={handleBookAtHospital}
                          className="w-3/4 bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
                        >
                          Book & Pay at Hospital <Clock size={14} />
                        </button>
                      </div>

                      <button
                        onClick={handlePayOnlineOption}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(37,99,235,0.15)]"
                      >
                        Pay Online Now ({activeDoctor.fee}) <CreditCard size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* --- STEP 3: PAYMENT GATEWAY SELECTION --- */}
                {formStep === 3 && (
                  <div className="space-y-6 flex-grow flex flex-col justify-between animate-[fadeIn_0.2s_ease-out]">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900">የክፍያ አማራጭ ይምረጡ</h3>
                        <p className="text-xs text-slate-400">ለመቀጠል ተመራጭ የክፍያ ስልትዎን ይምረጡ።</p>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-3xl space-y-2 mb-4">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Doctor:</span>
                          <span className="font-bold text-slate-800">{activeDoctor.name}</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Consultation Fee:</span>
                          <span className="font-black text-teal-600">{activeDoctor.fee}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => handleSelectGateway('Telebirr')}
                          className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/50 rounded-2xl transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs">
                              T
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-black text-slate-800">Telebirr</p>
                              <p className="text-[10px] text-slate-400 font-bold">Instant mobile checkout</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-slate-400" />
                        </button>

                        <button
                          onClick={() => handleSelectGateway('CBE Birr')}
                          className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/50 rounded-2xl transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-black text-xs">
                              C
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-black text-slate-800">CBE Birr</p>
                              <p className="text-[10px] text-slate-400 font-bold">Commercial Bank of Ethiopia transfer</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-slate-400" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setFormStep(2)}
                      className="w-full bg-slate-50 text-slate-400 hover:text-slate-600 font-black py-4 rounded-2xl text-xs transition-all mt-6"
                    >
                      Back
                    </button>
                  </div>
                )}

                {/* --- STEP 4: PORTAL SECURITY GATEWAY --- */}
                {formStep === 4 && (
                  <form onSubmit={handleVerifyPaymentPin} className="space-y-6 flex-grow flex flex-col justify-between animate-[fadeIn_0.2s_ease-out]">
                    <div className="space-y-6">
                      <div className="space-y-2 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-2">
                          <ShieldAlert size={24} />
                        </div>
                        <h3 className="text-base font-black text-slate-900">{paymentMethod} PIN Verification</h3>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">እባክዎ ክፍያውን ለማረጋገጥ የስልክ ቁጥር እና የክፍያ ሚስጥር ቁጥርዎን (PIN) ያስገቡ።</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-3 text-slate-400" size={14} />
                            <input
                              type="tel"
                              placeholder="09... / 07..."
                              value={payPhoneNumber}
                              onChange={(e) => setPayPhoneNumber(e.target.value)}
                              className="w-full bg-slate-50 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-800 font-black focus:outline-none focus:bg-slate-100/50"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Password / PIN</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-3 text-slate-400" size={14} />
                            <input
                              type="password"
                              placeholder="••••"
                              maxLength="6"
                              value={payPin}
                              onChange={(e) => setPayPin(e.target.value)}
                              className="w-full bg-slate-50 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-800 font-black focus:outline-none focus:bg-slate-100/50 tracking-[0.25em]"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setFormStep(3)}
                        className="w-1/3 bg-slate-50 text-slate-500 hover:text-slate-800 font-black py-4 rounded-2xl text-xs transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(37,99,235,0.15)]"
                      >
                        Authorize & Pay {activeDoctor.fee} <ArrowRight size={14} />
                      </button>
                    </div>
                  </form>
                )}

                {/* --- STEP 5: LOADER --- */}
                {formStep === 5 && (
                  <div className="p-20 text-center space-y-4 my-auto">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-slate-400 font-black animate-pulse">Securing your ticket slot...</p>
                  </div>
                )}

                {/* --- STEP 6: LUXURY VIP BOOKING TICKET --- */}
                {formStep === 6 && (
                  <div className="space-y-6 animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                    
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl luxury-ticket">
                      
                      {/* Gold Badge */}
                      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-2 text-center text-[10px] font-black text-slate-950 uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-sm">
                        <Sparkles size={12} className="animate-pulse" /> Amin Premium VIP Entry
                      </div>

                      {/* Ticket Details */}
                      <div className="p-6 space-y-8 relative">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center pb-2">
                          <div>
                            <h4 className="text-xs font-black tracking-wider text-slate-300 uppercase">AMIN CLINICAL HUB</h4>
                            <p className="text-[9px] text-slate-500 font-bold">Addis Ababa, Ethiopia</p>
                          </div>
                          <span className="text-[10px] font-black px-2.5 py-1 rounded bg-teal-500/10 text-teal-400">
                            {paymentType === "Online" ? "PAID" : "RESERVED"}
                          </span>
                        </div>

                        {/* Patient info details */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-left">
                          <div>
                            <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-black">PATIENT</span>
                            <span className="text-xs font-black text-slate-200">{patientName}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-black">DOCTOR</span>
                            <span className="text-xs font-black text-slate-200">{activeDoctor.name}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-black">SLOT</span>
                            <span className="text-xs font-black text-slate-200">{appointmentDate} @ {appointmentTime}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-black">METHOD</span>
                            <span className="text-xs font-black text-teal-400">{paymentMethod}</span>
                          </div>
                        </div>

                        {/* Luxury Punch Cuts */}
                        <div className="absolute left-0 bottom-28 w-3 h-6 bg-white rounded-r-full -ml-1.5" />
                        <div className="absolute right-0 bottom-28 w-3 h-6 bg-white rounded-l-full -mr-1.5" />

                        {/* QR Code section */}
                        <div className="flex flex-col items-center justify-center pt-4 space-y-3">
                          <div className="bg-white p-3 rounded-2xl flex items-center justify-center shadow-md">
                            <QrCode size={100} className="text-slate-950" />
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">SCAN AT RECEPTION</p>
                            <p className="text-[8px] text-slate-500 mt-1">Show this VIP gatepass to check in automatically.</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    <button
                      onClick={() => setActiveDoctor(null)}
                      className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black py-4 rounded-2xl text-xs transition-colors shadow-lg"
                    >
                      Close & Back to Directory
                    </button>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}
      </main>

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

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}