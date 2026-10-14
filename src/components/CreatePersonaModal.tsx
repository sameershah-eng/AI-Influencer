import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Check, RefreshCw, Plus, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Persona } from '../types';

interface CreatePersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePersonaModal: React.FC<CreatePersonaModalProps> = ({ isOpen, onClose }) => {
  const { createPersona, addKnowledgeEntry, addTrend, addContentItem } = useApp();

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [type, setType] = useState<Persona['type']>('Virtual Human');
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('');
  const [platformFocus, setPlatformFocus] = useState<Persona['platformFocus']>('Instagram Reels');
  const [conceptPrompt, setConceptPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateAI = async () => {
    if (!conceptPrompt.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: conceptPrompt,
          personaType: type
        })
      });

      const json = await res.json();
      const data = json.data;

      if (data) {
        setName(data.name || 'Nova Toylab');
        setHandle(data.handle || '@novatoylab');
        if (data.niche) setNiche(data.niche);
        if (data.tone) setTone(data.tone);
      }
    } catch (err) {
      // Fallback
      setName('Koa Kinetix');
      setHandle('@koakinetix');
      setNiche('Kinetic Sculptures, Wooden Automata & Mechanical Art Toys');
      setTone('Excited, engineering-focused, nerdy, hypnotic');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    const newPersona: Persona = {
      id,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
      type,
      niche: niche || 'Designer toys and limited art collectibles',
      tone: tone || 'Curious, authentic, and design-minded',
      platformFocus,
      backstory: `Created as an autonomous virtual curator exploring the intersections of craft, rare collectibles, and limited-edition design drops.`,
      audience: 'Art collectors, toy designers, and creative enthusiasts aged 18–35.',
      traits: {
        playfulness: 75,
        polish: 80,
        insiderKnowledge: 90,
        energyLevel: 80,
      },
      catchphrases: ['Every sculpt tells a story.', 'Check the mold seam.', 'From concept to vault.'],
      topicsToOwn: ['Unboxing limited drops', 'Material science of resin & vinyl', 'Underground artisan spotlights'],
      topicsToAvoid: ['Mass commercial bootlegs', 'Speculative hype trading'],
      postingCadence: '4x weekly short-form drops',
      visualIdentity: {
        faceFrontImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
        colorPalette: ['#10B981', '#3B82F6', '#1E293B', '#F1F5F9'],
        styleKeywords: ['Clean studio daylight', 'Macro shallow focus', 'Matte architectural textures'],
        characterPrompt: `${name}, stylish virtual creator in a modern designer workshop studio, holding a pristine limited edition art sculpture, cinematic studio lighting, 9:16 vertical render.`
      },
      voiceIdentity: {
        description: 'Warm, articulate, contemporary voice with relaxed conversational pacing.',
        pace: 'Engaging & steady (125 wpm)',
        sampleScript: 'Welcome back to the studio. Today we have something truly special straight from the artisan mold.',
        elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM',
        lipSyncProvider: 'HeyGen Avatar 3.0 Ultra-Res'
      },
      themeColor: {
        primary: '#10B981',
        secondary: '#34D399',
        accent: '#F59E0B',
        light: '#ECFDF5'
      }
    };

    // Add persona
    createPersona(newPersona);

    // Seed starter knowledge
    addKnowledgeEntry({
      accountId: id,
      category: 'Brand Rules',
      title: `${name} Tone & Curation Standard`,
      content: 'Always champion original sculptors and craftsmanship. Avoid hype-screaming or manufactured urgency.',
      tags: ['Brand Voice', 'Core Lore']
    });

    // Seed starter trend
    addTrend({
      accountId: id,
      topic: 'The 360-Degree Macro Turntable Showcase',
      platform: platformFocus,
      momentum: 'rising',
      momentumScore: 92,
      category: 'Format Trend',
      description: 'Continuous slow-motion rotation revealing hidden paint details and mold marks.',
      exampleHooks: [
        'Watch this sculpt reveal itself under 4k light.',
        'The detail on this underside is unmatched.'
      ],
      suggestedFormat: 'unboxing',
      recommendedSound: 'Ambient electronic soundtrack'
    });

    // Seed starter content item
    addContentItem({
      accountId: id,
      title: `Debut Drop: Introducing ${name}`,
      stage: 'Idea',
      format: 'talking head',
      hookOptions: [
        {
          type: 'Curiosity Gap',
          spokenText: 'We built a dedicated studio to hunt the world’s rarest designer toys.',
          visualAction: 'Studio camera panning across shelves of rare collectibles.'
        }
      ],
      selectedHookIndex: 0,
      script: [
        {
          time: '0:00 - 0:03',
          shot: `Close up on ${name} welcoming the audience`,
          dialogue: 'We built a dedicated studio to hunt the world’s rarest designer toys.',
          onScreenText: 'THE VAULT IS OPEN'
        }
      ],
      caption: `Welcome to the official debut of ${name}! 🚀 We’re unboxing, testing, and tracking the world's most sought-after designer art toys.\n\nWhat holy grail should we review first?`,
      hashtags: ['#DucklingStudio', `#${name.replace(/\s+/g, '')}`, '#DesignerToys'],
      soundStyle: 'Crisp contemporary beats with soft vinyl hiss',
      visualPrompt: `${name} introducing the channel in modern minimalist studio, 9:16 vertical render.`,
      thumbnailUrl: newPersona.avatar,
      assignedAgent: 'Script Writer Agent',
      targetDurationSeconds: 22,
      checklist: {
        imageGenerated: false,
        videoGenerated: false,
        voiceSynthesized: false,
        lipSyncCompleted: false,
        finalEditRendered: false
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-lg bg-white rounded-[24px] border border-[#E5DFD4] card-shadow-elevated p-6 space-y-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-[#16141F]">
                Add New Influencer Account
              </h3>
              <p className="text-[11px] text-[#7A7585]">
                Scales Duckling Studio to manage an additional virtual persona.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8797] hover:text-[#16141F] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Quick Generator Prompt */}
        <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#F2DEB9] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8C4A00]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E65100]" />
              <span>Fast AI Concept Synthesizer</span>
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Cybernetic sneakerhead who collects resin art dioramas..."
              value={conceptPrompt}
              onChange={(e) => setConceptPrompt(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-[#E8DFC9] focus:outline-none"
            />
            <button
              disabled={isGenerating || !conceptPrompt.trim()}
              onClick={handleGenerateAI}
              className="px-3 py-1.5 rounded-xl brand-gradient text-white text-xs font-semibold hover:brightness-105 disabled:opacity-50 transition-all cursor-pointer shrink-0"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Auto-Fill'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Koa Kinetix"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Handle *
              </label>
              <input
                type="text"
                required
                placeholder="@koakinetix"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none"
              >
                <option value="Virtual Human">Virtual Human</option>
                <option value="Fictional Character">Fictional Character</option>
                <option value="AI-Assisted Human">AI-Assisted Human</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Platform Focus
              </label>
              <select
                value={platformFocus}
                onChange={(e) => setPlatformFocus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none"
              >
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
              Primary Collectibles Niche
            </label>
            <input
              type="text"
              placeholder="e.g. Kinetic Art Toys, Japanese Mecha Resins, Blind Boxes"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
              Tone & Voice Persona
            </label>
            <input
              type="text"
              placeholder="e.g. Energetic, nerdy, engineering-obsessed, warm"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EFEBE4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#7A7585] hover:bg-[#FAF8F3] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 disabled:opacity-50 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Launch Account</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
