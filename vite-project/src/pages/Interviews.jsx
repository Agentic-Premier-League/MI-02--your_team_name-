import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, MoreHorizontal, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCandidates } from '../context/CandidateContext';

const STAGES = ['Applied', 'Screening', 'Technical', 'HR Round', 'Hired'];

const Interviews = () => {
  const { candidates, updateCandidateStatus } = useCandidates();
  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to prevent the dragged element from disappearing
    setTimeout(() => {
      e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
    setDraggedId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (draggedId) {
      updateCandidateStatus(draggedId, targetStatus);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="text-blue-600" size={24} />
            Interview Workflow
          </h1>
          <p className="text-slate-500 mt-1">Manage candidate pipeline</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-blue-600/20 flex items-center gap-2">
          <Plus size={18} />
          Schedule Interview
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 h-full">
        {STAGES.map((stage) => {
          // 'Interview Pending' goes to Screening or Technical usually. Map statuses manually for demo.
          // Since mock data has different statuses, let's map them to these columns.
          let columnCandidates = candidates.filter(c => {
            if (stage === 'Applied' && c.status === 'Applied') return true;
            if (stage === 'Screening' && (c.status === 'Screening' || c.status === 'Interview Pending')) return true;
            if (stage === 'Technical' && c.status === 'Technical') return true;
            if (stage === 'HR Round' && c.status === 'HR Round') return true;
            if (stage === 'Hired' && c.status === 'Hired') return true;
            if (stage === 'Rejected' && c.status === 'Rejected') return true;
            return false;
          });

          return (
            <div 
              key={stage} 
              className="flex-shrink-0 w-80 bg-slate-100 rounded-xl flex flex-col max-h-full border border-slate-200"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="p-4 border-b border-slate-200 bg-slate-50/80 rounded-t-xl flex justify-between items-center sticky top-0">
                <h3 className="font-semibold text-slate-700">{stage}</h3>
                <span className="bg-white text-slate-500 text-xs px-2 py-1 rounded-full shadow-sm border border-slate-200 font-medium">
                  {columnCandidates.length}
                </span>
              </div>
              
              <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-3 min-h-[150px]">
                {columnCandidates.map(candidate => (
                  <motion.div
                    layoutId={candidate.id}
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate.id)}
                    onDragEnd={handleDragEnd}
                    className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <img src={candidate.avatar} alt={candidate.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-800 text-sm leading-tight">{candidate.name}</p>
                          <p className="text-[11px] text-slate-500">{candidate.role}</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    {(stage === 'Screening' || stage === 'Technical' || stage === 'HR Round') && (
                      <div className="bg-slate-50 rounded-md p-2 mt-3 border border-slate-100">
                        <div className="flex items-center gap-2 text-[11px] text-slate-600 mb-1">
                          <CalendarIcon size={12} className="text-blue-500" />
                          <span>Tomorrow, 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-600">
                          <Video size={12} className="text-blue-500" />
                          <span>Google Meet</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {columnCandidates.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm font-medium">
                    Drop candidates here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Interviews;
