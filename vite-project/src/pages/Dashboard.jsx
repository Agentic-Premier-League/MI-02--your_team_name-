import React from 'react';
import { Users, CalendarCheck, TrendingUp, Clock, Brain, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { pipelineMetrics, candidatesData } from '../data/mockData';

const StatCard = ({ icon: Icon, title, value, trend, trendUp, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
        {trend}
        <ArrowUpRight size={16} className={!trendUp ? 'rotate-90' : ''} />
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
          <p className="text-slate-500">Welcome to TalentIntel Dashboard</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Brain size={18} />
          <span>Generate AI Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Candidates"
          value={pipelineMetrics.totalCandidates}
          trend="+12%"
          trendUp={true}
          delay={0.1}
        />
        <StatCard
          icon={CalendarCheck}
          title="Interviews Scheduled"
          value={pipelineMetrics.interviewsScheduled}
          trend="+5%"
          trendUp={true}
          delay={0.2}
        />
        <StatCard
          icon={TrendingUp}
          title="Hiring Success Rate"
          value={`${pipelineMetrics.hiringSuccessRate}%`}
          trend="-2%"
          trendUp={false}
          delay={0.3}
        />
        <StatCard
          icon={Clock}
          title="Avg Time to Hire"
          value={pipelineMetrics.timeToHire}
          trend="+1 day"
          trendUp={false}
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Candidates</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm">
                  <th className="pb-3 font-medium">Candidate</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Match Score</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {candidatesData.slice(0, 4).map((candidate) => (
                  <tr key={candidate.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-800">{candidate.name}</p>
                          <p className="text-xs text-slate-500">{candidate.experience} exp.</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-700">{candidate.role}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${candidate.matchScore >= 90 ? 'bg-emerald-500' : candidate.matchScore >= 80 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                            style={{ width: `${candidate.matchScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{candidate.matchScore}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                        {candidate.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/20 blur-[60px] pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-6">
            <Brain className="text-cyan-400" size={24} />
            <h2 className="text-lg font-bold">AI Insights</h2>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <h3 className="text-sm font-semibold text-cyan-300 mb-1">Top Match Alert</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Emily Rivera (Product Designer) has a 96% match score. Consider fast-tracking her to the final interview round.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <h3 className="text-sm font-semibold text-cyan-300 mb-1">Pipeline Bottleneck</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Technical screening for Backend Developers is taking 4.2 days longer than average.
              </p>
            </div>
            
            <button className="w-full py-2.5 mt-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg font-semibold text-sm transition-colors">
              View Action Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
