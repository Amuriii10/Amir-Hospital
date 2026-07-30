import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Menu, X, PhoneCall, Stethoscope, 
  Heart, CheckCircle2, ChevronDown, ArrowRight, 
  ArrowLeft, MapPin, Phone, Mail, ShieldAlert, 
  Home, ShieldCheck, Calendar, Send
} from 'lucide-react';

// Exactly 10 Medical Services Data
const servicesData = [
  { 
    id: 1, 
    name: "General Medical Services", 
    teaser: "Comprehensive care and expert health diagnostics.", 
    desc: "Our general medical services are at the core of what we do, providing personalized care for individuals of all ages. We focus on preventive medicine, early detection, and managing chronic health states with advanced protocols.", 
    image: "https://images.unsplash.com/photo-1511174511575-275197f7b0ae?q=80&w=800", 
    deliverables: ["24/7 Emergency Care", "Routine Checkups", "Chronic Disease Management"],
    causes: "sedentary lifestyle, poor dietary habits, genetic predispositions, environmental stressors, and lack of routine clinical screening.",
    homeCare: "Rest in a well-ventilated room, monitor vital signs like temperature and blood pressure, stay hydrated with clean fluids, and avoid self-medicating with unprescribed antibiotics.",
    prevention: "Adopt a balanced whole-food diet, engage in 30 minutes of daily moderate exercise, manage chronic stress levels, and schedule comprehensive biometric screenings at least once a year.",
    faqs: [
      { q: "Do I need an appointment for general medicine?", a: "Walk-ins are welcome for urgent cases, but routine wellness checkups are best scheduled in advance." },
      { q: "How often should I get a full health checkup?", a: "For adults under 40, every 2 years is recommended. For adults over 40, an annual exam is highly advised." },
      { q: "Are lab tests done on the same day?", a: "Yes, our in-house smart lab processes most routine general health panels within 2 to 4 hours." }
    ] 
  },
  { 
    id: 2, 
    name: "Emergency Services", 
    teaser: "24/7 urgent medical response systems.", 
    desc: "Our 24/7 emergency services are equipped to handle urgent medical needs with speed, precision, and state-of-the-art trauma tools. Our triage system ensures critical patients receive instant live interventions.", 
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800", 
    deliverables: ["Trauma Response", "Ambulance Dispatch", "Critical Care Stabilization"],
    causes: "Acute physical trauma, sudden cardiovascular blockages, severe infections, untracked severe allergic reactions, and unexpected household accidents.",
    homeCare: "Keep the patient calm and warm. If there is external bleeding, apply direct, firm pressure using a clean cloth. Do not move patients with suspected neck or spinal injuries unless absolutely necessary.",
    prevention: "Keep a well-stocked first-aid kit at home and in vehicles, secure hazardous materials out of reach of children, use protective gear during physical tasks, and memorize emergency short-codes.",
    faqs: [
      { q: "What is the short-code number?", a: "You can call our emergency desk directly via our dedicated short code 8888." },
      { q: "Is the emergency department open on holidays?", a: "Yes, our trauma and emergency units operate 24 hours a day, 7 days a week, 365 days a year." },
      { q: "Do you provide critical care transit?", a: "Yes, our ICU-fitted ambulances are staffed with senior paramedics for safe and monitored patient transfers." }
    ] 
  },
  { 
    id: 3, 
    name: "Surgical Services", 
    teaser: "Advanced and specialized surgical operations.", 
    desc: "Amir Health is proud to offer a broad spectrum of surgical services, including advanced, minimally invasive, and specialized surgeries led by international boards.", 
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800", 
    deliverables: ["General Surgery", "Laparoscopic Operations", "Post-Op Recovery Tracking"],
    causes: "Severe internal tissue damage, organ inflammation (like acute appendicitis), advanced anatomical structural deterioration, or untreatable localized benign or malignant growths.",
    homeCare: "Strictly adhere to fasting windows (NPO) detailed by your surgical desk, thoroughly clean the surgical prep site with prescribed antiseptic wash, and stop taking blood-thinning agents under medical guidance.",
    prevention: "Treat internal abdominal strains early before they become emergencies, maintain abdominal wall strength through core safety exercises, and ensure clean wound management during minor injuries.",
    faqs: [
      { q: "How long is post-op recovery?", a: "It depends entirely on the surgery type, ranging from a few hours to a few days under strict ward observation." },
      { q: "What prep is needed before major surgery?", a: "Patients typically must fast for 8 hours and undergo complete pre-op clearance tests the day before." },
      { q: "Do you offer minimally invasive options?", a: "Yes, our laparoscopic units ensure smaller incisions, less pain, and much faster recovery windows." }
    ] 
  },
  { 
    id: 4, 
    name: "Diagnostic & Imaging", 
    teaser: "Accurate and reliable rapid laboratory results.", 
    desc: "Our diagnostic and imaging department provides state-of-the-art diagnostics, including high-field CT scans, advanced MRI, ultrasound, and digital x-rays, to ensure highly accurate clinical pathways.", 
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800", 
    deliverables: ["High-Res MRI & CT", "Digital X-Ray Systems", "Ultrasound Diagnostics"],
    causes: "Asymptomatic internal metabolic shifts, soft tissue tears, bone micro-fractures, or cellular anomalies that cannot be detected via external physical examinations.",
    homeCare: "Remove all metallic objects, jewelry, and accessories prior to entering the facility. Wear loose, comfortable clothing, and bring along all past medical records, prescriptions, and historical imaging films.",
    prevention: "Minimize unnecessary direct exposure to radiation fields, request modern low-dose digital imaging technologies whenever scans are required, and perform baseline screening tests periodically.",
    faqs: [
      { q: "When will I get my imaging results?", a: "Most routine imaging results are processed and delivered to your consultant within 24 hours." },
      { q: "Is a doctor's referral required for an MRI?", a: "Yes, to ensure safety and exact focus areas, a valid clinical referral is needed for MRI and CT scans." },
      { q: "Are your imaging machines child-friendly?", a: "Yes, we use low-dose digital technologies and supportive setups specifically tailored for pediatric comfort." }
    ] 
  },
  { 
    id: 5, 
    name: "Cancer Care", 
    teaser: "Compassionate therapies fighting patient cancer paths.", 
    desc: "Our cancer care services provide compassionate and comprehensive treatment for patients fighting cancer. We combine advanced chemotherapy, targeted biological therapies, and heavy psychological navigation frameworks.", 
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e9053?q=80&w=800", 
    deliverables: ["Chemotherapy Unit", "Oncology Consultations", "Early Screening Programs"],
    causes: "Complex genetic cellular mutations, prolonged environmental exposure to carcinogens, chronic untreated bodily inflammation, high radiation, or specific high-risk viral tracks.",
    homeCare: "Prioritize high-protein, calorie-dense nutrition to maintain body mass, strictly practice advanced hand hygiene to avoid opportunistic infections, and lean on dedicated family counseling networks.",
    prevention: "Strictly avoid tobacco usage and exposure to secondary smoke, limit ultra-processed food consumption, protect skin from intense ultraviolet exposure, and get vaccinated against oncogenic viruses like HPV and Hepatitis B.",
    faqs: [
      { q: "Are oncology consultations private?", a: "Yes, all consultations and treatment sessions are hosted in strictly confidential and private specialized suites." },
      { q: "Do you offer second opinions?", a: "Absolutely. We encourage and host multi-disciplinary tumor boards to confirm the absolute best treatment route." },
      { q: "What screening programs are available?", a: "We run comprehensive early detection packages for breast, cervical, prostate, and colorectal cancers year-round." }
    ] 
  },
  { 
    id: 6, 
    name: "Cardiology Services", 
    teaser: "Specialized care for structural heart health.", 
    desc: "Our cardiology department provides specialized care for heart health, including non-invasive diagnostics, advanced interventional treatments, and comprehensive long-term management of cardiovascular conditions.", 
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800", 
    deliverables: ["ECG / EKG Testing", "Cardiovascular Screening", "Hypertension Control Room"],
    causes: "Arterial plaque blockages, high serum cholesterol levels, chronic unmanaged hypertension, chronic stress patterns, and congenital structural heart vulnerabilities.",
    homeCare: "If experiencing mild chest pressure, sit down immediately, loosen tight clothing, maintain a steady breathing pattern, and completely avoid any strenuous physical exertion or walking.",
    prevention: "Maintain a heart-healthy diet rich in healthy omega fats and fibers, restrict simple sugar and sodium intake to under 2,300mg daily, avoid smoking, and strictly track your blood pressure scores.",
    faqs: [
      { q: "What are the signs of heart strain?", a: "Chest discomfort, unexplained shortness of breath, and chronic dizziness require immediate diagnostic tracking." },
      { q: "How long does a standard echo test take?", a: "An echocardiogram is completely non-invasive and typically takes between 30 to 45 minutes." },
      { q: "Can I manage hypertension completely through lifestyle?", a: "Mild cases benefit from diet and cardio, but advanced hypertension requires precise daily medical adjustments." }
    ] 
  },
  { 
    id: 7, 
    name: "Pediatrics", 
    teaser: "Dedicated healthcare paths from newborns to adolescents.", 
    desc: "Our pediatric services are dedicated to the health and well-being of children, from newborns to adolescents. We ensure a warm, fear-free, and friendly environment for our little patients.", 
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800", 
    deliverables: ["Infant Immunization Maps", "Childhood Growth Monitoring", "Pediatric Emergency Desk"],
    causes: "Immature immune system structures, rapid exposure to viral school hubs, genetic growth factors, and delicate nutritional imbalances during early developmental phases.",
    homeCare: "Keep a feverish child well-hydrated with water, milk, or oral rehydration solutions. Use lukewarm sponge baths to gently bring down high temperatures, and track exact intake and wet diaper counts.",
    prevention: "Ensure strict compliance with global and national childhood immunization maps, enforce regular proper handwashing habits, promote prolonged exclusive breastfeeding, and maintain optimal child nutrition.",
    faqs: [
      { q: "Are routine vaccines covered?", a: "Yes, we provide full childhood immunization programs following national and global health matrices." },
      { q: "At what age should children see a pediatrician?", a: "We track children from birth up to 18 years old, managing growth milestones and acute pediatric sicknesses." },
      { q: "Do you have a separate waiting area for sick kids?", a: "Yes, our clinic uses isolated well-child and sick-child spaces to eliminate cross-infections." }
    ] 
  },
  { 
    id: 8, 
    name: "Orthopedic Services", 
    teaser: "Treating conditions related to bones, joints, and muscles.", 
    desc: "Our orthopedic department specializes in treating conditions related to bones, joints, and muscles. From sports fractures to full joint replacements, our goal is to restore your absolute physical mobility.", 
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800", 
    
    deliverables: ["Fracture Management", "Joint Replacement Architecture", "Sports Injury Care"],
    causes: "High-impact accidents, repetitive joint mechanical wear and tear, age-related bone mineral density depletion (osteoporosis), and improper lifting techniques.",
    homeCare: "For sudden joint or muscle strains, instantly apply the R.I.C.E protocol: Rest the joint, apply Ice packs wrapped in cloth, compress with an elastic bandage, and Elevate the limb above heart level.",
    prevention: "Engage regularly in weight-bearing and muscle-strengthening routines, maintain adequate Calcium and Vitamin D levels, employ sound ergonomic seating postures, and stretch properly before sports.",
    faqs: [
      { q: "Do you offer physical therapy on site?", a: "Yes, complete physical therapy and orthopedic rehabilitation are built directly into our recovery paths." },
      { q: "When should I consider total knee replacement?", a: "When conservative options like therapy and medication no longer stop severe daily joint pain or structural damage." },
      { q: "How do you treat arthritic bone pain?", a: "We use tailored strategies ranging from joint injections and pain block management to modern arthroscopic fixes." }
      
    ] 
  },
  { 
    id: 9, 
    name: "Women's Health", 
    teaser: "Full spectrum gynecology, obstetrics, and fertility solutions.", 
    desc: "Amir Health provides a full spectrum of women's health services, including routine gynecology, high-risk obstetrics, prenatal care, and modern fertility solutions handled by sensitive specialists.", 
    image: "https://images.unsplash.com/photo-1590611936760-eeb9bc593025?q=80&w=800", 
    deliverables: ["Pre-Natal Packages", "Gynecological Screening", "Maternity Delivery Suites"],
    causes: "Hormonal fluctuation cycles, reproductive structural transformations, pregnancy physiological shifts, stress-induced endocrine changes, and specific microbial infections.",
    homeCare: "Track your reproductive health data accurately using structured calendars, stay warm and use gentle targeted heat compresses for mild pelvic cramps, and stay well hydrated.",
    prevention: "Attend periodic well-woman gynecology consults annually, perform monthly breast self-exams, consume sufficient folate during active reproductive windows, and follow clean personal hygiene metrics.",
    faqs: [
      { q: "When should I start pre-natal care?", a: "We highly recommend booking an executive clinical evaluation as soon as your pregnancy is confirmed." },
      { q: "Do you offer painless delivery options?", a: "Yes, advanced epidural anesthesia options are available and guided by our senior anesthesiology desk." },
      { q: "How often do I need a pap smear test?", a: "For women aged 21 to 65, a routine screening is globally recommended every 3 years." }
    ] 
  },
  { 
    id: 10, 
    name: "Inpatient Services", 
    teaser: "Exceptional care designed to ensure your recovery comfort.", 
    desc: "We provide exceptional inpatient care designed to ensure your health, absolute comfort, and quick recovery. Our wards feature state-of-the-art medical monitoring coupled with premium hospitality services.", 
    image: "https://images.unsplash.com/photo-1538108149393-fdfd8169687b?q=80&w=800", 
    deliverables: ["Private Patient Suites", "24/7 Dedicated Nursing", "Nutritional Recovery Meal Plans"],
    causes: "Complex multi-system infections, critical post-surgical observation needs, severe acute disease complications, or conditions requiring safe continuous intravenous medical infusions.",
    homeCare: "Pack essential personal items, bring along all ongoing pharmaceutical bottles in their original labeled packs, and assign one primary family member to manage official updates with the medical ward.",
    prevention: "Address escalating health anomalies via early outpatient tracking before conditions deteriorate to require complex multi-day hospital admissions.",
    faqs: [
      { q: "What are the visiting hours?", a: "Standard visiting hours are daily from 10:00 AM to 12:00 PM and from 4:00 PM to 7:00 PM to protect patient rest." },
      { q: "Can a family member stay overnight?", a: "Yes, our private luxury and executive suites include dedicated companion beds for one staying family member." },
      { q: "Are the patient meals customized?", a: "Absolutely. Every single meal is designed by clinical nutritionists to support the patient's specific healing path." }
    ] 
  }
];

