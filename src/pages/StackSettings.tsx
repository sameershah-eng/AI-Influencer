import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Plus, 
  RotateCcw, 
  Server, 
  Database, 
  Lock,
  Layers,
  KeyRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StackSettingsProps {
  onOpenCreateAccount: () => void;
}

export const StackSettings: React.FC<StackSettingsProps> = ({ onOpenCreateAccount }) => {
  const { integrations, aiStatus, resetToSeedData, addToast, personas } = useApp();

  return (
    <div className="space-y-8 pb-16 max-w-6xl">
      {/* Header Banner */}
      <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#E65100]" />
            <h2 className="font-editorial text-xl font-bold text-[#16141F]">
              Technology Stack & Integration Topology
            </h2>
          </div>
          <p className="text-xs text-[#6E687A] max-w-2xl leading-relaxed">
            Production infrastructure powering virtual personas, consistent diffusion weights, voice cloning, and autonomous social publishing.
          </p>
        </div>

        <button
          onClick={onOpenCreateAccount}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Influencer Account</span>
        </button>
      </div>

      {/* Gemini Engine Credentials & Security Card */}
      <div className="p-6 rounded-[24px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E65100]" />
            <h3 className="font-editorial text-base font-semibold text-[#16141F]">
              Google GenAI (Gemini 3.8 Flash)
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
            Server-Side Proxy Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] space-y-1">
            <span className="text-[10px] text-[#7A7585] uppercase tracking-wider font-semibold">Active Model</span>
            <div className="font-semibold text-[#16141F] flex items-center gap-1.5">
              <span>{aiStatus.model}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] space-y-1">
            <span className="text-[10px] text-[#7A7585] uppercase tracking-wider font-semibold">Security Architecture</span>
            <div className="font-semibold text-[#16141F] flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full-Stack Express Proxy</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] space-y-1">
            <span className="text-[10px] text-[#7A7585] uppercase tracking-wider font-semibold">Client Keys Status</span>
            <div className="font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Injected securely via runtime</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#7A7585] leading-relaxed">
          Gemini 3.8 Flash powers script generation with timestamps, multi-hook variance, viral trend scouting, and the continuous analytics learning loop.
        </p>
      </div>

      {/* 8 Integration Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-xl font-bold text-[#16141F]">
            Recommended Production Stack
          </h3>
          <span className="text-xs text-[#7A7585]">
            8 / 8 Services Connected & Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05621]">
                    {item.tier}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                <h4 className="font-editorial text-base font-bold text-[#16141F]">
                  {item.name}
                </h4>

                <span className="text-[11px] font-medium text-[#7A7585] block mt-0.5">
                  {item.category}
                </span>

                <p className="text-xs text-[#5C5666] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2ECE1] text-[10px] text-[#8C8797] flex items-center justify-between">
                <span>Direct API Endpoint</span>
                <span className="text-[#16141F] font-mono">v2.4-stable</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scaling Demonstrator: Active Influencer Accounts */}
      <div className="p-6 rounded-[24px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#16141F]">
              Managed Influencer Roster ({personas.length} Personas)
            </h3>
            <p className="text-xs text-[#7A7585]">
              Duckling Studio is built to manage multi-character rosters across separate collectible niches and platforms.
            </p>
          </div>
          <button
            onClick={onOpenCreateAccount}
            className="text-xs font-semibold text-[#E65100] hover:underline cursor-pointer"
          >
            + Add Another Account
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] flex items-center gap-3.5"
            >
              <img
                src={persona.avatar}
                alt={persona.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#E5DFD4]"
              />
              <div className="truncate">
                <div className="font-editorial text-sm font-bold text-[#16141F] truncate">
                  {persona.name}
                </div>
                <div className="text-[11px] text-[#7A7585] truncate font-medium">
                  {persona.handle} • {persona.platformFocus}
                </div>
                <div className="text-[10px] text-[#8C8797] truncate mt-0.5">
                  {persona.niche.split(',')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="p-6 rounded-[24px] bg-[#FFF8F5] border border-[#FCD8CD] card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-editorial text-base font-bold text-[#9A3412]">
            Client Demo Environment Reset
          </h4>
          <p className="text-xs text-[#8C5D2B] mt-0.5">
            Restores initial seed data (Pip Quackers & Mara Vale, 24 content items, and 30-day analytics) if you edited personas or cleared the queue.
          </p>
        </div>

        <button
          onClick={resetToSeedData}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#FCD8CD] text-[#C05621] text-xs font-bold hover:bg-[#FFEEDE] transition-all cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Fresh Demo State</span>
        </button>
      </div>
    </div>
  );
};
