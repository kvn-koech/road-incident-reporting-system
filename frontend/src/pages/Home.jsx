import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Truck, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-24 pb-12 bg-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 lg:py-48">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <ShieldCheck className="w-4 h-4" />
              <span className="uppercase tracking-widest text-[10px]">Official Road Safety Portal of Kenya</span>
            </div>
            <h1 className="text-6xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.9]">
              Protecting <br />
              <span className="text-gradient-gold">Kenyan Roads</span>
            </h1>
            <p className="text-xl lg:text-3xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed font-light italic">
              "Ensuring every journey is safe through real-time reporting and rapid multi-agency response."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/report" className="btn-primary shimmer group flex items-center space-x-4 w-full sm:w-auto px-10 py-5">
                <AlertTriangle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span className="text-lg">Report Incident</span>
              </Link>
              <Link to="/dashboard" className="btn-secondary flex items-center space-x-4 w-full sm:w-auto group px-10 py-5">
                <Users className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                <span className="text-lg">Authority Login</span>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[AlertTriangle, ShieldCheck, MapPin, Truck].map((Icon, idx) => (
            <motion.div
              key={idx}
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 5 + idx, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className={`absolute hidden lg:block text-emerald-500/20`}
              style={{
                top: `${20 + idx * 20}%`,
                left: `${10 + idx * 25}%`,
              }}
            >
              <Icon size={120 + idx * 20} strokeWidth={0.5} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Active Reports', value: '1,284', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
            { label: 'Agencies Responding', value: '3+', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
            { label: 'Incidents Resolved', value: '8,432', icon: Truck, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Lives Impacted', value: '50k+', icon: Users, color: 'text-red-400', bg: 'bg-red-400/10' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-10 text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-2xl ${stat.bg} mb-6 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                <stat.icon className="w-10 h-10" />
              </div>
              <div className="text-4xl font-black mb-2 tracking-tight">{stat.value}</div>
              <div className="text-gray-500 font-medium uppercase tracking-widest text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Preview Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="glass rounded-[2rem] p-8 lg:p-16 relative overflow-hidden border-white/5">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
                Real-time <br />
                <span className="text-emerald-400">Safety Map</span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                Stay informed about current road conditions. Our live map shows verified reports from across the country, helping you plan your journey safely.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Accidents & Medical Emergencies', color: 'bg-red-500' },
                  { label: 'Road Obstacles & Debris', color: 'bg-amber-500' },
                  { label: 'KeNHA Maintenance Works', color: 'bg-blue-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-default">
                    <div className={`w-3 h-3 ${item.color} rounded-full animate-pulse shadow-[0_0_10px_${item.color}]`} />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-[500px] glass-card relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="text-center p-8 glass rounded-2xl border-white/20 backdrop-blur-xl scale-90 group-hover:scale-100 transition-transform duration-500">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-red-500 animate-bounce" />
                  </div>
                  <h3 className="font-bold text-2xl mb-2">Interactive Map</h3>
                  <p className="text-gray-400 text-sm mb-6">Live coverage across 47 counties</p>
                  <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest transition-all">Coming Soon</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
