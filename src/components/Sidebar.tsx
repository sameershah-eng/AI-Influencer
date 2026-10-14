import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Sparkles, 
  BookOpen, 
  Radar, 
  PenTool, 
  Kanban, 
  CheckCircle2, 
  CalendarDays, 
  BarChart3, 
  Bot, 
  Sliders, 
  ChevronDown, 
  Plus, 
  RotateCcw,
  BadgeCheck,
  TrendingUp,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export type PageId = 
  | 'command-center'
  | 'persona-studio'
  | 'knowledge-base'
  | 'trend-radar'
  | 'content-engine'
  | 'production-pipeline'
  | 'approval-queue'
  | 'content-calendar'
  | 'analytics-loop'
  | 'agents-automation'
  | 'stack-settings';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onOpenCreateAccount: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  onSelectPage,
  onOpenCreateAccount
}) => {
  const { 
    personas, 
    activePersona, 
    setActiveAccountId, 
    contentItems, 
    resetToSeedData,
    aiStatus
  } = useApp();

  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  // Count items needing approval across the current account
  const inReviewCount = contentItems.filter(
    i => i.accountId === activePersona.id && i.stage === 'In Review'
  ).length;

  const navItems = [
    { id: 'command-center' as PageId, label: 'Command Center', icon: LayoutDashboard },
    { id: 'persona-studio' as PageId, label: 'Persona Studio', icon: Sparkles },
    { id: 'knowledge-base' as PageId, label: 'Knowledge Base', icon: BookOpen },
    { id: 'trend-radar' as PageId, label: 'Trend Radar', icon: Radar },
    { id: 'content-engine' as PageId, label: 'Content Engine', icon: PenTool },
    { id: 'production-pipeline' as PageId, label: 'Production Pipeline', icon: Kanban },
    { 
      id: 'approval-queue' as PageId, 
      label: 'Approval Queue', 
      icon: CheckCircle2,
      badge: inReviewCount > 0 ? inReviewCount : undefined,
      badgeUrgent: true 
    },
    { id: 'content-calendar' as PageId, label: 'Content Calendar', icon: CalendarDays },
    { id: 'analytics-loop' as PageId, label: 'Analytics & Learning', icon: BarChart3 },
    { id: 'agents-automation' as PageId, label: 'Agents & Automation', icon: Bot },
    { id: 'stack-settings' as PageId, label: 'Stack & Settings', icon: Sliders },
  ];

  return (
    <aside className="w-72 shrink-0 h-screen sticky top-0 flex flex-col bg-[#FDFCF8] border-r border-[#EBE6DD] select-none z-30">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-[#EBE6DD]/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center shadow-sm text-white font-bold tracking-tight">
            <span className="font-editorial text-lg italic">D</span>
          </div>
          <div>
            <h1 className="font-editorial text-lg font-semibold tracking-tight text-[#16141F] leading-none">
              Duckling Studio
            </h1>
            <p className="text-[11px] font-medium text-[#7A7585] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Autonomous Influencers
            </p>
          </div>
        </div>

        {/* Account Switcher Dropdown */}
        <div className="relative mt-4">
          <button
            onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E8E2D8] hover:border-[#D8D0C3] card-shadow transition-all group cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={activePersona.avatar}
                alt={activePersona.name}
                className="w-8 h-8 rounded-lg object-cover border border-[#E5DFD4] shrink-0"
              />
              <div className="truncate">
                <div className="text-xs font-semibold text-[#16141F] truncate flex items-center gap-1">
                  {activePersona.name}
                  <BadgeCheck className="w-3.5 h-3.5 text-[#FF8A65] shrink-0" />
                </div>
                <div className="text-[10px] text-[#7A7585] truncate font-medium">
                  {activePersona.handle} • {activePersona.platformFocus}
                </div>
              </div>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-[#7A7585] transition-transform duration-200 shrink-0 ${
                accountDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          <AnimatePresence>
            {accountDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="absolute left-0 right-0 top-full mt-1.5 p-1.5 bg-white rounded-xl border border-[#E5DFD4] card-shadow-elevated z-50 overflow-hidden"
              >
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#908A9B]">
                  Switch Active Persona
                </div>
                <div className="space-y-1 mt-1">
                  {personas.map((persona) => {
                    const isSelected = persona.id === activePersona.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          setActiveAccountId(persona.id);
                          setAccountDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[#F9F6F0] text-[#16141F] font-medium' 
                            : 'hover:bg-[#FDFBF7] text-[#4A4553]'
                        }`}
                      >
                        <img
                          src={persona.avatar}
                          alt={persona.name}
                          className="w-7 h-7 rounded-md object-cover border border-[#E5DFD4] shrink-0"
                        />
                        <div className="truncate flex-1">
                          <div className="text-xs font-medium truncate flex items-center justify-between">
                            <span>{persona.name}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A65]" />
                            )}
                          </div>
                          <div className="text-[10px] text-[#8C8797] truncate">
                            {persona.niche.split(',')[0]}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1.5 mt-1.5 border-t border-[#EFEBE4]">
                  <button
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      onOpenCreateAccount();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#FF8A65] hover:bg-[#FFF6F2] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Persona</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#9892A2]">
          Operations Suite
        </div>

        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`relative w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                isActive 
                  ? 'text-[#16141F] font-semibold' 
                  : 'text-[#5B5565] hover:text-[#16141F] hover:bg-[#F5F2EB]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebarActiveIndicator"
                  className="absolute inset-0 bg-[#EFECE4] rounded-xl z-0 border border-[#E3DED4]"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-2.5">
                <Icon 
                  className={`w-4 h-4 transition-colors ${
                    isActive 
                      ? 'text-[#E65100]' 
                      : 'text-[#7D7788] group-hover:text-[#16141F]'
                  }`} 
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span 
                  className={`relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeUrgent 
                      ? 'bg-[#F2668B] text-white animate-pulse' 
                      : 'bg-[#E5DFD4] text-[#16141F]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer System Status & Reset */}
      <div className="p-3 border-t border-[#EBE6DD] bg-[#FAF8F3]">
        <div className="p-2.5 rounded-xl bg-white border border-[#EAE4D9] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#16141F] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Gemini Engine
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F4EFE6] text-[#6E687A] font-medium">
              3.8 Flash
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#F2ECE1] text-[10px] text-[#868092]">
            <span>Local DB: Synced</span>
            <button
              onClick={resetToSeedData}
              title="Reset all data to default client demo seed"
              className="flex items-center gap-1 hover:text-[#E65100] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
