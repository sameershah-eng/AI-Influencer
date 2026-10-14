import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Eye, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  Play, 
  Bot, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageId } from '../components/Sidebar';
import { SEED_ANALYTICS } from '../data/seedData';

interface CommandCenterProps {
  onNavigate: (page: PageId) => void;
  onOpenCreateAccount: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ onNavigate }) => {
  const { 
    activePersona, 
    activeAccountContent, 
    activeAccountTrends, 
    agents, 
    agentLogs 
  } = useApp();

  // Metrics calculation
  const totalFollowers = activePersona.id === 'pip-quackers' ? '109,800' : '76,500';
  const views7d = activePersona.id === 'pip-quackers' ? '1,840,000' : '980,000';
  const engagementRate = activePersona.id === 'pip-quackers' ? '9.8%' : '8.6%';

  const inReviewItems = activeAccountContent.filter(i => i.stage === 'In Review');
  const inProductionItems = activeAccountContent.filter(i => i.stage === 'In Production');
  const approvedItems = activeAccountContent.filter(i => i.stage === 'Approved');
  const scheduledItems = activeAccountContent.filter(i => i.stage === 'Scheduled');
  const topTrending = activeAccountTrends.filter(t => t.momentum === 'rising').slice(0, 3);

  // Top published post spotlight
  const publishedPosts = activeAccountContent.filter(i => i.stage === 'Published');
  const topPost = publishedPosts[0] || activeAccountContent[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden p-7 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#FFF7EA] via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={activePersona.avatar}
              alt={activePersona.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-2xl font-bold tracking-tight text-[#16141F]">
                  {activePersona.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#F2EDE4] text-[#4A4553]">
                  {activePersona.type}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#FFF2DE] text-[#C05621]">
                  {activePersona.platformFocus}
                </span>
              </div>
              <p className="text-xs text-[#6E687A] mt-1 max-w-xl line-clamp-1">
                {activePersona.niche}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-[#8C8797]">
                <span>Cadence: <strong className="text-[#16141F] font-semibold">{activePersona.postingCadence.split('+')[0]}</strong></span>
                <span>•</span>
                <span>Tone: <strong className="text-[#16141F] font-semibold">{activePersona.tone.split(',')[0]}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('persona-studio')}
              className="px-4 py-2 rounded-xl bg-[#F5F1E9] hover:bg-[#EBE5DB] text-xs font-semibold text-[#16141F] transition-all cursor-pointer"
            >
              Edit Persona Bible
            </button>
            <button
              onClick={() => onNavigate('content-engine')}
              className="px-4 py-2 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Content Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Followers */}
        <div className="p-5 rounded-[20px] bg-white border border-[#E8E2D8] card-shadow">
          <div className="flex items-center justify-between text-[#7E788B]">
            <span className="text-xs font-medium">Audience Community</span>
            <Users className="w-4 h-4 text-[#8C8797]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-editorial text-3xl font-bold tracking-tight text-[#16141F] tabular-nums">
              {totalFollowers}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              +14.8%
            </span>
          </div>
          <div className="text-[11px] text-[#8C8797] mt-1">
            +3,420 net new this week
          </div>
        </div>

        {/* 7-Day Views */}
        <div className="p-5 rounded-[20px] bg-white border border-[#E8E2D8] card-shadow">
          <div className="flex items-center justify-between text-[#7E788B]">
            <span className="text-xs font-medium">7-Day Impressions</span>
            <Eye className="w-4 h-4 text-[#8C8797]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-editorial text-3xl font-bold tracking-tight text-[#16141F] tabular-nums">
              {views7d}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              +28.2%
            </span>
          </div>
          <div className="text-[11px] text-[#8C8797] mt-1">
            Organic algorithmic distribution
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="p-5 rounded-[20px] bg-white border border-[#E8E2D8] card-shadow">
          <div className="flex items-center justify-between text-[#7E788B]">
            <span className="text-xs font-medium">Engagement Rate</span>
            <Flame className="w-4 h-4 text-[#E65100]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-editorial text-3xl font-bold tracking-tight text-[#16141F] tabular-nums">
              {engagementRate}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              +1.2%
            </span>
          </div>
          <div className="text-[11px] text-[#8C8797] mt-1">
            Industry benchmark: 3.4%
          </div>
        </div>

        {/* Posts Awaiting Approval */}
        <div 
          onClick={() => onNavigate('approval-queue')}
          className={`p-5 rounded-[20px] border transition-all cursor-pointer card-shadow ${
            inReviewItems.length > 0 
              ? 'bg-[#FFF7F9] border-[#FCD2DC] hover:border-[#F2668B]' 
              : 'bg-white border-[#E8E2D8]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7E788B]">Approval Gate</span>
            <ShieldCheck className={`w-4 h-4 ${inReviewItems.length > 0 ? 'text-[#F2668B]' : 'text-emerald-600'}`} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-editorial text-3xl font-bold tracking-tight text-[#16141F] tabular-nums">
              {inReviewItems.length}
            </span>
            <span className="text-xs font-semibold text-[#D81B60]">
              Action Required
            </span>
          </div>
          <div className="text-[11px] text-[#8C8797] mt-1 flex items-center justify-between">
            <span>Human-in-the-loop gate</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D81B60]" />
          </div>
        </div>
      </div>

      {/* Main Grid: Needs Attention & Live Agent Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Needs Your Attention (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-editorial text-lg font-semibold text-[#16141F]">
                  Needs Your Attention
                </h2>
                <p className="text-xs text-[#7A7585]">
                  Active bottlenecks, review items, and trending culture anomalies
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF2DE] text-[#C05621]">
                {inReviewItems.length + topTrending.length} Active Signals
              </span>
            </div>

            <div className="space-y-3">
              {/* Approval queue card */}
              {inReviewItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('approval-queue')}
                  className="p-3.5 rounded-xl bg-[#FFF9FA] border border-[#FCD8E1] flex items-center justify-between hover:border-[#F2668B] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FFE6ED] text-[#D81B60] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#16141F] group-hover:text-[#D81B60] transition-colors">
                        Review Needed: "{item.title}"
                      </div>
                      <div className="text-[11px] text-[#6E687A] flex items-center gap-2 mt-0.5">
                        <span>Format: {item.format}</span>
                        <span>•</span>
                        <span>Duration: {item.targetDurationSeconds}s</span>
                        {item.reviewNotes && (
                          <span className="text-[#D81B60] font-medium">• Warning: Audio balance flag</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#9C94A6] group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}

              {/* Spiking Trend Card */}
              {topTrending.map(trend => (
                <div
                  key={trend.id}
                  onClick={() => onNavigate('trend-radar')}
                  className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE5DB] flex items-center justify-between hover:border-[#FF8A65] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FFF2DE] text-[#E65100] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#16141F] flex items-center gap-2">
                        <span>Spiking Trend: {trend.topic}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E65100] text-white font-bold">
                          {trend.momentumScore}% Velocity
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6E687A] mt-0.5">
                        {trend.category} • {trend.platform}
                      </div>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-[#E65100] flex items-center gap-1 group-hover:underline">
                    <span>Draft Idea</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Quick Snapshot */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-editorial text-lg font-semibold text-[#16141F]">
                  Pipeline Summary
                </h3>
                <p className="text-xs text-[#7A7585]">
                  {activeAccountContent.length} active assets across all production stages
                </p>
              </div>
              <button
                onClick={() => onNavigate('production-pipeline')}
                className="text-xs font-semibold text-[#E65100] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Board</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#ECE6DC]">
                <div className="text-[11px] font-medium text-[#7A7585]">In Production</div>
                <div className="font-editorial text-2xl font-bold text-[#16141F] mt-1 tabular-nums">
                  {inProductionItems.length}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#ECE6DC]">
                <div className="text-[11px] font-medium text-[#7A7585]">In Review</div>
                <div className="font-editorial text-2xl font-bold text-[#D81B60] mt-1 tabular-nums">
                  {inReviewItems.length}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#ECE6DC]">
                <div className="text-[11px] font-medium text-[#7A7585]">Approved</div>
                <div className="font-editorial text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
                  {approvedItems.length}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#ECE6DC]">
                <div className="text-[11px] font-medium text-[#7A7585]">Scheduled</div>
                <div className="font-editorial text-2xl font-bold text-indigo-700 mt-1 tabular-nums">
                  {scheduledItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Agent Activity Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#E65100]" />
                <h3 className="font-editorial text-lg font-semibold text-[#16141F]">
                  Agent Telemetry Feed
                </h3>
              </div>
              <button
                onClick={() => onNavigate('agents-automation')}
                className="text-xs text-[#7A7585] hover:text-[#16141F] font-medium cursor-pointer"
              >
                Agent Chains →
              </button>
            </div>

            <p className="text-xs text-[#7A7585] mb-4">
              Autonomous micro-agent executions and background pipeline operations
            </p>

            <div className="space-y-4 flex-1 overflow-y-auto max-h-[380px] pr-1">
              {agentLogs.slice(0, 6).map(log => {
                const statusStyles = {
                  success: 'bg-emerald-500',
                  warning: 'bg-amber-500',
                  error: 'bg-rose-500',
                  in_progress: 'bg-indigo-500 animate-pulse'
                };

                return (
                  <div key={log.id} className="relative pl-5 pb-2 text-xs border-l-2 border-[#EAE4D9]">
                    <span 
                      className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${statusStyles[log.status]}`}
                    />
                    <div className="flex items-center justify-between text-[#8A8496]">
                      <span className="font-semibold text-[#16141F]">
                        {log.agentName}
                      </span>
                      <span className="text-[10px]">{log.timestamp}</span>
                    </div>
                    <div className="font-medium text-[#4A4553] mt-0.5">
                      {log.action}
                    </div>
                    <div className="text-[11px] text-[#7A7585] mt-1 leading-snug">
                      {log.detail}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 mt-2 border-t border-[#EAE4D9] flex items-center justify-between text-xs text-[#6E687A]">
              <span>6 Active AI Micro-Agents</span>
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Pipeline nominal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
