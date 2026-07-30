import React from 'react';
import { Search, MapPin, Calendar, ArrowRight, User, Menu } from 'lucide-react';

const HospitalLandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-blue-900">RightGuide</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#" className="text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600 transition">Doctors</a>
          <a href="#" className="hover:text-blue-600 transition">Services</a>
          <a href="#" className="hover:text-blue-600 transition">About</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block font-semibold text-slate-700">Login</button>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Sign Up
          </button>
          <Menu className="md:hidden w-6 h-6" />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            24/7 Medical Support Available
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] text-slate-900">
            Your Health Is Our <br />
            <span className="text-blue-600">Top Priority.</span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            Find the best doctors and book appointments instantly. Professional care for you and your loved ones, all in one place.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0">
              <Search className="text-blue-600 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search Doctor..." 
                className="w-full outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4">
              <MapPin className="text-blue-600 w-5 h-5" />
              <select className="w-full outline-none bg-transparent text-slate-700">
                <option>Addis Ababa, ET</option>
                <option>New York, USA</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition flex items-center justify-center">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                12k+
              </div>
            </div>
            <div className="text-sm">
              <p className="font-bold text-slate-900">Happy Patients</p>
              <p className="text-slate-500">Trust our medical services</p>
            </div>
          </div>
        </div>

        {/* Hero Image / Card Section */}
        <div className="relative">
          <div className="w-full aspect-square bg-blue-600 rounded-[3rem] relative overflow-hidden shadow-2xl">
             {/* እዚህ ጋር የዶክተር ምስል ይገባል */}
             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
             <img 
               src="https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800" 
               alt="Doctor" 
               className="w-full h-full object-cover"
             />
          </div>

          {/* Floating Cards */}
          <div className="absolute -left-10 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce-slow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Next Visit</p>
              <p className="font-bold text-slate-900">May 24, 2024</p>
            </div>
          </div>

          <div className="absolute -right-6 bottom-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-50 space-y-3 w-48">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Medical Report
             </div>
             <div className="space-y-2">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full w-2/3 bg-blue-600 rounded-full"></div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full w-1/2 bg-blue-400 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HospitalLandingPage;