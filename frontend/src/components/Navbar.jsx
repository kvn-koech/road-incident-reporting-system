import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2.5 bg-emerald-500 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                SALAMA<span className="text-emerald-500">ROAD</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-400 transition-colors">Home</Link>
              <Link to="/dashboard" className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-400 transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/report" className="btn-primary shimmer !px-6 !py-2.5 flex items-center space-x-2 text-xs !rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span>REPORT INCIDENT</span>
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 rounded-xl hover:bg-white/5 transition-colors">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-t border-white/5 mt-2"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 font-bold">Home</Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 font-bold">Authority Login</Link>
              <Link to="/report" onClick={() => setIsOpen(false)} className="block px-4 py-4 rounded-xl bg-red-600 text-white font-black text-center shadow-lg shadow-red-900/20">REPORT INCIDENT</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
