import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, Brain, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCandidates } from '../context/CandidateContext';

const Candidates = () => {
  const { candidates } = useCandidates();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Candidates</h1>
          <p className="text-slate-500">Manage and screen applicants</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, role, skills..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Sort</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6">
        {filteredCandidates.map((candidate, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={candidate.id} 
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-lg transition-all group flex flex-col cursor-pointer"
            onClick={() => setSelectedCandidate(candidate)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div>
                  <h3 className="font-bold text-slate-800">{candidate.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{candidate.role}</p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-md flex flex-col items-center justify-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Match</span>
                <span className={`text-sm font-bold ${candidate.matchScore >= 90 ? 'text-emerald-500' : 'text-blue-500'}`}>
                  {candidate.matchScore}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={14} /> {candidate.location}
              </div>
              <div className="flex items-center gap-1">
                <FileText size={14} /> {candidate.experience}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 flex-1">
              {candidate.skills.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 3 && (
                <span className="px-2.5 py-1 bg-slate-50 text-slate-400 rounded-md text-xs font-medium border border-slate-200 border-dashed">
                  +{candidate.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase 
                ${candidate.status === 'Hired' ? 'bg-emerald-100 text-emerald-700' : 
                  candidate.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                  candidate.status === 'Interview Pending' ? 'bg-purple-100 text-purple-700' :
                  'bg-blue-100 text-blue-700'}`}>
                {candidate.status}
              </span>
              
              <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                <Brain size={14} /> AI Analyze
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Candidate Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedCandidate(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800">Candidate Profile</h2>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 border-r border-slate-100 pr-0 md:pr-6 flex flex-col items-center text-center">
                  <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4" />
                  <h3 className="text-xl font-bold text-slate-800">{selectedCandidate.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{selectedCandidate.role}</p>
                  
                  <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-600">Match Score</span>
                      <span className="text-lg font-bold text-blue-600">{selectedCandidate.matchScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${selectedCandidate.matchScore}%` }} />
                    </div>
                  </div>
                  
                  <div className="w-full text-left space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Experience</span>
                      <span className="font-medium text-slate-700">{selectedCandidate.experience}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Location</span>
                      <span className="font-medium text-slate-700">{selectedCandidate.location}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-slate-400">Status</span>
                      <span className="font-medium text-slate-700">{selectedCandidate.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 flex flex-col gap-6">
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                      <Brain size={120} className="text-blue-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <Brain className="text-blue-600" size={20} />
                      <h4 className="font-bold text-slate-800">AI Summary</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                      {selectedCandidate.summary}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Verified Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm shadow-blue-600/20">
                      Schedule Interview
                    </button>
                    <button className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors shadow-sm">
                      View Full Resume
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Candidates;
