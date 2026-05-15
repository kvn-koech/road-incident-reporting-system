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

const Report: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    image: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
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
      <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="glass p-12 rounded-3xl"
        >
          <CheckCircle2 className="w-20 h-20 text-brand-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Report Submitted Successfully</h2>
          <p className="text-gray-400 mb-8">
            Thank you for helping keep our roads safe. Relevant agencies (Police, KeNHA) have been notified and will respond shortly.
          </p>
          <button onClick={() => window.location.href = '/'} className="btn-primary w-full">
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Report an Incident</h1>
          <p className="text-gray-400">Step {step} of 3</p>
          <div className="mt-4 flex gap-2 justify-center">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${i <= step ? 'bg-brand-primary' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold">Select Incident Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {incidentTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                        formData.type === type.id 
                          ? 'border-brand-primary bg-brand-primary/10' 
                          : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <type.icon className={`w-8 h-8 mb-4 ${type.color}`} />
                      <div className="font-bold">{type.label}</div>
                      <div className="text-xs text-gray-500 mt-1">Notifies: {type.agencies.join(', ')}</div>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!formData.type}
                  onClick={handleNext}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold">Location & Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Location / Landmark</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="e.g. Near Westlands roundabout"
                        className="input-field pl-12"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea
                      placeholder="Provide more details about the situation..."
                      className="input-field h-32 resize-none"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={handleBack} className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                  <button
                    type="button"
                    disabled={!formData.location || !formData.description}
                    onClick={handleNext}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold">Attach Photo (Optional)</h3>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-brand-primary/50 transition-all cursor-pointer bg-white/5">
                  <Camera className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Click to upload or take a photo</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
                
                <div className="bg-brand-primary/10 border border-brand-primary/20 p-4 rounded-xl flex gap-3">
                  <ShieldCheckIcon className="w-6 h-6 text-brand-primary flex-shrink-0" />
                  <p className="text-sm text-gray-400">
                    Your report will be sent directly to the National Police Service and relevant road authorities. Providing a photo helps them respond faster.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={handleBack} className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-all">
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-danger flex-1 flex items-center justify-center gap-2 shadow-red-900/40"
                  >
                    Submit Official Report <Send className="w-5 h-5" />
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

function ShieldCheckIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default Report;
