import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  Plus, 
  Check, 
  ArrowUpRight, 
  Eye, 
  Flame, 
  Users, 
  Share2, 
  MessageSquare,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { 
  SEED_ANALYTICS, 
  SEED_FORMAT_PERFORMANCE, 
  SEED_HOOK_PERFORMANCE 
} from '../data/seedData';

interface AIInsight {
  id: string;
  title: string;
  impact: 'High' | 'Medium';
  metricObserved: string;
  recommendation: string;
  kbStrategyTitle: string;
  kbStrategyContent: string;
}

export const AnalyticsLoop: React.FC = () => {
  const { 
    activePersona, 
    activeAccountContent, 
    addKnowledgeEntry, 
    addToast 
  } = useApp();

  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedInsights, setAppliedInsights] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'formats' | 'hooks'>('overview');

  const analyticsData = SEED_ANALYTICS[activePersona.id] || SEED_ANALYTICS['pip-quackers'];
  const formatData = SEED_FORMAT_PERFORMANCE[activePersona.id] || SEED_FORMAT_PERFORMANCE['pip-quackers'];
  const hookData = SEED_HOOK_PERFORMANCE[activePersona.id] || SEED_HOOK_PERFORMANCE['pip-quackers'];

  // AI Strategic Insights state
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: 'rec-1',
      title: 'Weight-Verification Hooks Double 3-Second Retention',
      impact: 'High',
      metricObserved: 'Videos opening with digital scales achieved 78.4% 3-sec retention vs 41% baseline average.',
      recommendation: 'Mandate digital scale readings in the first 2 seconds of all blind box unboxings. Pair with mechanical click audio.',
      kbStrategyTitle: 'Retention Rule: 3-Second Scale Check',
      kbStrategyContent: 'Always show the figure on the digital scale within the first 1.5 seconds before dialogue begins to create immediate mystery around chase weight variance.'
    },
    {
      id: 'rec-2',
      title: 'Macro Paint Inspection Drives 3.1x Saves',
      impact: 'High',
      metricObserved: 'Reels with 4K macro shots of paint seams generated 3,400+ bookmark saves.',
      recommendation: 'Incorporate at least one 4-second continuous macro turntable shot showing vinyl sheen and mold seams.',
      kbStrategyTitle: 'Visual Rule: Macro Turntable Shot',
      kbStrategyContent: 'Every showcase script must dedicate 4 seconds to an ultra-close macro sweep of the sculpt textures to feed collector scrutiny and bookmarking.'
    },
    {
      id: 'rec-3',
      title: 'Mid-Tier Skits Underperform Without Physical Props',
      impact: 'Medium',
      metricObserved: 'Skits without physical unboxing props drop 38% retention by second 8.',
      recommendation: 'Eliminate pure talking-head comedy. Always give the character an actual collectible prop to handle physically.',
      kbStrategyTitle: 'Content Format: Always Hold Collectibles',
      kbStrategyContent: 'Virtual human or character should never speak with empty hands. Hold at least one packaging element or limited edition accessory.'
    },
    {
      id: 'rec-4',
      title: 'Sunday 6 PM Drops Outperform Midday by 44%',
      impact: 'High',
      metricObserved: 'Peak collector activity occurs Sunday 17:00-20:00 EST during live drops.',
      recommendation: 'Shift primary viral hero posts from Tuesday mornings to Sunday 18:00 EST schedule.',
      kbStrategyTitle: 'Scheduling Rule: Sunday Prime Drop Window',
      kbStrategyContent: 'Deploy top tier chase unboxings on Sundays between 5:30 PM and 7:00 PM EST to align with domestic collector drop releases.'
    },
    {
      id: 'rec-5',
      title: 'Direct Lore Questions Fuel 85% Comment Lift',
      impact: 'Medium',
      metricObserved: 'CTAs asking "Yellow or Cyber?" received 4x more replies than generic "Follow for more".',
      recommendation: 'Close all videos with a binary choice question comparing two distinct colorways or editions.',
      kbStrategyTitle: 'CTA Guideline: Binary Colorway Debates',
      kbStrategyContent: 'Outros must always force a binary aesthetic debate (e.g., Matte vs Gloss, OG vs Chase) to fuel algorithmic comment velocity.'
    }
  ]);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: activePersona,
          postsSummary: activeAccountContent.slice(0, 8),
          metrics: {
            followers: activePersona.id === 'pip-quackers' ? '109,800' : '76,500',
            views7d: activePersona.id === 'pip-quackers' ? '1,840,000' : '980,000',
            engagementRate: activePersona.id === 'pip-quackers' ? '9.8%' : '8.6%'
          }
        })
      });

      const json = await res.json();
      if (json.insights && Array.isArray(json.insights)) {
        setInsights(json.insights);
        addToast({
          title: 'Learning Loop Synthesized',
          message: `Generated 5 fresh tactical growth rules using Gemini Flash`,
          type: 'success'
        });
      }
    } catch (err) {
      addToast({
        title: 'Insights Engine Error',
        message: 'Could not fetch live analysis. Displaying cached learning loop.',
        type: 'error'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyToStrategy = (insight: AIInsight) => {
    addKnowledgeEntry({
      accountId: activePersona.id,
      category: 'Strategy',
      title: insight.kbStrategyTitle,
      content: insight.kbStrategyContent,
      tags: ['Learned Strategy', 'Retention', 'Gemini Loop']
    });

    setAppliedInsights(prev => [...prev, insight.id]);
    addToast({
      title: 'Applied to Knowledge Base',
      message: `"${insight.kbStrategyTitle}" will now guide all future script generations.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl">
      {/* Header Banner */}
      <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#E65100]" />
            <h2 className="font-editorial text-xl font-bold text-[#16141F]">
              Autonomous Analytics & Learning Loop
            </h2>
          </div>
          <p className="text-xs text-[#6E687A] max-w-2xl leading-relaxed">
            Measures retention falloff, hook resonance, and format velocity. The AI learning loop extracts winning patterns and saves them directly into {activePersona.name}'s Knowledge Base.
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={handleGenerateInsights}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shrink-0"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing 30-Day Cohorts...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Insights</span>
            </>
          )}
        </button>
      </div>

      {/* Primary 30-Day Performance Chart */}
      <div className="p-6 rounded-[24px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#16141F]">
              30-Day Organic Views Trajectory
            </h3>
            <p className="text-xs text-[#7A7585]">
              Daily short-form video impressions across algorithmic feeds
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 text-xs rounded-lg font-medium cursor-pointer ${
                activeTab === 'overview' ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
              }`}
            >
              Views Over Time
            </button>
            <button
              onClick={() => setActiveTab('formats')}
              className={`px-3 py-1 text-xs rounded-lg font-medium cursor-pointer ${
                activeTab === 'formats' ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
              }`}
            >
              By Format
            </button>
            <button
              onClick={() => setActiveTab('hooks')}
              className={`px-3 py-1 text-xs rounded-lg font-medium cursor-pointer ${
                activeTab === 'hooks' ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
              }`}
            >
              By Hook Style
            </button>
          </div>
        </div>

        {/* Charts Container */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'overview' ? (
              <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8A65" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FFC83D" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE4" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#9892A2" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#E8E2D8' }} 
                />
                <YAxis 
                  stroke="#9892A2" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `${val / 1000}k`} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#16141F', 
                    borderRadius: '12px', 
                    color: '#fff', 
                    fontSize: '12px',
                    border: 'none',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                  }} 
                  formatter={(val: any) => [Number(val).toLocaleString() + ' views', 'Impressions']}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#FF8A65" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#viewsGradient)" 
                />
              </AreaChart>
            ) : activeTab === 'formats' ? (
              <BarChart data={formatData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE4" vertical={false} />
                <XAxis dataKey="format" stroke="#9892A2" fontSize={11} tickLine={false} />
                <YAxis stroke="#9892A2" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16141F', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                  formatter={(val: any) => [Number(val).toLocaleString() + ' avg views', 'Performance']}
                />
                <Bar dataKey="avgViews" fill="#FF8A65" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={hookData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE4" vertical={false} />
                <XAxis dataKey="hookStyle" stroke="#9892A2" fontSize={10} tickLine={false} />
                <YAxis stroke="#9892A2" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16141F', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                  formatter={(val: any) => [`${val}% avg 3s retention`, 'Retention Rate']}
                />
                <Bar dataKey="avgRetention3s" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Strategic Recommendations with "Apply to Strategy" button */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#16141F]">
              Gemini Learning Loop: 5 Actionable Recommendations
            </h3>
            <p className="text-xs text-[#7A7585]">
              Empirically backed insights ready to be codified directly into {activePersona.name}'s character lore.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F5E9] text-emerald-800">
            Self-Optimizing Strategy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.map((rec) => {
            const isApplied = appliedInsights.includes(rec.id);

            return (
              <div
                key={rec.id}
                className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FFF2DE] text-[#C05621] border border-[#FED7AA]">
                      {rec.impact} Impact
                    </span>
                    <Zap className="w-3.5 h-3.5 text-[#E65100]" />
                  </div>

                  <h4 className="font-editorial text-base font-bold text-[#16141F] leading-snug">
                    {rec.title}
                  </h4>

                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#ECE5D8] text-[11px] text-[#6E687A] space-y-1">
                    <span className="text-[10px] font-bold text-[#8C8797] uppercase tracking-wider block">
                      Data Signal:
                    </span>
                    <p className="leading-snug">{rec.metricObserved}</p>
                  </div>

                  <p className="text-xs text-[#4A4553] leading-relaxed">
                    {rec.recommendation}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1]">
                  <button
                    disabled={isApplied}
                    onClick={() => handleApplyToStrategy(rec)}
                    className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'brand-gradient text-white shadow-xs hover:brightness-105 active:scale-95'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Injected to Lore Vault</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Apply to Strategy (Save to KB)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top and Bottom Posts Table */}
      <div className="p-6 rounded-[24px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
        <h3 className="font-editorial text-lg font-bold text-[#16141F]">
          Content Performance Benchmarks
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFEBE4] text-[#8C8797] font-semibold text-[11px]">
                <th className="pb-3">Content Asset</th>
                <th className="pb-3">Format</th>
                <th className="pb-3">Views</th>
                <th className="pb-3">Engagement</th>
                <th className="pb-3">Shares</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB]">
              {activeAccountContent.slice(0, 5).map((post) => (
                <tr key={post.id} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3 font-semibold text-[#16141F] max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-3 text-[#5C5666] capitalize">
                    {post.format}
                  </td>
                  <td className="py-3 tabular-nums font-medium text-[#16141F]">
                    {post.metrics ? post.metrics.views.toLocaleString() : 'Pending'}
                  </td>
                  <td className="py-3 tabular-nums font-semibold text-emerald-600">
                    {post.metrics ? `${post.metrics.engagementRate}%` : '—'}
                  </td>
                  <td className="py-3 tabular-nums text-[#5C5666]">
                    {post.metrics ? post.metrics.shares.toLocaleString() : '—'}
                  </td>
                  <td className="py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#E5DFD4] text-[#16141F]">
                      {post.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
