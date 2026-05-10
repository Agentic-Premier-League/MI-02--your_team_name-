import React, { useState } from 'react';
import { Trophy, ArrowUpDown, Brain, MessageSquare, Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCandidates } from '../context/CandidateContext';

const Ranking = () => {
  const { candidates } = useCandidates();
  const [sortBy, setSortBy] = useState('matchScore');
  const [sortOrder, setSortOrder] = useState('desc');

  // Calculate composite scores for demonstration
  const rankedCandidates = [...candidates].sort((a, b) => {
    let scoreA = a[sortBy];
    let scoreB = b[sortBy];
    if (sortBy === 'overall') {
      scoreA = (a.matchScore + a.communicationScore + a.cultureFitScore) / 3;
      scoreB = (b.matchScore + b.communicationScore + b.cultureFitScore) / 3;
    }
    
    if (sortOrder === 'desc') return scoreB - scoreA;
    return scoreA - scoreB;
  });

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <ArrowUpDown size={14} className="text-slate-300 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return <ArrowUpDown size={14} className={`text-blue-500 ml-1 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />;
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="text-amber-500" size={24} />
            Talent Ranking
          </h1>
          <p className="text-slate-500 mt-1">AI-driven leaderboard based on multi-dimensional analysis</p>
        </div>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
          <Brain size={16} className="text-blue-600" />
          Recalculate Scores
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="py-4 px-6 font-medium w-16">Rank</th>
                <th className="py-4 px-6 font-medium">Candidate</th>
                <th 
                  className="py-4 px-6 font-medium cursor-pointer group hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('matchScore')}
                >
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-2 text-slate-400" />
                    Skills Match <SortIcon column="matchScore" />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 font-medium cursor-pointer group hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('communicationScore')}
                >
                  <div className="flex items-center">
                    <MessageSquare size={16} className="mr-2 text-slate-400" />
                    Communication <SortIcon column="communicationScore" />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 font-medium cursor-pointer group hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('cultureFitScore')}
                >
                  <div className="flex items-center">
                    <Award size={16} className="mr-2 text-slate-400" />
                    Culture Fit <SortIcon column="cultureFitScore" />
                  </div>
                </th>
                <th 
                  className="py-4 px-6 font-medium cursor-pointer group hover:bg-slate-100 transition-colors bg-blue-50/50"
                  onClick={() => handleSort('overall')}
                >
                  <div className="flex items-center text-blue-700">
                    <Brain size={16} className="mr-2" />
                    Overall AI Score <SortIcon column="overall" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rankedCandidates.map((candidate, idx) => {
                const overall = ((candidate.matchScore + candidate.communicationScore + candidate.cultureFitScore) / 3).toFixed(1);
                
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={candidate.id} 
                    className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                        ${idx === 0 ? 'bg-amber-100 text-amber-600 border border-amber-200' : 
                          idx === 1 ? 'bg-slate-200 text-slate-600 border border-slate-300' : 
                          idx === 2 ? 'bg-orange-100 text-orange-700 border border-orange-200' : 
                          'bg-slate-100 text-slate-500'}`}
                      >
                        {idx + 1}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                        <div>
                          <p className="font-semibold text-slate-800">{candidate.name}</p>
                          <p className="text-xs text-slate-500">{candidate.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${candidate.matchScore}%` }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{candidate.matchScore}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${candidate.communicationScore}%` }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{candidate.communicationScore}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${candidate.cultureFitScore}%` }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{candidate.cultureFitScore}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 bg-blue-50/30">
                      <span className="text-lg font-bold text-blue-700">{overall}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
