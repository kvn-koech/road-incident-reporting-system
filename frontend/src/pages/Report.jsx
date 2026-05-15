import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, AlertTriangle, Send, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const incidentTypes = [
  { id: 'accident', label: 'Road Accident', icon: AlertTriangle, color: 'text-red-500', agencies: ['Police', 'NTSA'] },
  { id: 'obstacle', label: 'Road Obstacle', icon: AlertTriangle, color: 'text-amber-500', agencies: ['KeNHA'] },
  { id: 'pothole', label: 'Pothole / Damage', icon: AlertTriangle, color: 'text-orange-500', agencies: ['KeNHA'] },
  { id: 'stalled', label: 'Stalled Vehicle', icon: AlertTriangle, color: 'text-yellow-500', agencies: ['Police', 'NTSA'] },
];

const Report = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    image: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/incidents`, {
        type: formData.type,
        location: formData.location,
        description: formData.description
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto text-center min-h-screen bg-mesh">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="glass-card p-12 rounded-[2.5rem]"
        >
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-4xl font-black mb-4 tracking-tight">Report Logged</h2>
          <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
            Your report has been broadcasted to the National Police and KeNHA response teams. 
            Thank you for helping us maintain safe roads.
          </p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full shadow-xl">
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-mesh">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-4 tracking-tight"
          >
            Report an <span className="text-emerald-400">Incident</span>
          </motion.h1>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-8">Step {step} of 3</p>
          <div className="flex gap-3 justify-center">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-16 rounded-full transition-all duration-500 ${i <= step ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-10 relative overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                  <h3 className="text-2xl font-bold tracking-tight">Nature of Incident</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {incidentTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={`p-8 rounded-2xl border-2 text-left transition-all duration-300 group relative overflow-hidden ${
                        formData.type === type.id 
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                          : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <type.icon className={`w-10 h-10 mb-6 transition-transform group-hover:scale-110 ${type.color}`} />
                      <div className="font-bold text-lg mb-1">{type.label}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Agency: {type.agencies.join(', ')}</div>
                      {formData.type === type.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!formData.type}
                  onClick={handleNext}
                  className="btn-primary shimmer w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span>Continue to Location</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                  <h3 className="text-2xl font-bold tracking-tight">Location & Details</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Road Name / Landmark</label>
                    <div className="relative group">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="e.g. A8 Highway, near Westlands Roundabout"
                        className="input-field pl-14"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Situation Description</label>
                    <textarea
                      placeholder="Please describe the incident in detail for effective response..."
                      className="input-field h-40 resize-none py-5"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={handleBack} className="btn-secondary px-6 flex items-center gap-2 group">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
                  </button>
                  <button
                    type="button"
                    disabled={!formData.location || !formData.description}
                    onClick={handleNext}
                    className="btn-primary shimmer flex-1 flex items-center justify-center gap-3 disabled:opacity-50 group"
                  >
                    <span>Final Step</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                  <h3 className="text-2xl font-bold tracking-tight">Review & Evidence</h3>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-gray-500 text-xs font-bold uppercase">Type</span>
                    <span className="font-bold text-emerald-400 uppercase">{formData.type}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-gray-500 text-xs font-bold uppercase">Location</span>
                    <span className="font-bold">{formData.location}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-gray-500 text-xs font-bold uppercase block mb-2">Description</span>
                    <p className="text-sm text-gray-300 leading-relaxed italic">"{formData.description}"</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-500 cursor-pointer group bg-white/[0.02]">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <p className="font-bold mb-1">Attach Photo Evidence</p>
                  <p className="text-gray-500 text-xs">Optional: Helps response teams prioritize</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
                
                <div className="flex gap-4">
                  <button type="button" onClick={handleBack} className="btn-secondary px-6">
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-danger shimmer flex-1 flex items-center justify-center gap-3 group py-5"
                  >
                    <span className="tracking-widest font-black uppercase text-sm">Submit Official Log</span>
                    <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

function ShieldCheckIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default Report;
