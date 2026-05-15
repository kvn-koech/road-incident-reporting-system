import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, CheckCircle, AlertCircle, Search, Download, Filter, MapPin, Activity, UserCheck, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [activeAgency, setActiveAgency] = useState('All');
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/incidents`);
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/incidents/${id}/status`, { status: newStatus });
      fetchIncidents();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredIncidents = useMemo(() => {
    return incidents
      .filter(inc => activeAgency === 'All' || inc.agency === activeAgency)
      .filter(inc => 
        inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [incidents, activeAgency, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: incidents.length,
      pending: incidents.filter(i => i.status === 'Reported').length,
      active: incidents.filter(i => i.status === 'In Progress').length,
      resolved: incidents.filter(i => i.status === 'Resolved').length,
    };
  }, [incidents]);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-mesh">
      {/* Header & Stats Overview */}
      <div className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/80">Live Data Sync Active</span>
            </div>
            <h1 className="text-6xl font-black mb-4 tracking-tighter">Command <span className="text-emerald-400">Center</span></h1>
            <p className="text-gray-400 text-xl font-light">Real-time situational awareness for Kenyan roads.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:w-2/3">
            {[
              { label: 'New Reports', value: stats.pending, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { label: 'In Response', value: stats.active, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Resolved', value: stats.resolved, icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { label: 'Total Logs', value: stats.total, icon: Shield, color: 'text-gray-400', bg: 'bg-white/5' },
            ].map((s, idx) => (
              <div key={idx} className="glass-card p-5 border-white/5">
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black tracking-tight">{s.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by location, type, or description..." 
              className="input-field pl-14 !py-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="p-1.5 glass rounded-2xl flex gap-1 border-white/5">
              {['All', 'Police', 'KeNHA', 'NTSA'].map(agency => (
                <button
                  key={agency}
                  onClick={() => setActiveAgency(agency)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeAgency === agency ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'hover:bg-white/5 text-gray-500'
                  }`}
                >
                  {agency}
                </button>
              ))}
            </div>
            <button className="btn-secondary !px-6 flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline font-black text-xs tracking-widest uppercase">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-6 h-6 text-emerald-500 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Establishing Secure Link</p>
              <p className="text-gray-600 text-[10px] font-bold">Connecting to National Response Database...</p>
            </div>
          </div>
        ) : filteredIncidents.length === 0 ? (
          <div className="glass-card p-32 text-center border-white/5 bg-white/[0.01] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Shield className="w-24 h-24 text-gray-800 mx-auto mb-8 group-hover:scale-110 transition-transform duration-700" />
            <p className="text-3xl text-gray-400 font-black tracking-tight mb-4">No Incidents Detected</p>
            <p className="text-gray-600 font-light text-lg max-w-md mx-auto">All sectors currently reporting clear. Situation normal across monitored routes.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredIncidents.map((incident, i) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-8 flex flex-col md:flex-row gap-8 items-start group relative overflow-hidden border-white/5 hover:border-emerald-500/20"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`p-6 rounded-[2rem] flex-shrink-0 shadow-inner ${
                  incident.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500 shadow-emerald-500/5' : 
                  incident.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 shadow-blue-500/5' : 'bg-amber-500/10 text-amber-500 shadow-amber-500/5'
                }`}>
                  {incident.status === 'Resolved' ? <CheckCircle className="w-12 h-12" /> : 
                   incident.status === 'In Progress' ? <Clock className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <span className="text-3xl font-black uppercase tracking-tighter">{incident.type}</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      REF: {incident.id.toString().padStart(5, '0')}
                    </span>
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      incident.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-500' : 
                      incident.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        incident.status === 'Resolved' ? 'bg-emerald-500' : 
                        incident.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500 animate-pulse'
                      }`} />
                      {incident.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xl font-bold text-gray-200 mb-4">
                    <MapPin className="w-6 h-6 text-emerald-500" />
                    {incident.location}
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed font-light mb-8 text-lg max-w-4xl italic">"{incident.description}"</p>
                  
                  <div className="flex flex-wrap items-center gap-10 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2.5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <Clock className="w-4 h-4" /> 
                      <span>Logged: {incident.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                      <Shield className="w-4 h-4" /> 
                      <span>Lead Agency: {incident.agency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-64 pt-6 md:pt-0">
                  {incident.status === 'Reported' && (
                    <button 
                      onClick={() => updateStatus(incident.id, 'In Progress')}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all font-black text-xs tracking-widest uppercase shadow-xl shadow-blue-900/40 hover:-translate-y-1"
                    >
                      Acknowledge & Deploy
                    </button>
                  )}
                  {incident.status === 'In Progress' && (
                    <button 
                      onClick={() => updateStatus(incident.id, 'Resolved')}
                      className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-black rounded-2xl transition-all font-black text-xs tracking-widest uppercase shadow-xl shadow-emerald-900/40 hover:-translate-y-1"
                    >
                      Close Incident
                    </button>
                  )}
                  <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl transition-all font-black text-xs tracking-widest uppercase border border-white/5 flex items-center justify-center gap-3">
                    <Download className="w-4 h-4" /> Evidence Pack
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
