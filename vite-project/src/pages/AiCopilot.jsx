import React, { useState, useEffect } from 'react';
import { Brain, Mic, Video, User, AlertCircle, Sparkles, Activity, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const AiCopilot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [sentiment, setSentiment] = useState(85);
  const [transcription, setTranscription] = useState([]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setSentiment(prev => {
          const change = Math.floor(Math.random() * 5) - 2;
          return Math.min(100, Math.max(60, prev + change));
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording && transcription.length === 0) {
      setTimeout(() => {
        setTranscription(prev => [...prev, { speaker: 'Candidate', text: "Yes, in my previous role I led the migration to React 18, which improved our render performance by about 30%.", time: '00:15' }]);
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto pb-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Brain className="text-blue-600" size={24} />
            AI Interview Copilot
          </h1>
          <p className="text-slate-500 mt-1">Real-time interview assistance and sentiment analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${isRecording ? 'bg-red-50 text-red-600 border-red-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
            <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`}></span>
            {isRecording ? 'Live Analysis Active' : 'Analysis Paused'}
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-0">
        {/* Left Column: Video & Transcription */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Mock Video Feed */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden relative aspect-video shadow-lg border border-slate-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <User size={80} className="text-slate-700" />
            </div>
            
            {/* Overlay UI */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                <Video size={14} className="text-blue-400" /> Candidate Camera
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/10">
                <h3 className="font-semibold text-sm">Sarah Jenkins</h3>
                <p className="text-xs text-slate-300">Senior Frontend Engineer Role</p>
              </div>
              
              <button 
                onClick={toggleRecording}
                className={`p-4 rounded-full shadow-lg border transition-all ${isRecording ? 'bg-red-500 border-red-400 hover:bg-red-600' : 'bg-slate-700 border-slate-600 hover:bg-slate-600 text-white'}`}
              >
                <Mic size={24} className={isRecording ? 'text-white' : ''} />
              </button>
            </div>
          </div>

          {/* Live Transcription */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
              <FileText size={18} className="text-slate-500" />
              <h3 className="font-semibold text-slate-700 text-sm">Live Transcription</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs">You</div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-slate-800 text-sm">You</span>
                    <span className="text-xs text-slate-400">00:00</span>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg rounded-tl-none border border-slate-100">
                    Welcome Sarah. Let's start by talking about a time you had to optimize a complex React application.
                  </p>
                </div>
              </div>

              {transcription.map((t, idx) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 text-cyan-700 font-bold text-xs">SJ</div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-slate-800 text-sm">{t.speaker}</span>
                      <span className="text-xs text-slate-400">{t.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-cyan-50/30 p-3 rounded-lg rounded-tl-none border border-cyan-100/50">
                      {t.text}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isRecording && (
                <div className="flex gap-3 items-center text-slate-400 text-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  Candidate is speaking...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="flex flex-col gap-6 overflow-y-auto">
          {/* Sentiment Analysis */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-blue-500" /> Real-time Sentiment
            </h3>
            
            <div className="flex items-end gap-4 mb-2">
              <div className="text-4xl font-bold text-slate-800">{sentiment}<span className="text-lg text-slate-500 font-medium">/100</span></div>
              <div className="text-sm font-medium text-emerald-500 mb-1">Confidence: High</div>
            </div>
            
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
              <motion.div 
                className={`h-full ${sentiment > 80 ? 'bg-emerald-500' : sentiment > 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                animate={{ width: `${sentiment}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
              />
            </div>
            
            <div className="flex justify-between text-xs font-medium text-slate-400">
              <span>Nervous</span>
              <span>Neutral</span>
              <span>Confident</span>
            </div>
          </div>

          {/* AI Suggested Questions */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-5 text-white flex-1 flex flex-col">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-300" /> Copilot Suggestions
            </h3>
            
            <p className="text-sm text-blue-100 mb-4 bg-white/10 p-3 rounded-lg border border-white/20">
              Based on the candidate's answer about React 18 migration, here are follow-up questions to test depth of knowledge:
            </p>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl text-slate-800 group hover:bg-white transition-colors cursor-pointer shadow-sm">
                <p className="text-sm font-medium mb-2">"Could you elaborate on how you handled the transition to Concurrent Rendering and its impact on your existing useEffects?"</p>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Deep Dive</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-blue-600">Ask Next</button>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl text-slate-800 group hover:bg-white transition-colors cursor-pointer shadow-sm">
                <p className="text-sm font-medium mb-2">"What specific metrics did you track to verify that 30% performance improvement?"</p>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Behavioral</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-purple-600">Ask Next</button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-xs text-blue-100 bg-blue-900/30 p-2 rounded-lg">
              <AlertCircle size={14} className="text-amber-300 flex-shrink-0" />
              Candidate tends to use "we" instead of "I". Probe for individual contributions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCopilot;
