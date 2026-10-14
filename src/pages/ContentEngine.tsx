import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PenTool, 
  Sparkles, 
  RefreshCw, 
  Check, 
  Send, 
  Copy, 
  Radio, 
  Layers, 
  Music, 
  Camera, 
  Clock, 
  MessageSquare, 
  Film,
  RotateCw,
  Hash,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HookOption, ScriptItem } from '../types';
import { PageId } from '../components/Sidebar';

interface ContentEngineProps {
  onNavigate: (page: PageId) => void;
  prefilledTopic?: string;
}

export const ContentEngine: React.FC<ContentEngineProps> = ({ 
  onNavigate,
  prefilledTopic = ''
}) => {
  const { 
    personas, 
    activePersona, 
    setActiveAccountId, 
    activeAccountKnowledge, 
    activeAccountTrends, 
    addContentItem, 
    addToast 
  } = useApp();

  // Generator inputs
  const [topic, setTopic] = useState(prefilledTopic || 'The Secret Bathroom Safe in Tokyo Toy Market');
  const [format, setFormat] = useState<'talking head' | 'skit' | 'unboxing' | 'POV' | 'slideshow'>('unboxing');
  const [selectedTrend, setSelectedTrend] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);

  // Generated package state
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    hookOptions: HookOption[];
    selectedHookIndex: number;
    script: ScriptItem[];
    caption: string;
    hashtags: string[];
    soundStyle: string;
    visualPrompt: string;
    targetDurationSeconds: number;
  }>({
    title: 'The Secret Vault Unboxing: 1991 Kansai Grail Duck',
    selectedHookIndex: 0,
    hookOptions: [
      {
        type: 'Curiosity Gap',
        spokenText: 'I crawled behind a claw machine in Osaka and found this locked safe full of ducks.',
        visualAction: 'Extreme macro shot of flashlight illuminating rusty safe handle.'
      },
      {
        type: 'Contrarian / Hot Take',
        spokenText: 'Everyone goes to Akihabara. Real duck hunters go to this basement alley.',
        visualAction: 'Fast handheld camera panning down rainy alley stairs.'
      },
      {
        type: 'Urgent Cliffhanger',
        spokenText: 'If this duck has the 1991 stamped plug, it is worth more than my rent.',
        visualAction: 'Pip spinning golden vinyl duck towards camera.'
      }
    ],
    script: [
      {
        time: '0:00 - 0:03',
        shot: 'Close up on yellow beak with neon reflection as sealed foil crinkles.',
        dialogue: 'I crawled behind a claw machine in Osaka and found this locked safe full of ducks.',
        onScreenText: 'SECRET TOY SAFE?!'
      },
      {
        time: '0:03 - 0:11',
        shot: 'Mid-shot: Pip inspecting batch code with jeweler loupe under studio lighting.',
        dialogue: 'Look at the UV reactive wing tips. They only used this pigment in Kansai factories between 1989 and 1993.',
        onScreenText: 'GLOWING KANSAI PIGMENT'
      },
      {
        time: '0:11 - 0:21',
        shot: 'Macro 360-degree rotation of figure highlighting paint finish and rare markings.',
        dialogue: 'Check the belly stamp. Batch code 04-B! That means the squeaker has the double-chamber harmonica reed.',
        onScreenText: 'DOUBLE HARMONICA REED'
      },
      {
        time: '0:21 - 0:28',
        shot: 'Pip addressing camera directly with signature wave or duck pose.',
        dialogue: 'Certified grail! Where should we hide the next geo-cache? Drop your city below!',
        onScreenText: 'DROP YOUR CITY 👇'
      }
    ],
    caption: `Found the holy grail of Osaka bathhouse vinyl! 🦆🎌 The 1991 Kansai UV duck is real and the double squeaker reed sounds like a choir of angels.\n\nShould our next wild drop be in London, Tokyo, or New York? Comment below!`,
    hashtags: ['#DuckCollector', '#PipQuackers', '#ToyHunt', '#OsakaBasement', '#RareFinds', '#GrailDrop'],
    soundStyle: 'Hyperpop 808 with vinyl crackle and squeak audio stems (122 BPM)',
    visualPrompt: `${activePersona.visualIdentity?.characterPrompt || 'Character'} filming a vertical 9:16 short-form video in an Osaka neon night market, shallow depth of field, warm 5500K studio keylight, soft bokeh background with shelves of colorful art toys, cinematic 4k render.`,
    targetDurationSeconds: 28
  });

  const handleSelectTrend = (trendTopic: string) => {
    setSelectedTrend(trendTopic);
    setTopic(trendTopic);
  };

  const handleGenerateFullPackage = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: activePersona,
          knowledgeBase: activeAccountKnowledge,
          topic,
          format,
          trendContext: selectedTrend
        })
      });

      const json = await res.json();
      const content = json.content;

      if (content) {
        setGeneratedContent({
          title: content.title || topic,
          hookOptions: content.hookOptions || generatedContent.hookOptions,
          selectedHookIndex: 0,
          script: content.script || generatedContent.script,
          caption: content.caption || generatedContent.caption,
          hashtags: content.hashtags || generatedContent.hashtags,
          soundStyle: content.soundStyle || generatedContent.soundStyle,
          visualPrompt: content.visualPrompt || generatedContent.visualPrompt,
          targetDurationSeconds: content.targetDurationSeconds || 25
        });

        addToast({
          title: 'Content Package Generated',
          message: `Created 3 hooks, full script, and visual diffusion prompts.`,
          type: 'success'
        });
      }
    } catch (err) {
      addToast({
        title: 'Generation Failed',
        message: 'Could not connect to AI engine. Using local fallbacks.',
        type: 'error'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateSection = async (section: 'hooks' | 'script' | 'caption' | 'visualPrompt') => {
    setRegeneratingSection(section);

    try {
      const res = await fetch('/api/ai/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          currentContent: generatedContent,
          persona: activePersona,
          instructions: `Make it even more tailored to ${activePersona.name}'s specific tone (${activePersona.tone}).`
        })
      });

      const json = await res.json();

      if (section === 'hooks' && json.hookOptions) {
        setGeneratedContent(prev => ({ ...prev, hookOptions: json.hookOptions }));
        addToast({ title: 'Hooks Regenerated', type: 'success' });
      } else if (section === 'script' && json.script) {
        setGeneratedContent(prev => ({ ...prev, script: json.script }));
        addToast({ title: 'Script Regenerated', type: 'success' });
      } else if (section === 'caption' && json.caption) {
        setGeneratedContent(prev => ({ 
          ...prev, 
          caption: json.caption,
          hashtags: json.hashtags || prev.hashtags 
        }));
        addToast({ title: 'Caption Regenerated', type: 'success' });
      } else if (section === 'visualPrompt' && json.visualPrompt) {
        setGeneratedContent(prev => ({ ...prev, visualPrompt: json.visualPrompt }));
        addToast({ title: 'Visual Prompt Regenerated', type: 'success' });
      }
    } catch (err) {
      addToast({ title: 'Section Regeneration Failed', type: 'error' });
    } finally {
      setRegeneratingSection(null);
    }
  };

  const handleSendToPipeline = () => {
    addContentItem({
      accountId: activePersona.id,
      title: generatedContent.title,
      stage: 'Scripted',
      format,
      hookOptions: generatedContent.hookOptions,
      selectedHookIndex: generatedContent.selectedHookIndex,
      script: generatedContent.script,
      caption: generatedContent.caption,
      hashtags: generatedContent.hashtags,
      soundStyle: generatedContent.soundStyle,
      visualPrompt: generatedContent.visualPrompt,
      thumbnailUrl: activePersona.visualIdentity?.faceFrontImage || activePersona.avatar,
      assignedAgent: 'Script Writer Agent',
      targetDurationSeconds: generatedContent.targetDurationSeconds,
      checklist: {
        imageGenerated: false,
        videoGenerated: false,
        voiceSynthesized: false,
        lipSyncCompleted: false,
        finalEditRendered: false
      }
    });

    onNavigate('production-pipeline');
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl">
      {/* Configuration Header / Input Card */}
      <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#EFEBE4]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-editorial text-xl font-bold text-[#16141F]">
                AI Short-Form Content Engine
              </h2>
              <p className="text-xs text-[#7A7585]">
                Generates persona-consistent scripts using {activePersona.name}'s character bible and lore vault.
              </p>
            </div>
          </div>

          {/* Account Picker */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-[#4A4553]">
              Influencer:
            </label>
            <select
              value={activePersona.id}
              onChange={(e) => setActiveAccountId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none"
            >
              {personas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.platformFocus})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Topic & Format Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 space-y-1.5">
            <label className="text-xs font-semibold text-[#16141F] flex items-center justify-between">
              <span>Video Topic or Concept</span>
              {activeAccountTrends.length > 0 && (
                <span className="text-[11px] text-[#7A7585] font-normal">
                  Or select from Trend Radar below
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="e.g. Can a $2 dollar store duck beat a $1,200 24k gold art toy?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
            />
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-[#16141F]">
              Video Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
            >
              <option value="unboxing">Unboxing / Grail Reveal</option>
              <option value="talking head">Talking Head & Insider Lore</option>
              <option value="skit">Skit & Parody</option>
              <option value="POV">POV / Field Hunt</option>
              <option value="slideshow">Slideshow / Tier List</option>
            </select>
          </div>
        </div>

        {/* Quick Trend Chips */}
        {activeAccountTrends.length > 0 && (
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-[#7E788B] block mb-1.5">
              Active Radar Signals (Click to load):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeAccountTrends.slice(0, 4).map((trend) => (
                <button
                  key={trend.id}
                  onClick={() => handleSelectTrend(trend.topic)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    topic === trend.topic
                      ? 'bg-[#16141F] text-white border-[#16141F]'
                      : 'bg-[#FAF8F3] text-[#4A4553] border-[#E8E2D8] hover:bg-[#F2EDE4]'
                  }`}
                >
                  {trend.topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex justify-end pt-2 border-t border-[#EFEBE4]">
          <button
            disabled={isGenerating || !topic.trim()}
            onClick={handleGenerateFullPackage}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Production Script with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Video Package</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Package Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Script & Hooks (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 3 Hook Options Card */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FFF2DE] text-[#C05621]">
                  Step 1
                </span>
                <h3 className="font-editorial text-base font-semibold text-[#16141F]">
                  3 Hook Options (0:00 - 0:03)
                </h3>
              </div>
              <button
                disabled={regeneratingSection === 'hooks'}
                onClick={() => handleRegenerateSection('hooks')}
                className="flex items-center gap-1 text-[11px] text-[#7A7585] hover:text-[#E65100] transition-colors cursor-pointer"
              >
                <RotateCw className={`w-3 h-3 ${regeneratingSection === 'hooks' ? 'animate-spin' : ''}`} />
                <span>Regenerate Hooks</span>
              </button>
            </div>

            <p className="text-xs text-[#7A7585]">
              Select the opening hook to test audience retention. Selected hook is automatically placed at the top of the timeline.
            </p>

            <div className="space-y-2.5 mt-2">
              {generatedContent.hookOptions.map((hook, idx) => {
                const isSelected = generatedContent.selectedHookIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setGeneratedContent({ ...generatedContent, selectedHookIndex: idx })}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF9F5] border-[#FF8A65] card-shadow'
                        : 'bg-[#FAF8F3] border-[#E8E2D8] hover:border-[#D5CFC3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05621]">
                        {hook.type}
                      </span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#FF8A65] bg-[#FF8A65]' : 'border-[#C8C2B5]'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#16141F]">
                      "{hook.spokenText}"
                    </div>
                    <div className="text-[11px] text-[#6E687A] mt-1 italic">
                      Visual: {hook.visualAction}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Script with Timestamps & Shot Directions */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FFF2DE] text-[#C05621]">
                  Step 2
                </span>
                <h3 className="font-editorial text-base font-semibold text-[#16141F]">
                  Production Script & Shot List
                </h3>
              </div>
              <button
                disabled={regeneratingSection === 'script'}
                onClick={() => handleRegenerateSection('script')}
                className="flex items-center gap-1 text-[11px] text-[#7A7585] hover:text-[#E65100] transition-colors cursor-pointer"
              >
                <RotateCw className={`w-3 h-3 ${regeneratingSection === 'script' ? 'animate-spin' : ''}`} />
                <span>Regenerate Script</span>
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {generatedContent.script.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-semibold text-[#C05621] px-2 py-0.5 rounded bg-white border border-[#E5DFD4]">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#16141F] text-white">
                      ON SCREEN: {item.onScreenText}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8496] block">
                      Camera Direction:
                    </span>
                    <p className="text-xs text-[#5C5666] italic mt-0.5">
                      {item.shot}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8496] block">
                      Spoken Dialogue ({activePersona.name}):
                    </span>
                    <p className="text-xs font-medium text-[#16141F] mt-0.5 leading-relaxed">
                      "{item.dialogue}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Captions, Visual Prompt, Sound & Dispatch (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dispatch to Pipeline CTA Card */}
          <div className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-3">
            <h3 className="font-editorial text-base font-semibold text-[#16141F]">
              Ready for Production
            </h3>
            <p className="text-xs text-[#6E687A]">
              Pushes this script package to the Kanban board at stage <strong>"Scripted"</strong>.
            </p>

            <button
              onClick={handleSendToPipeline}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send to Production Pipeline</span>
            </button>
          </div>

          {/* Caption & Hashtags */}
          <div className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
              <span className="text-xs font-semibold text-[#16141F]">
                Caption & Metadata
              </span>
              <button
                disabled={regeneratingSection === 'caption'}
                onClick={() => handleRegenerateSection('caption')}
                className="text-[10px] text-[#7A7585] hover:text-[#E65100] cursor-pointer"
              >
                Regenerate
              </button>
            </div>

            <textarea
              rows={4}
              value={generatedContent.caption}
              onChange={(e) => setGeneratedContent({ ...generatedContent, caption: e.target.value })}
              className="w-full p-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none resize-none leading-relaxed"
            />

            <div>
              <span className="text-[10px] font-semibold text-[#8C8797] uppercase tracking-wider block mb-1">
                Optimized Hashtags
              </span>
              <div className="flex flex-wrap gap-1">
                {generatedContent.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#E5DFD4] text-[#16141F] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sound Style Recommendation */}
          <div className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#16141F]">
              <Music className="w-3.5 h-3.5 text-[#E65100]" />
              <span>Recommended Soundscape</span>
            </div>
            <p className="text-xs text-[#5C5666] leading-relaxed">
              {generatedContent.soundStyle}
            </p>
          </div>

          {/* Locked Character Visual Diffusion Prompt */}
          <div className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-2">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold text-[#16141F] flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#E65100]" />
                <span>Diffusion Visual Prompt</span>
              </span>
              <button
                disabled={regeneratingSection === 'visualPrompt'}
                onClick={() => handleRegenerateSection('visualPrompt')}
                className="text-[10px] text-[#7A7585] hover:text-[#E65100] cursor-pointer"
              >
                Regenerate
              </button>
            </div>
            <p className="text-[10px] text-[#8C6D46] bg-[#FFFDF8] p-2 rounded-lg border border-[#F2DEB9]">
              Embeds locked character attributes: "{activePersona.visualIdentity?.styleKeywords?.[0] || 'stylized 3D'}"
            </p>
            <textarea
              rows={4}
              value={generatedContent.visualPrompt}
              onChange={(e) => setGeneratedContent({ ...generatedContent, visualPrompt: e.target.value })}
              className="w-full p-2.5 text-xs font-mono rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none resize-none leading-relaxed text-[#16141F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
