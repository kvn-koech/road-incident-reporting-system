import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Truck, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-kenya-green/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-kenya-red/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Safer Roads for <span className="text-gradient-gold">Every Kenyan</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Report accidents, obstacles, and hazards in real-time. Direct integration with National Police, KeNHA, and NTSA for rapid response.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/report" className="btn-primary flex items-center space-x-2 w-full sm:w-auto">
                <AlertTriangle className="w-5 h-5" />
                <span>Report an Incident</span>
              </Link>
              <Link to="/dashboard" className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all w-full sm:w-auto border border-white/10">
                Authority Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Active Reports', value: '1,284', icon: AlertTriangle, color: 'text-brand-warning' },
            { label: 'Agencies Responding', value: '3+', icon: ShieldCheck, color: 'text-kenya-green' },
            { label: 'Incidents Resolved', value: '8,432', icon: Truck, color: 'text-brand-primary' },
            { label: 'Lives Impacted', value: '50k+', icon: Users, color: 'text-kenya-red' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl text-center group hover:border-brand-primary/50 transition-all"
            >
              <div className={`inline-flex p-3 rounded-xl bg-white/5 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Preview Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Real-time Safety Map</h2>
              <p className="text-gray-400 mb-8">
                Stay informed about current road conditions. Our live map shows verified reports from across the country, helping you plan your journey safely.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-kenya-red rounded-full animate-pulse" />
                  <span>Accidents & Medical Emergencies</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-warning rounded-full animate-pulse" />
                  <span>Road Obstacles & Debris</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>KeNHA Maintenance Works</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full h-[400px] bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i10!2i600!3i400!2m3!1e0!2sm!3i600000000!3m8!2sen!3ske!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover" />
              <div className="z-10 text-center p-6 glass rounded-xl border-white/20">
                <MapPin className="w-12 h-12 text-brand-danger mx-auto mb-4 animate-bounce" />
                <p className="font-semibold text-lg">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-400">Loading satellite data for Kenya...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