export default function Services() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [quickMessage, setQuickMessage] = useState("");

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

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Services', link: '/Services' },
    { name: 'Login', link: '/login' },
    { name: 'Contact', link: '/contact' }
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

 

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!quickMessage.trim()) {
      toast.error("Please enter a message first.");
      return;
    }
    toast.success("Message sent to Amir Health desk!");
    setQuickMessage("");
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col justify-between">
      
      {/* 3D FLIP CARD INTERACTION STYLES */}
      <style>{`
        .flip-card {
          background-color: transparent;
          width: 100%;
          max-width: 235px;
          height: 295px;
          perspective: 1000px;
          margin: auto;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          box-shadow: 0 12px 35px -10px rgba(15, 23, 42, 0.09);
          position: absolute;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1.75rem;
          padding: 16px; /* Adjusted from 26px for tight mobile grid fitting */
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .flip-card-front, .flip-card-back {
            padding: 26px;
          }
        }
        .flip-card-front {
          background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
          border: 1px solid #e2e8f0;
          color: #1e3a8a;
          justify-content: center;
          align-items: center;
        }
        .flip-card-back {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          border: 1px solid #2563eb;
          color: white;
          transform: rotateY(180deg);
          justify-content: space-between;
          align-items: center;
        }
      `}</style>

      {/* ================= GLOBAL NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled || selectedService ? 'bg-white/95 backdrop-blur-xl shadow-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { navigate('/'); setSelectedService(null); setMobileMenuOpen(false); }} className="flex items-center gap-2 font-black text-2xl tracking-tighter cursor-pointer group">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <Activity size={22}/>
            </div>
            <span className="text-slate-900">AMIR<span className="text-blue-600">HEALTH</span></span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-8 text-[11px] font-black text-slate-600 uppercase tracking-[0.2em]">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.link === '/Services') {
                      setSelectedService(null);
                    } else {
                      navigate(item.link);
                    }
                  }}
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
                  onClick={() => { 
                    if (item.link === '/Services') {
                      setSelectedService(null);
                    } else {
                      navigate(item.link);
                    }
                    setMobileMenuOpen(false); 
                  }}
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

      {/* MAIN CONTAINER INTERFACES */}
      <div className="flex-grow">
        {!selectedService ? (
          /* ================= GRID SERVICES VIEW ================= */
          <div>
            
            {/* HERO SECTION WITH OVERLAY & INTEGRATED QUICK MESSAGE BOX */}
            <div className="relative w-full min-h-[720px] flex items-center overflow-hidden pt-24 mb-16">
              {/* Cinematic Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000" 
                  alt="Amir Health Medical Banner" 
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent h-20 bottom-0"></div>
              </div>

              {/* Grid content framework */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
                
                {/* Text Content Box */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Stethoscope size={14} /> Amir Health Medical Center
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                    A Legacy of Advanced <br />
                    <span className="text-blue-500">Medical Excellence</span>
                  </h1>
                  <p className="text-blue-50 text-sm md:text-base leading-relaxed max-w-x2">
                    Welcome to Amir Health Hospital, where world-class clinical expertise meets compassionate patient care. 
                    Our state-of-the-art medical hub is fully engineered with premium diagnostics and modern surgical suites.
                  </p>
                  <div className="flex items-center gap-6 pt-2 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5"><Activity size={14} className="text-blue-500" /> 24/7 Trauma Emergency</span>
                    <span className="flex items-center gap-1.5"><Heart size={14} className="text-red-500" /> Premium Specialized Care</span>
                  </div>
                </div>

                {/* Integrated "Get In Touch" Send Message Box */}
                <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
                  <div>
                    <h3 className="text-white text-base font-black tracking-tight">Get in Touch</h3>
                    <p className="text-slate-300 text-[11px]">Have questions? Send an instant message directly to our care agents.</p>
                  </div>
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <textarea 
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      placeholder="Write your quick health questions or message here..." 
                      rows="3"
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none transition-all"
                    ></textarea>
                    <button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                      <span>Send Message</span>
                      <Send size={12} />
                    </button>
                  </form>
                </div>

              </div>
            </div>

            {/* CARDS HEADER */}
            <div className="text-center mb-12 px-6">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Our Specialized Medical Departments</h2>
              <p className="text-slate-500 text-xs mt-2">Flip the cards to reveal immediate action items, or click Learn More below to view illness guidance maps.</p>
            </div>

            {/* RESPONSIVE 2-COLUMNS ON MOBILE GRID LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-3 sm:gap-x-6 justify-center justify-items-center">
              {servicesData.map((service) => (
                <div key={service.id} className="flip-card">
                  <div className="flip-card-inner">
                    
                    {/* FRONT FACE */}
                    <div className="flip-card-front">
                      <div className="p-2 sm:p-3 bg-white rounded-2xl shadow-sm text-blue-500 mb-3 sm:mb-4 border border-slate-100">
                        <Stethoscope size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <p className="font-black text-xs sm:text-sm tracking-tight text-center px-0.5 text-slate-800">
                        {service.name}
                      </p>
                    </div>
                    
                    {/* BACK FACE */}
                    <div className="flip-card-back">
                      <div className="my-auto px-0.5">
                        <p className="text-[10px] sm:text-[11px] font-medium leading-relaxed opacity-95 line-clamp-5 sm:line-clamp-none">
                          {service.teaser}
                        </p>
                      </div>
                      <button 
                        onClick={() => { 
                          setSelectedService(service); 
                          setOpenFaqIndex(null); 
                          window.scrollTo({ top: 0, behavior: 'smooth' }); 
                        }}
                        className="w-full bg-white text-blue-700 hover:bg-slate-950 hover:text-white font-bold text-[10px] sm:text-[11px] py-2 sm:py-2.5 rounded-xl shadow transition-all border-none cursor-pointer flex items-center justify-center gap-1"
                      >
                        Learn More <ArrowRight size={10} className="sm:w-3 sm:h-3" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ================= DETAIL VIEW ================= */
          <div className="max-w-6xl mx-auto px-6 sm:px-8 py-6 pt-32">
            
            <button 
              onClick={() => { 
                setSelectedService(null); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold text-xs uppercase bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 mb-8 cursor-pointer transition-all"
            >
              <ArrowLeft size={14} /> Back to Departments
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: MEDICAL PROTOCOLS */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-black text-blue-600 tracking-widest uppercase">Clinical Care Map</span>
                  <h2 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">{selectedService.name}</h2>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {selectedService.desc}
                </p>

                {/* CAUSES & TRIGGERS */}
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-5 space-y-2">
                  <h4 className="font-black text-amber-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert size={16} className="text-amber-600" /> Causes & Triggers
                  </h4>
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">
                    This clinical condition is primarily driven by {selectedService.causes} Early tracking minimizes severe progressive degradation vectors.
                  </p>
                </div>

                {/* BEFORE HOSPITAL ACTIONS */}
                <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-5 space-y-2">
                  <h4 className="font-black text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Home size={16} className="text-emerald-600" /> First-Aid & Home Actions
                  </h4>
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">
                    {selectedService.homeCare} Always avoid experimental medicine before a thorough laboratory diagnostics verification.
                  </p>
                </div>

                {/* LIFELONG PREVENTION MAP */}
                <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-5 space-y-2">
                  <h4 className="font-black text-blue-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-600" /> Long-term Prevention Framework
                  </h4>
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">
                    {selectedService.prevention} Early modification drastically curtails long-term clinical dependencies.
                  </p>
                </div>

                {/* OPERATIONS ROADMAP */}
                <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider mb-3">Core Procedures Performed</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedService.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                        <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DEPARTMENT FAQS */}
                <div className="pt-2">
                  <h4 className="font-black text-slate-900 mb-3 text-sm tracking-tight">Department FAQs (3 Insights)</h4>
                  <div className="space-y-2">
                    {selectedService.faqs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <button 
                          onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                          className="w-full flex justify-between items-center p-4 text-left font-bold text-slate-800 text-xs border-none bg-transparent cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                          <span className="pr-4">{faq.q}</span>
                          <ChevronDown size={14} className={`text-slate-400 transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 text-blue-600' : ''}`} />
                        </button>
                        {openFaqIndex === index && (
                          <div className="p-4 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/70 leading-relaxed font-medium">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: PHOTO DISPLAY + BOOKING CONSOLE */}
              <div className="lg:col-span-5 space-y-4 sticky top-28">
                <div className="rounded-2xl overflow-hidden shadow-md border-4 border-white aspect-[4/3] bg-slate-200">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Calendar size={14} /> Need Immediate Consultation?
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-4 font-medium">
                    Schedule a secure clinical slot instantly with our executive specialists in {selectedService.name}.
                  </p>
                  <button 
                    onClick={handleBookAppointment}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3.5 rounded-xl transition-all border-none cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    Book Appointment Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ================= GLOBAL FOOTER ================= */}
      <footer className="relative z-20 bg-slate-950 text-white pt-24 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20">
            
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
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-400 transition text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-pink-600 transition text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="text-slate-400 space-y-4 text-sm font-medium p-0 list-none">
                <li className="hover:text-blue-500 transition cursor-pointer" onClick={() => { setSelectedService(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About Our Clinic</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Specialist Doctors</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Medical Packages</li>
                <li className="hover:text-blue-500 transition cursor-pointer">Latest News</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Our Services</h4>
              <ul className="text-slate-400 space-y-4 text-sm font-medium p-0 list-none">
                <li className="hover:text-blue-500 transition cursor-pointer" onClick={() => { setSelectedService(servicesData[5]); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Cardiology Unit</li>
                <li className="hover:text-blue-500 transition cursor-pointer" onClick={() => { setSelectedService(servicesData[3]); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Diagnostic Lab</li>
                <li className="hover:text-blue-500 transition cursor-pointer" onClick={() => { setSelectedService(servicesData[0]); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>General Medical</li>
                <li className="hover:text-blue-500 transition cursor-pointer" onClick={() => { setSelectedService(servicesData[1]); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Emergency 24/7</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs">Contact Us</h4>
              <div className="space-y-6 text-slate-400 text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 shrink-0"><MapPin size={18}/></div>
                  <span>Bole Medhanialem, <br />Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 shrink-0"><Phone size={18}/></div>
                  <span>+251 911 00 00 00</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 shrink-0"><Mail size={18}/></div>
                  <span>info@amirhealth.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
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
}