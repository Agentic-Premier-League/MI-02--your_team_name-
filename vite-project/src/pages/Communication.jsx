import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCandidates } from '../context/CandidateContext';

const Communication = () => {
  const { candidates } = useCandidates();
  const [activeChat, setActiveChat] = useState(candidates[0]);
  const [message, setMessage] = useState('');

  const chatHistory = [
    { id: 1, sender: 'candidate', text: 'Hi, I saw the recent update on my application status. Could you provide more details about the technical round?', time: '10:30 AM' },
    { id: 2, sender: 'recruiter', text: 'Hello! Yes, the technical round will focus on system design and React architecture. It will be a 60-minute session with our Senior Engineering Manager.', time: '11:15 AM' },
    { id: 3, sender: 'candidate', text: 'That sounds great. Should I prepare any specific portfolio projects to showcase?', time: '11:45 AM' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <MessageSquare className="text-blue-600" size={24} />
          AI Communication
        </h1>
        <p className="text-slate-500 mt-1">Automated messaging and chat assistance</p>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex h-0">
        {/* Contacts Sidebar */}
        <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full px-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id}
                onClick={() => setActiveChat(candidate)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-colors flex gap-3 ${activeChat.id === candidate.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'hover:bg-slate-100 border-l-4 border-l-transparent'}`}
              >
                <div className="relative">
                  <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">{candidate.name}</h4>
                    <span className="text-[10px] text-slate-400">11:45 AM</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">That sounds great. Should I prepare...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-3">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-slate-800">{activeChat.name}</h3>
                <p className="text-xs text-slate-500">{activeChat.role} • <span className="text-emerald-500">Online</span></p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              <User size={16} /> View Profile
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 flex flex-col gap-4">
            <div className="text-center text-xs text-slate-400 my-2 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-slate-200"></span>
              Today
              <span className="h-px w-8 bg-slate-200"></span>
            </div>
            
            {chatHistory.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'recruiter' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'recruiter' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                  <Clock size={10} /> {msg.time}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2 mb-3">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 border border-cyan-100 text-cyan-700 rounded-full text-xs font-medium hover:bg-cyan-100 transition-colors">
                <Sparkles size={12} /> Suggest Reply
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-full text-xs font-medium hover:bg-slate-200 transition-colors">
                Interview Prep Template
              </button>
            </div>
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message or use AI suggestions..." 
                className="w-full pl-4 pr-12 py-3 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
              <button className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
