import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle, AlertCircle, Search, Download } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard: React.FC = () => {
  const [activeAgency, setActiveAgency] = useState('All');
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/incidents/${id}/status`, { status: newStatus });
      fetchIncidents();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Authority Dashboard</h1>
          <p className="text-gray-400 text-lg">Multi-Agency Incident Management System</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <div className="p-1 bg-white/5 rounded-xl border border-white/10 flex gap-1">
            {['All', 'Police', 'KeNHA', 'NTSA'].map(agency => (
              <button
                key={agency}
                onClick={() => setActiveAgency(agency)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeAgency === agency ? 'bg-brand-primary text-white' : 'hover:bg-white/5 text-gray-400'
                }`}
              >
                {agency}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Incident Grid */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading incidents...</div>
        ) : incidents.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No reports found.</div>
        ) : incidents
          .filter(inc => activeAgency === 'All' || inc.agency === activeAgency)
          .map((incident, i) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start hover:border-white/20 transition-all"
            >
              <div className={`p-4 rounded-xl ${
                incident.status === 'Resolved' ? 'bg-green-500/10 text-green-500' : 
                incident.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {incident.status === 'Resolved' ? <CheckCircle className="w-8 h-8" /> : 
                 incident.status === 'In Progress' ? <Clock className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xl font-bold uppercase">{incident.type}</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400">
                    ID: #{incident.id}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    incident.status === 'Resolved' ? 'bg-green-500/20 text-green-500' : 
                    incident.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {incident.status}
                  </span>
                </div>
                <div className="text-gray-300 font-medium mb-1 flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" /> {incident.location}
                </div>
                <p className="text-gray-400 text-sm mb-4">{incident.description}</p>
                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {incident.time}</span>
                  <span className="flex items-center gap-1 text-brand-primary"><Shield className="w-3 h-3" /> Response Lead: {incident.agency}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-auto">
                {incident.status === 'Reported' && (
                  <button 
                    onClick={() => updateStatus(incident.id, 'In Progress')}
                    className="px-4 py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg hover:bg-blue-500 hover:text-white transition-all text-sm font-bold"
                  >
                    Mark In Progress
                  </button>
                )}
                {incident.status === 'In Progress' && (
                  <button 
                    onClick={() => updateStatus(incident.id, 'Resolved')}
                    className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500 hover:text-white transition-all text-sm font-bold"
                  >
                    Mark Resolved
                  </button>
                )}
                <button className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 transition-all text-sm">
                  View Evidence
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
