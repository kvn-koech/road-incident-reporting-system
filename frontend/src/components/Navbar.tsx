import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, LayoutDashboard, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-kenya-green rounded-lg group-hover:bg-brand-primary transition-colors">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                SALAMA<span className="text-brand-primary">ROAD</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-brand-primary px-3 py-2 transition-colors">Home</Link>
              <Link to="/report" className="flex items-center space-x-1 bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white px-4 py-2 rounded-full transition-all border border-brand-danger/20">
                <AlertTriangle className="w-4 h-4" />
                <span>Report Incident</span>
              </Link>
              <Link to="/dashboard" className="flex items-center space-x-1 hover:text-brand-primary px-3 py-2 transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span>Authority Login</span>
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-white/10">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/5 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-white/5">Home</Link>
            <Link to="/report" className="block px-3 py-2 rounded-md bg-brand-danger/20 text-brand-danger">Report Incident</Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-white/5">Authority Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
