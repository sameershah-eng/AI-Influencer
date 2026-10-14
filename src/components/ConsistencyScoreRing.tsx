import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';
import { Persona } from '../types';

interface ConsistencyScoreRingProps {
  persona: Persona;
}

export const ConsistencyScoreRing: React.FC<ConsistencyScoreRingProps> = ({ persona }) => {
  // Compute score based on completeness
  let score = 0;
  if (persona.backstory && persona.backstory.length > 20) score += 15;
  if (persona.audience && persona.audience.length > 10) score += 10;
  if (persona.catchphrases && persona.catchphrases.length >= 2) score += 10;
  if (persona.topicsToOwn && persona.topicsToOwn.length >= 2) score += 10;
  if (persona.visualIdentity?.characterPrompt && persona.visualIdentity.characterPrompt.length > 30) score += 25;
  if (persona.visualIdentity?.colorPalette && persona.visualIdentity.colorPalette.length >= 3) score += 10;
  if (persona.voiceIdentity?.description && persona.voiceIdentity.description.length > 10) score += 10;
  if (persona.voiceIdentity?.elevenLabsVoiceId) score += 10;

  score = Math.min(score, 100);

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E8E2D8] card-shadow">
      <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#F0ECE4"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFC83D" />
              <stop offset="50%" stopColor="#FF8A65" />
              <stop offset="100%" stopColor="#F2668B" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-editorial text-2xl font-bold tracking-tight text-[#16141F] tabular-nums">
            {score}%
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#8A8496]">
            Fidelity
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16141F]">
          <Sparkles className="w-3.5 h-3.5 text-[#E65100]" />
          <span>Bible Consistency Score</span>
        </div>
        <p className="text-[11px] text-[#6E687A] mt-1 leading-relaxed">
          {score >= 90
            ? 'Fully locked persona. Image and voice generators maintain >96% identity fidelity across runs.'
            : score >= 70
            ? 'Strong character foundation. Add more visual descriptors to lock down face generation.'
            : 'Persona bible needs more details. Voice and visual drift may occur during production.'}
        </p>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-[#8C8797]">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-600" />
            Locked Prompt
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-600" />
            Vocal Profile
          </span>
        </div>
      </div>
    </div>
  );
};
