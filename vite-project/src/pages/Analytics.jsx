import React from 'react';
import { PieChart as PieChartIcon, BarChart2, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { departmentStats, funnelData } from '../data/mockData';

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#6366f1'];

const Analytics = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <PieChartIcon className="text-blue-600" size={24} />
            Recruitment Analytics
          </h1>
          <p className="text-slate-500 mt-1">Data-driven insights for your hiring pipeline</p>
        </div>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-500" size={20} />
            <h2 className="text-lg font-bold text-slate-800">Hiring Funnel Conversion</h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnelData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Stats */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 className="text-cyan-500" size={20} />
            <h2 className="text-lg font-bold text-slate-800">Department Overview</h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="applied" name="Applied" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="hired" name="Hired" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1">
           <h2 className="text-lg font-bold text-slate-800 mb-6">Hiring Sources</h2>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={[
                     { name: 'LinkedIn', value: 45 },
                     { name: 'Company Site', value: 25 },
                     { name: 'Referrals', value: 20 },
                     { name: 'Job Boards', value: 10 }
                   ]}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {[...Array(4)].map((_, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="flex flex-wrap gap-4 justify-center mt-2">
             {['LinkedIn', 'Company Site', 'Referrals', 'Job Boards'].map((source, i) => (
               <div key={source} className="flex items-center gap-2 text-sm text-slate-600">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                 {source}
               </div>
             ))}
           </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl shadow-lg p-6 text-white lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[150%] rounded-full bg-blue-600/20 blur-[80px] pointer-events-none" />
          <h2 className="text-lg font-bold mb-2">AI Performance Summary</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-lg">Insights generated by TalentIntel AI based on the last 30 days of recruitment activity.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-blue-300 mb-2">Time-to-Hire Optimization</h3>
              <p className="text-sm text-slate-300">Using AI screening has reduced average time-to-hire by 24%. Technical roles show the highest improvement.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-emerald-300 mb-2">Candidate Quality</h3>
              <p className="text-sm text-slate-300">Candidates with an AI match score &gt;90% have a 85% higher offer acceptance rate.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:col-span-2">
              <h3 className="font-semibold text-cyan-300 mb-2">Recommendations</h3>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>Increase sourcing efforts for Data Science roles (pipeline is 30% below target).</li>
                <li>Implement automated follow-ups for candidates in 'Screening' stage to reduce drop-off.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
