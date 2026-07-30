
import { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Pages/page/Home';
// በ App.jsx አናት ላይ (ከሌሎቹ Import-ዎች ጋር) ጨምረው፦
import Services from './Pages/page/Services'; // ወይም ፋይሉን ባስቀመጥክበት አድራሻ መነሻ ስሙን ጥራው
import drible from './Pages/page/drible';
import Login from './Pages/page/Login';
import Booking from './Pages/page/Booking';
import Contact from './Pages/page/Contact';
import { Phone, Users, Award,  CheckCircle2, HeartPulse, FileText, PhoneCall,PlayCircle, Building2, Microscope, Star, MapPin, Mail, Quote, ArrowRight, ChevronLeft, ChevronRight, Plus, Minus, Video, Camera, Clock, CalendarCheck, Activity } from 'lucide-react';

// --- Animation Wrapper (FadeInView) ---


// ========================================================
// 1. FADE IN VIEW ANIMATION COMPONENT
// ========================================================
const FadeInView = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// ========================================================
// 2. ዋናው የ ONBOARDING ኮምፖነንት
// ========================================================
// ========================================================
// 3. ዋናው የ APP ኮምፖነንት (ስሙ ወደ App ተቀይሮ Export መደረግ አለበት)
// ========================================================
function SplashOnboarding() {
  const [lang, setLang] = useState('en'); 
  const [step, setStep] = useState(0); 
  const [showSplash, setShowSplash] = useState(true);
  const [onboardPage, setOnboardPage] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setShowSplash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 0 && showSplash) {
      document.body.style.backgroundColor = '#0A2540';
    } else {
      document.body.style.backgroundColor = '#FFFFFF';
    }
  }, [step, showSplash]);

  const t = {
    en: {
      onboarding: [
        { title: "Consult only with a doctor you trust", desc: "Connect with certified medical professionals tailored to your specific health needs seamlessly." },
        { title: "Find a lot of specialist doctors in one place", desc: "Access 24+ medical specialties instantly without the hassle of long clinic queues." },
        { title: "Get connected to our Online Consultation", desc: "Experience secure high-definition video calls and instant professional healthcare from home." }
      ]
    },
    am: {
      onboarding: [
        { title: "በሚያምኑት ሐኪም ብቻ ይታከሙ", desc: "ከእርስዎ ጤና ጋር የሚስማሙ የተመሰከረላቸውን ባለሙያዎች በቀላሉ ያግኙ።" },
        { title: "በርካታ የልዩ ባለሙያ ሐኪሞችን በአንድ ቦታ ያግኙ", desc: "ከ24 በላይ የሕክምና ዘርፎችን ያለምንም እንግልት እና ረጅም ወረፋ በአንድ ቦታ ያግኙ።" },
        { title: "በቀጥታ ከበይነመረብ (Online) ህክምናችን ጋር ይገናኙ", desc: "ደህንነቱ በተጠበቀ የቪዲዮ ጥሪ አማካኝነት ከቤትዎ ሳይወጡ ጥራት ያለው ሕክምና ያግኙ።" }
      ]
    }
  };

  const onboardingImages = [
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop", 
    "https://media.istockphoto.com/id/2151993114/photo/doctor-practitioner-at-hospital-confident-practitioner-doctor-standing-in-medical-office.jpg?s=2048x2048&w=is&k=20&c=DHXa7S9QBlic5a0CNhOTE3NBD0XIUkgiw8i_VJLbcNY="
  ];

  const handleNextOnboard = () => {
    if (onboardPage < 2) {
      setOnboardPage(onboardPage + 1);
    } else {
      setStep(1); // 👈 አሁን "Get Started" ሲጫን 100% ወደ ሆምፔጅህ ይወስደሃል!
    }
  }; 

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-600/10 select-none relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {step === 0 && (
          <motion.div 
            key="onboarding-root" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full flex items-center justify-center bg-white text-slate-900 z-[9999]"
          >
            {showSplash ? (
              <motion.div 
                key="splash-screen"
                exit={{ opacity: 0, scale: 1.02 }}
                className="absolute inset-0 bg-[#0A2540] flex flex-col items-center justify-center p-6 z-[99999]"
              >
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-6 text-center">
                  <div className="bg-white p-6 rounded-[32px] text-[#0A2540] shadow-2xl">
                    <Activity size={52} strokeWidth={2.5} className="animate-pulse" />
                  </div>
                  <h1 className="text-4xl font-extrabold italic tracking-tighter text-white">AMIR<span className="text-blue-400">HEALTH</span></h1>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="onboarding-content" className="w-full max-w-md mx-auto px-6 py-8 flex flex-col justify-center min-h-screen bg-white">
                <div className="w-full bg-white border border-slate-100 rounded-[48px] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.04)] flex flex-col items-center space-y-6 relative">
                  
                  {/* Skip Button */}
                  <div className="w-full flex justify-between items-center px-2 pt-1">
                    <div className="h-2 w-2" />
                    <button 
                      onClick={() => setStep(1)} // 👈 "Skip" ሲጫን ወደ ሆምፔጅ መሄጃ
                      className="text-[11px] font-bold uppercase tracking-widest text-slate-900 bg-slate-50 border border-slate-100/80 px-3 py-1.5 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300"
                    >
                      Skip
                    </button>
                  </div>

                  {/* IMAGE BOX (የተስተካከለ፣ ለስላሳ እና ፈጣን አኒሜሽን) */}
                  <div className="w-full aspect-[4/5] rounded-[38px] overflow-hidden bg-slate-50 relative">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={onboardPage}
                        src={onboardingImages[onboardPage]}
                        initial={{ opacity: 0, y: -12 }} // 👈 የዶክተሮቹ አኒሜሽን ዝላይ እዚህ ጋር ቀንሷል
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }} // 👈 ፍጥነቱ ጨምሯል
                        className="w-full h-full object-cover"
                        alt="Doctor"
                      />
                    </AnimatePresence>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="w-full px-3 space-y-3 text-center">
                    <AnimatePresence mode="wait">
                      <motion.div key={onboardPage} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="space-y-3">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t[lang].onboarding[onboardPage].title}</h2>
                        <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">{t[lang].onboarding[onboardPage].desc}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="w-full flex items-center justify-between pt-4 border-t border-slate-50 px-2">
                    <div className="flex gap-2">
                      {[0, 1, 2].map((idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setOnboardPage(idx)} 
                          className={`h-2 rounded-full transition-all duration-500 ${onboardPage === idx ? 'w-7 bg-blue-600' : 'w-2 bg-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <button 
                      onClick={handleNextOnboard}
                      className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-7 py-4 rounded-full shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.4)] transition-all duration-300 flex items-center gap-2 font-bold text-xs uppercase tracking-wider"
                    >
                      {onboardPage === 2 ? (
                        <>
                          <span>Get Started</span>
                          <ArrowRight size={15} strokeWidth={2.5} />
                        </>
                      ) : (
                        <ArrowRight size={16} strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 🛠️ ድልድይ፦ ወደ ሆምፔጅህ መሻገሪያው ክፍል እዚህ ጋር ተከፍቷል! */}
        {step === 1 && (
          <motion.div key="homepage-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen bg-white">
            <RealHomePage onReset={() => setStep(0)} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
} // 👈 የ App መዝጊያ


const PatientReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(2); 
  const [playingVideoUrl, setPlayingVideoUrl] = useState(null);
  
  // የእጅ/የማውዝ መጎተቻዎችን ለመቆጣጠር (Touch/Drag States)
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // 5 አጫጭር የሆስፒታል ቪዲዮዎች (Max 30 Seconds Theme)
  const hospitalVideos = [
    {
      id: 1,
      name: "Amin Hospital Tour",
      title: "Duration: 30s • Quick Overview",
      review: "Take a 30-second virtual walk through our ultra-modern OPD and patient waiting lounges.",
      img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/4vBtJmJ0De4?si=bv_2fwPP8wvJ7TDQ"
    },
    {
      id: 2,
      name: "Emergency & ICU Setup",
      title: "Duration: 25s • Critical Care",
      review: "A quick look into our 24/7 level-1 trauma center and advanced ventilator-equipped ICU beds.",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      name: "Advanced Diagnostic Lab",
      title: "Duration: 30s • Modern Technology",
      review: "See how our high-speed imaging and fully automated laboratory ensure 100% accurate health reports.",
      img: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      name: "Maternity & Newborn Suites",
      title: "Duration: 20s • Comfort & Care",
      review: "Tour our safe, clean, and highly comfortable private delivery rooms and NICU support spaces.",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 5,
      name: "Patient Safety Protocol",
      title: "Duration: 30s • Our Priority",
      review: "Learn about the strict international hygiene and sterilization standards we practice every single day.",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  // --- የእጅ/የማውዝ መጎተት ስራዎች (Drag/Swipe Functions) ---
  const handleDragStart = (clientX) => {
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handleDragEnd = (clientX) => {
    if (!isDragging.current) return;
    const dragDistance = clientX - dragStartX.current;

    // ተጠቃሚው ወደ ቀኝ ከገፋው (ወደ ኋላ ይመለሳል)
    if (dragDistance > 50 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } 
    // ተጠቃሚው ወደ ግራ ከገፋው (ወደ ፊት ይሄዳል)
    else if (dragDistance < -50 && activeIndex < hospitalVideos.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    isDragging.current = false;
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        <span className="inline-block border border-slate-300 text-slate-500 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          Hospital Shorts
        </span>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
          Inside Our <span className="text-blue-600">Medical</span> Facilities
        </h2>
        <p className="text-slate-500 mb-12 text-sm">Swipe or drag the cards to explore. Each video is under 30 seconds.</p>

        {/* --- የቪዲዮዎች መደርደሪያ (Touch & Mouse Drag Support ያለው) --- */}
        <div 
          className="relative flex justify-center items-center h-[400px] max-w-5xl mx-auto overflow-hidden px-4 touch-none"
          // ለስልክ (Touch Events)
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
          // ለኮምፒውተር (Mouse Events)
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onMouseLeave={() => { isDragging.current = false; }}
        >
          {hospitalVideos.map((video, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            
            // በአንድ ጊዜ ከ 3 ካርድ በላይ እንዳይታይ መገደብ
            if (absOffset > 1) return null;

            return (
              <div
                key={video.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${offset * 105}%) scale(${absOffset === 0 ? 1 : 0.82})`,
                  zIndex: absOffset === 0 ? 20 : 10,
                }}
                className={`absolute w-[85%] sm:w-[50%] md:w-[45%] h-[350px] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-grab active:cursor-grabbing origin-center ${
                  absOffset === 0 ? 'opacity-100 border-2 border-blue-600' : 'opacity-60 blur-[1px]'
                }`}
              >
                {/* የጀርባ ፎቶ */}
                <img src={video.img} className="w-full h-full object-cover pointer-events-none" alt={video.name} />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>

                {/* የላይኛው የፕሌይ በተን (ከሰማያዊ ከለር ጋር) */}
                {absOffset === 0 ? (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setPlayingVideoUrl(video.videoUrl);
                    }}
                    className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all scale-100 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-blue-600 hover:text-white transition-colors">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    PLAY SHORTS
                  </button>
                ) : (
                  <div className="absolute top-6 left-6 bg-black/40 backdrop-blur text-white/80 px-4 py-2 rounded-full text-xs font-bold">
                    Swipe to view
                  </div>
                )}

                {/* የታችኛው መረጃ */}
                <div className={`absolute bottom-6 left-6 right-6 text-left text-white transition-all duration-300 ${absOffset === 0 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-50'}`}>
                  <p className="font-medium text-base md:text-lg leading-snug mb-3 drop-shadow-md">
                    "{video.review}"
                  </p>
                  <div>
                    {/* ሰማያዊ ጽሑፍ (text-blue-400) */}
                    <h4 className="font-black text-sm tracking-wide text-blue-400">{video.name}</h4>
                    <span className="text-[11px] text-white/70">{video.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- መቆጣጠሪያ ነጥቦች (Dots Indicator - በሰማያዊ ከለር) --- */}
        <div className="flex justify-center gap-2 mt-4">
          {hospitalVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300'}`}
            />
          ))}
        </div>

      </div>

      {/* --- VIDEO PLAYER MODAL --- */}
      {playingVideoUrl && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setPlayingVideoUrl(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 transition-colors"
            >
              ✕
            </button>
            <iframe
              src={playingVideoUrl}
              title="Hospital Video Overview"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};


const SpecialtiesSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const specialtiesData = [
    {
      id: 1,
      title: "Cardiology",
      desc: "Advanced heart care, diagnostic testing, and life-saving interventions.",
      longDesc: "Our Cardiology department features state-of-the-art cath labs, 24/7 cardiac emergency response, non-invasive imaging (ECHO, TMT), and personalized post-stroke rehabilitation programs managed by top-tier cardiologists.",
      img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Orthopedics",
      desc: "Joint replacement, sports medicine, and advanced spine surgeries.",
      longDesc: "We specialize in minimally invasive keyhole surgeries, total knee and hip replacements, complex fracture management, and dedicated physical therapy to restore your mobility quickly and safely.",
      img: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Pediatrics",
      desc: "Comprehensive child healthcare, neonatology, and routine vaccinations.",
      longDesc: "From newborns to adolescents, our child-friendly clinic offers 24/7 NICU/PICU support, developmental tracking, pediatric surgery, and a gentle environment to ensure your child feels safe and cared for.",
      img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Neurology",
      desc: "Expert care for brain, spine, and nervous system disorders.",
      longDesc: "Equipped with advanced neuro-imaging (MRI/CT), our team treats complex conditions including stroke management, epilepsy, Parkinson's disease, migraines, and nerve conduction disorders.",
      img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Gynecology & Maternity",
      desc: "Women's wellness, prenatal guidance, and safe childbirth suites.",
      longDesc: "Comprehensive care for every stage of womanhood. Features high-risk pregnancy monitoring, painless labor facilities, laparoscopic gynecology surgeries, and supportive fertility treatments.",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Emergency & Critical Care",
      desc: "24/7 trauma response with fully-equipped modern ICU beds.",
      longDesc: "Our Level-1 trauma center delivers rapid-response emergency medical care. Supported by on-call surgeons, advanced ventilators, and an immediate-response ambulance network.",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const handleArrowClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <span className="inline-block border border-slate-300 text-slate-500 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          Services
        </span>
        
        <h2 className={`text-4xl font-extrabold mb-4 transition-colors duration-300 ${activeCard ? 'text-blue-600' : 'text-slate-900'}`}>
          Our Medical Specialties
        </h2>
        
        <p className="text-slate-500 mb-16 max-w-2xl mx-auto">
          We offer a wide range of healthcare services designed to support patients at every stage of life.
        </p>
        
<button className="  hidden md:flex items-center gap-2.5 text-blue-600 font-bold text-lg hover:gap-4 transition-all mb-3">
              View All Services <ArrowRight />
            </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialtiesData.map((item) => {
            const isMeActive = activeCard === item.id;
            
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-left group flex flex-col justify-between relative border border-slate-100"
              >
                <div>
                  <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-slate-900/5"></div>
                  </div>

                  <div className="px-2">
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isMeActive ? 'text-blue-600' : 'text-slate-900'}`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-2 pt-2 border-t border-slate-50 flex justify-end">
                  <button 
                    onClick={() => handleArrowClick(item.id)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:rotate-45 ${
                      isMeActive 
                        ? 'bg-blue-600 text-white scale-110' 
                        : 'bg-slate-900 text-white hover:bg-blue-600'
                    }`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="2.5" 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>
                </div>

                {isMeActive && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-between z-10 animate-[scaleUp_0.2s_ease-out] border-2 border-blue-500 shadow-2xl">
                    <div>
                      <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Detailed View
                      </span>
                      <h4 className="text-xl font-black text-blue-600 mt-3 mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed overflow-y-auto max-h-[200px] pr-1">
                        {item.longDesc}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleArrowClick(item.id)}
                      className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors shadow-md text-center"
                    >
                      Close Details
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};


const Testimonials = () => {
  const reviews = [
    { id: 1, name: "Bethelhem Tadesse", role: "Maternal Health", comment: "The care I received at AMIR HEALTH was beyond my expectations. The doctors are incredibly professional and humble.", stars: 5 },
    { id: 2, name: "Yonas Kassahun", role: "Cardiology Patient", comment: "After struggling with heart issues, I finally found the right diagnosis here. Truly grateful to the team!", stars: 5 },
    { id: 3, name: "Sara Mohammed", role: "Lab Services", comment: "I received my lab results much faster than expected. The pricing is fair and service is highly efficient.", stars: 5 },
    { id: 4, name: "Dawit Girma", role: "General Checkup", comment: "Very modern facility and friendly staff. The appointment booking process was seamless and incredibly fast.", stars: 5 },
    { id: 5, name: "Muna Ahmed", role: "Pediatrics", comment: "My children love the doctors here. They make them feel safe and cared for. Highly recommended for families!", stars: 5 },
    { id: 6, name: "Abebe Kebede", role: "Orthopedics", comment: "The rehabilitation program helped me walk again after my surgery. The physiotherapists are world-class.", stars: 5 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= reviews.length - (itemsToShow - 1) ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - itemsToShow : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= reviews.length - (itemsToShow - 1) ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [itemsToShow, reviews.length]);

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header - Always showing View All */}
        <div className="flex justify-between items-center mb-12">
          <div className="max-w-[70%] md:max-w-2xl">
            <span className="text-blue-600 font-bold tracking-[0.1em] uppercase text-[10px] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
              Testimonials
            </span>
            <h2 className="text-2xl md:text-5xl font-black text-slate-950 mt-3 tracking-tight">
              Patient Stories
            </h2>
          </div>
          
          <button className="flex items-center gap-1.5 text-blue-600 font-bold text-sm md:text-lg hover:gap-3 transition-all group shrink-0">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* The Slider with Fade/Path Effect */}
        <div className="relative group">
          {/* Left & Right Gradients to hide/show cards (The "Path" effect) */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) gap-4 md:gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {reviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="flex-shrink-0 bg-slate-50 p-7 md:p-10 rounded-[35px] border border-slate-100 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500"
                  style={{ width: `calc(${100 / itemsToShow}% - ${(16 * (itemsToShow - 1)) / itemsToShow}px)` }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <Quote size={32} className="text-blue-500/20 mb-4" fill="currentColor" />
                      <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6 font-medium italic line-clamp-4">
                        "{rev.comment}"
                      </p>
                      <div className="flex gap-0.5 text-yellow-500 mb-6">
                        {[...Array(rev.stars)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-slate-200 pt-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                        {rev.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-slate-900 text-sm md:text-base truncate">{rev.name}</h4>
                        <p className="text-[10px] md:text-xs text-blue-600 font-bold uppercase tracking-tighter">{rev.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10">
            <div className="flex gap-2">
              {[...Array(reviews.length - (itemsToShow - 1))].map((_, i) => (
                <div 
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`}
                ></div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevSlide} className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-blue-600 hover:text-white transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextSlide} className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-blue-600 hover:text-white transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// ==========================================
// 1. FAQ COMPONENT
// ==========================================
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are your working hours?",
      answer: "Our clinic is open 24/7 for emergency services. For regular specialist consultations, we are available Monday to Saturday, from 8:00 AM to 8:00 PM.",
      icon: <Clock size={18} />
    },
    {
      question: "Can I book an appointment online?",
      answer: "Yes, you can easily book an appointment through our website or mobile app. Simply click the 'Book Now' button and choose your preferred doctor and time.",
      icon: <CalendarCheck size={18} />
    },
    {
      question: "Do you offer Video Call consultations?",
      answer: "Absolutely! We provide high-quality Video Call consultations for patients who cannot visit the clinic in person. You just need a device with a camera and a stable internet connection.",
      icon: <Video size={18} />
    },
    {
      question: "How does the Telemedicine service work?",
      answer: "It's very simple. After booking a virtual session, you will receive a secure link. At the scheduled time, our doctor will join the video call to diagnose and provide medical advice through your camera.",
      icon: <Camera size={18} />
    }
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
          {faqs.map((faq, index) => (
            <div key={index} className="group">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-7 text-left transition-all"
              >
                <div className="flex items-center gap-5">
                  <span className={`transition-colors duration-300 ${openIndex === index ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                    {faq.icon}
                  </span>
                  <span className={`font-bold text-lg md:text-xl transition-colors ${openIndex === index ? 'text-blue-600' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-blue-600' : 'text-slate-300'}`}>
                   {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-8 pl-10 md:pl-14 text-slate-600 leading-relaxed text-lg max-w-2xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[30px]">
          <div className="bg-white rounded-[29px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Still have questions?</h3>
              <p className="text-slate-500 mt-1">We're here to help 24/7.</p>
            </div>
            <button className="w-full md:w-auto bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2. FOOTER COMPONENT
// ==========================================
const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-slate-800">
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
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 transition border border-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-400 transition border border-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-pink-600 transition border border-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="text-slate-400 space-y-4 text-sm font-medium">
              <li className="hover:text-blue-500 transition cursor-pointer">About Our Clinic</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Specialist Doctors</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Medical Packages</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Latest News</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Our Services</h4>
            <ul className="text-slate-400 space-y-4 text-sm font-medium">
              <li className="hover:text-blue-500 transition cursor-pointer">Cardiology Unit</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Diagnostic Lab</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Dental Care</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Emergency 24/7</li>
            </ul>
          </div>

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
  );
};

// ==========================================
// 3. DOCTOR SHOWCASE COMPONENT
// ==========================================
const DoctorShowcase = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specialists = [
    {
      id: 1,
      name: "Dr. Abera Molla",
      role: "Chief Cardiologist",
      exp: "15+ Years Experience",
      bio: "Specializing in advanced cardiovascular surgery and heart transplantation with training from Johns Hopkins.",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800"
    },
    {
      id: 2,
      name: "Dr. Bethlehem Tekle",
      role: "Senior Pediatrician",
      exp: "12+ Years Experience",
      bio: "Dedicated to providing compassionate care for children, focusing on early childhood development and nutrition.",
      img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800"
    },
    {
      id: 3,
      name: "Dr. Samuel Girma",
      role: "Lead Neurologist",
      exp: "10+ Years Experience",
      bio: "Expert in neuro-diagnostics and treatment of complex brain disorders with a focus on minimally invasive procedures.",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800"
    }
  ];
const navigate = useNavigate();
  return (
    <section className="py-32 bg-white" id="specialists">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Elite Medical Panel
            </span>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-950 leading-tight">
              Meet Our <span className="text-blue-600">World-Class</span> <br /> Specialists
            </h2>
          </div>
          <button className="flex items-center gap-3 font-bold text-slate-400 hover:text-blue-600 transition-colors group">
            View All Staff <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {specialists.map((doc) => (
            <div 
              key={doc.id}
              onMouseEnter={() => setSelectedDoctor(doc.id)}
              onMouseLeave={() => setSelectedDoctor(null)}
              className="relative group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-slate-100 border border-slate-50 shadow-2xl">
                <img 
                  src={doc.img} 
                  alt={doc.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                  <div>
                    <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">{doc.role}</p>
                    <h3 className="text-2xl font-bold mb-1">{doc.name}</h3>
                    <p className="text-white/60 text-xs font-medium mb-4">{doc.exp}</p>
                    
                    <AnimatePresence>
                      {selectedDoctor === doc.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-white/80 leading-relaxed mb-6 pt-4 border-t border-white/10">
                            {doc.bio}
                          </p>
                          <button className="bg-white text-slate-900 w-full py-4 rounded-2xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                            Consult Now
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus size={20} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. REAL HOMEPAGE COMPONENT (የመጀመሪያውን ክፍል እዚህ ጋ አገናኘነው!)
// ==========================================
const RealHomePage = ({ onReset }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* ናቭባሩን ወደ ሆምፔጁ አስገባነው ስለዚህ onboarding ላይ አይጋጭም */}
      <Navbar isScrolled={isScrolled} /> 

      {/* 🛠️ Onboarding ድገም ማድረጊያ ሚስጥራዊ ቁልፍ - ከላይ በቀኝ በኩል */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={onReset} className="text-[10px] font-bold tracking-widest uppercase bg-slate-900/90 backdrop-blur text-white px-4 py-2.5 rounded-xl hover:bg-blue-600 transition-all shadow-xl">
          🔄 Onboarding
        </button>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-60 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 bg-blue-100 border border-blue-200 text-blue-800 px-5 py-2.5 rounded-full text-sm font-bold mb-10 shadow-inner">
              <CheckCircle2 size={18} className="text-blue-600" /> Best Medical Clinic in Addis Ababa
            </div>
            
            <FadeInView delay={0.3}>
              <h1 className="text-6xl lg:text-8xl font-black text-slate-950 leading-[1.05] mb-10 tracking-tighter">
                Exceptional Care <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                  For Your Family
                </span>
              </h1>
            </FadeInView>
            
            <FadeInView delay={0.6}>
              <p className="text-xl text-slate-600 mb-14 max-w-2xl leading-relaxed">
                We provide the highest quality healthcare services with a team of specialized doctors 
                and state-of-the-art medical technology. Your wellness starts here.
              </p>
            </FadeInView>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/login')} 
                className="bg-blue-600 text-white px-12 py-5 rounded-3xl font-bold text-lg hover:bg-blue-700 hover:-translate-y-1.5 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 cursor-pointer border-none"
              >
                Get Started <ArrowRight size={22} />
              </button>
              <button className="bg-white border-2 border-slate-200 text-slate-800 px-12 py-5 rounded-3xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3">
                <Phone size={22} /> Call Emergency
              </button>
            </div>
          </div>

          <div className="lg:w-2/5 relative">
            <div className="relative z-10 w-full aspect-[4/5] bg-white rounded-[40px] overflow-hidden shadow-2xl border-[16px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600&auto=format&fit=crop" 
                alt="Professional Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-12 bg-white p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 border border-slate-50 animate-bounce">
              <div className="bg-green-500 p-3.5 rounded-2xl text-white shadow-lg shadow-green-100">
                <Award size={26} />
              </div>
              <div>
                <p className="text-slate-950 font-black text-lg">Top Rated</p>
                <p className="text-slate-600 font-medium">Medical Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Specialists Panel --- */}
      <DoctorShowcase/>

      {/* --- Stats Section --- */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300">
              <div className="h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="Medical Care" />
              </div>
              <div className="p-8">
                <h4 className="text-6xl font-black text-slate-900 tracking-tighter italic mb-2">15k<span className="text-blue-600">+</span></h4>
                <p className="text-slate-900 font-extrabold text-[11px] uppercase tracking-widest mb-4">Trusted Patients</p>
                <p className="text-slate-600 text-sm leading-relaxed">We have proudly served thousands of patients with dedication and compassionate care over the years.</p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300">
              <div className="h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="Surgery Room" />
              </div>
              <div className="p-8">
                <h4 className="text-6xl font-black text-slate-900 tracking-tighter italic mb-2">80<span className="text-blue-600">+</span></h4>
                <p className="text-slate-900 font-extrabold text-[11px] uppercase tracking-widest mb-4">Top Specialists</p>
                <p className="text-slate-600 text-sm leading-relaxed">Access to renowned specialists and highly experienced doctors across various medical fields.</p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col transition-all duration-300">
              <div className="h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="Lab Technology" />
              </div>
              <div className="p-8">
                <h4 className="text-6xl font-black text-slate-900 tracking-tighter italic mb-2">25k<span className="text-blue-600">+</span></h4>
                <p className="text-slate-900 font-extrabold text-[11px] uppercase tracking-widest mb-4">Precise Lab Results</p>
                <p className="text-slate-600 text-sm leading-relaxed">Fast and highly accurate diagnostic results supported by modern medical laboratory equipment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section ---
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-950 mb-7 tracking-tight">Our World Class Services</h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">We offer a wide range of specialized medical services to ensure you get the best treatment possible.</p>
            </div>
            <button className="hidden md:flex items-center gap-2.5 text-blue-600 font-bold text-lg hover:gap-4 transition-all">
              View All Services <ArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-12 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2.5 transition-all group">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-9 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-5 text-slate-900">Pediatrics</h3>
              <p className="text-slate-600 leading-relaxed mb-9">Specialized care for infants, children, and adolescents with love and care.</p>
              <div className="h-1.5 w-14 bg-blue-100 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>

            <div className="bg-white p-12 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2.5 transition-all group">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center mb-9 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <HeartPulse size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-5 text-slate-900">Cardiology</h3>
              <p className="text-slate-600 leading-relaxed mb-9">Advanced heart care services including diagnosis, treatment, and prevention.</p>
              <div className="h-1.5 w-14 bg-indigo-100 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>

            <div className="bg-white p-12 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2.5 transition-all group">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mb-9 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Microscope size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-5 text-slate-900">Diagnostics</h3>
              <p className="text-slate-600 leading-relaxed mb-9">Fast and accurate laboratory results with our modern medical equipment.</p>
              <div className="h-1.5 w-14 bg-purple-100 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section> */}
      <SpecialtiesSection />
      {/* --- Testimonials, FAQ & Footer --- */}
      <FadeInView delay={0.3}><Testimonials /></FadeInView>
      <PatientReviewsSection />
      <FadeInView delay={0.3}><FAQ /></FadeInView>
      <FadeInView delay={0.3}><Footer /></FadeInView>
    </div>
  );
};

// ==========================================
// 5. ROUTER PAGES
// ==========================================
const HomePage = () => <SplashOnboarding />;
const LoginPage = () => <Login />;
const BookingPage = () => <Booking />;

const ServicesPage  = () => <Services  />;
const ContactPage  = () => <Contact  />;



// ==========================================
// 6. MAIN APP COMPONENT (ዋናው ፕሮጀክት መሪ)
// ==========================================
export default function App() {
  return (
    <Router>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
            color: '#fff',
            fontWeight: '600',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 20px 50px rgba(0, 102, 204, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 20px 50px rgba(16, 185, 129, 0.3)',
            },
            icon: '✨',
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 20px 50px rgba(239, 68, 68, 0.3)',
            },
            icon: '❌',
          },
        }}
      />
      <div className="min-h-screen bg-[#fcfcfd] font-sans selection:bg-blue-100 selection:text-blue-600">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/book-appointment" element={<BookingPage />} />
            <Route path="/Services" element={<ServicesPage />} />
            <Route path="/Contact" element={<ContactPage />} />


          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
// export default HospitalHome;