import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Radar, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  ArrowUpRight, 
  Music, 
  Video, 
  Layers, 
  Clock, 
  CheckCircle2,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrendEntry } from '../types';
import { PageId } from '../components/Sidebar';

interface TrendRadarProps {
  onNavigate: (page: PageId) => void;
  onSelectTrendForContent?: (trend: TrendEntry) => void;
}

export const TrendRadar: React.FC<TrendRadarProps> = ({ 
  onNavigate,
  onSelectTrendForContent 
}) => {
  const { 
    activePersona, 
    activeAccountTrends, 
    addTrend, 
    addContentItem, 
    addToast 
  } = useApp();

  const [isResearching, setIsResearching] = useState(false);
  const [filterMomentum, setFilterMomentum] = useState<string>('All');

  const handleResearchTrendsWithAI = async () => {
    setIsResearching(true);
    try {
      const res = await fetch('/api/ai/research-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaName: activePersona.name,
          niche: activePersona.niche,
          audience: activePersona.audience,
          tone: activePersona.tone,
          platformFocus: activePersona.platformFocus
        })
      });

      const json = await res.json();
      if (json.trends && Array.isArray(json.trends)) {
        json.trends.forEach((t: any) => {
          addTrend({
            accountId: activePersona.id,
            topic: t.topic,
            platform: t.platform || activePersona.platformFocus,
            momentum: t.momentum || 'rising',
            momentumScore: t.momentumScore || 90,
            category: t.category || 'Viral Format',
            description: t.description || '',
            exampleHooks: t.exampleHooks || [],
            suggestedFormat: t.suggestedFormat || 'unboxing',
            recommendedSound: t.recommendedSound || 'Upbeat lo-fi track'
          });
        });

        addToast({
          title: 'Trend Intelligence Ingested',
          message: `Identified ${json.trends.length} fresh viral formats for ${activePersona.name}`,
          type: 'success'
        });
      }
    } catch (err) {
      addToast({
        title: 'Trend Scout Offline',
        message: 'Could not connect to live trend radar. Kept existing radar tracks.',
        type: 'error'
      });
    } finally {
      setIsResearching(false);
    }
  };

  const handleCreateIdeaFromTrend = (trend: TrendEntry) => {
    const newItem = addContentItem({
      accountId: activePersona.id,
      title: trend.topic,
      stage: 'Idea',
      format: trend.suggestedFormat,
      selectedHookIndex: 0,
      hookOptions: trend.exampleHooks.map((hook, i) => ({
        type: i === 0 ? 'Curiosity Gap' : i === 1 ? 'Contrarian' : 'Urgent Cliffhanger',
        spokenText: hook,
        visualAction: `High energy ${trend.suggestedFormat} visual showcasing key details.`
      })),
      script: [
        {
          time: '0:00 - 0:03',
          shot: `Tight framing on ${activePersona.name} introducing ${trend.topic}`,
          dialogue: trend.exampleHooks[0] || 'Stop scrolling right now.',
          onScreenText: trend.topic.toUpperCase().slice(0, 24)
        }
      ],
      caption: `Testing out the viral "${trend.topic}" trend! 🚀 Does this actually work for real collectors?\n\nDrop your thoughts below!`,
      hashtags: ['#DucklingStudio', `#${activePersona.name.replace(/\s+/g, '')}`, '#Collectibles', '#ViralTrend'],
      soundStyle: trend.recommendedSound,
      visualPrompt: `${activePersona.visualIdentity?.characterPrompt || 'Character'} filming a 9:16 short-form video on the topic of ${trend.topic}, vibrant cinematic studio lighting.`,
      thumbnailUrl: activePersona.visualIdentity?.faceFrontImage || activePersona.avatar,
      assignedAgent: 'Trend Scout Agent',
      targetDurationSeconds: 24,
      checklist: {
        imageGenerated: false,
        videoGenerated: false,
        voiceSynthesized: false,
        lipSyncCompleted: false,
        finalEditRendered: false
      }
    });

    if (onSelectTrendForContent) {
      onSelectTrendForContent(trend);
    }
  };

  const filteredTrends = activeAccountTrends.filter(t => {
    if (filterMomentum === 'All') return true;
    return t.momentum.toLowerCase() === filterMomentum.toLowerCase();
  });

  return (
    <div className="space-y-7 pb-16 max-w-6xl">
      {/* Hero Header */}
      <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-[#E65100]" />
            <h2 className="font-editorial text-xl font-bold text-[#16141F]">
              Real-time Trend Radar & Cultural Signals
            </h2>
          </div>
          <p className="text-xs text-[#6E687A] max-w-2xl leading-relaxed">
            Algorithmic velocity scanner monitoring short-form hooks, audio trends, and community challenges tailored to{' '}
            <strong className="text-[#16141F] font-semibold">{activePersona.name}</strong>'s niche.
          </p>
        </div>

        <button
          disabled={isResearching}
          onClick={handleResearchTrendsWithAI}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shrink-0"
        >
          {isResearching ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning Social Feeds...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Research Trends with AI</span>
            </>
          )}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {['All', 'Rising', 'Peaking', 'Fading'].map((momentum) => {
            const isSelected = filterMomentum === momentum;
            return (
              <button
                key={momentum}
                onClick={() => setFilterMomentum(momentum)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#16141F] text-white shadow-xs'
                    : 'bg-white border border-[#E8E2D8] text-[#5C5666] hover:bg-[#FAF8F3] hover:text-[#16141F]'
                }`}
              >
                {momentum}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-[#7A7585]">
          Showing <strong>{filteredTrends.length}</strong> radar signals
        </div>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTrends.map((trend) => {
          const momentumStyles: Record<string, { badge: string; text: string }> = {
            rising: {
              badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
              text: 'Accelerating Momentum'
            },
            peaking: {
              badge: 'bg-amber-50 text-amber-700 border-amber-200',
              text: 'Peak Cultural Saturation'
            },
            fading: {
              badge: 'bg-slate-100 text-slate-600 border-slate-200',
              text: 'Declining Engagement'
            }
          };

          const style = momentumStyles[trend.momentum] || momentumStyles.rising;

          return (
            <div
              key={trend.id}
              className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow card-shadow-hover flex flex-col justify-between transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${style.badge}`}>
                    {trend.momentum} • {trend.momentumScore}% Velocity
                  </span>
                  <span className="text-xs font-medium text-[#7A7585]">
                    {trend.platform}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-[#8C8797] uppercase tracking-wider block mb-1">
                    {trend.category}
                  </span>
                  <h3 className="font-editorial text-lg font-bold text-[#16141F] group-hover:text-[#E65100] transition-colors leading-snug">
                    {trend.topic}
                  </h3>
                  <p className="text-xs text-[#5C5666] mt-1.5 leading-relaxed">
                    {trend.description}
                  </p>
                </div>

                {/* Example Hooks */}
                <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#ECE5D8] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E788B] block">
                    Proven Opening Hooks
                  </span>
                  <ul className="space-y-1">
                    {trend.exampleHooks.map((hook, idx) => (
                      <li key={idx} className="text-xs text-[#16141F] flex items-start gap-1.5">
                        <span className="text-[#FF8A65] font-bold">›</span>
                        <span className="italic">"{hook}"</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audio & Format metadata */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6E687A]">
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-[#E65100]" />
                    <span>Format: <strong className="text-[#16141F]">{trend.suggestedFormat}</strong></span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Music className="w-3.5 h-3.5 text-[#E65100]" />
                    <span className="truncate max-w-[200px]">{trend.recommendedSound}</span>
                  </span>
                </div>
              </div>

              {/* Action Button: One-click turn into content idea */}
              <div className="pt-4 mt-5 border-t border-[#F2ECE1] flex items-center justify-between">
                <span className="text-[10px] text-[#8C8797]">
                  Instant Pipeline Transfer
                </span>
                <button
                  onClick={() => handleCreateIdeaFromTrend(trend)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFF6EE] border border-[#FDE1CD] text-[#C05621] text-xs font-semibold hover:bg-[#FFEEDE] transition-all cursor-pointer"
                >
                  <span>Turn into Content Idea</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
