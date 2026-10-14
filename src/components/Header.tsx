import React from 'react';
import { Sparkles, PenTool, Flame, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageId } from './Sidebar';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { activePersona, activeAccountContent, aiStatus } = useApp();

  const titles: Record<PageId, { title: string; subtitle: string }> = {
    'command-center': {
      title: 'Command Center',
      subtitle: `Real-time operations & agent telemetry for ${activePersona.name}`
    },
    'persona-studio': {
      title: 'Persona Studio',
      subtitle: 'Character bible, visual identity prompt locks & voice synthesis settings'
    },
    'knowledge-base': {
      title: 'Knowledge Base',
      subtitle: 'Lore, proprietary brand rules & proven viral mechanics injected into prompts'
    },
    'trend-radar': {
      title: 'Trend Radar',
      subtitle: 'Real-time collector culture signals & algorithmic short-form memes'
    },
    'content-engine': {
      title: 'Content Engine',
      subtitle: 'Generate multi-hook scripts, shot directions & visual diffusion prompts'
    },
    'production-pipeline': {
      title: 'Production Pipeline',
      subtitle: 'Full Kanban workflow from idea generation to scheduled dispatch'
    },
    'approval-queue': {
      title: 'Approval Queue',
      subtitle: 'Human-in-the-loop review station. Zero content publishes without sign-off'
    },
    'content-calendar': {
      title: 'Content Calendar',
      subtitle: 'Optimal posting windows & cross-platform schedule coordination'
    },
    'analytics-loop': {
      title: 'Analytics & Learning Loop',
      subtitle: 'Retention analytics, format performance & automated knowledge synthesis'
    },
    'agents-automation': {
      title: 'Agents & Automation',
      subtitle: 'Autonomous multi-agent chain with human-in-the-loop governance'
    },
    'stack-settings': {
      title: 'Stack & Settings',
      subtitle: 'Generative AI pipeline configurations, API credentials & multi-account scaling'
    }
  };

  const inReviewCount = activeAccountContent.filter(i => i.stage === 'In Review').length;

  return (
    <header className="sticky top-0 bg-[#FBF8F3]/90 backdrop-blur-md z-20 border-b border-[#EBE6DD] px-8 py-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#7D7788] font-medium">
          <span className="hover:text-[#16141F] cursor-pointer" onClick={() => onNavigate('command-center')}>
            Duckling Studio
          </span>
          <span>/</span>
          <span className="text-[#16141F] font-semibold">{activePersona.name}</span>
        </div>
        <h2 className="font-editorial text-2xl font-semibold tracking-tight text-[#16141F] mt-0.5">
          {titles[currentPage]?.title || 'Command Center'}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Active Persona Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E2D8] card-shadow text-xs">
          <span 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: activePersona.themeColor.primary }} 
          />
          <span className="font-medium text-[#16141F]">{activePersona.name}</span>
          <span className="text-[#8C8797]">({activePersona.platformFocus})</span>
        </div>

        {/* In Review Warning if any */}
        {inReviewCount > 0 && currentPage !== 'approval-queue' && (
          <button
            onClick={() => onNavigate('approval-queue')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F4] border border-[#FCD5E0] text-[#D81B60] text-xs font-semibold hover:bg-[#FFE5ED] transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{inReviewCount} Awaiting Review</span>
          </button>
        )}

        {/* AI Engine Status */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4EFE6] text-[#4A4553] text-xs font-medium border border-[#E9E3D8]">
          <Sparkles className="w-3.5 h-3.5 text-[#E65100]" />
          <span>Gemini 3.8 Flash</span>
        </div>

        {/* Primary Action Button: New Content */}
        {currentPage !== 'content-engine' && (
          <button
            onClick={() => onNavigate('content-engine')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Generate Content</span>
          </button>
        )}
      </div>
    </header>
  );
};
