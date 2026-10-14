import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Mic, 
  Lock, 
  Sliders, 
  Plus, 
  X, 
  Check, 
  RefreshCw, 
  Play, 
  Volume2, 
  Camera, 
  Palette,
  Shield,
  Layers,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConsistencyScoreRing } from '../components/ConsistencyScoreRing';

export const PersonaStudio: React.FC = () => {
  const { activePersona, updatePersona, addToast } = useApp();

  // Local form state initialized from activePersona
  const [name, setName] = useState(activePersona.name);
  const [handle, setHandle] = useState(activePersona.handle);
  const [type, setType] = useState(activePersona.type);
  const [niche, setNiche] = useState(activePersona.niche);
  const [tone, setTone] = useState(activePersona.tone);
  const [platformFocus, setPlatformFocus] = useState(activePersona.platformFocus);
  const [backstory, setBackstory] = useState(activePersona.backstory);
  const [audience, setAudience] = useState(activePersona.audience);
  const [postingCadence, setPostingCadence] = useState(activePersona.postingCadence);

  // Traits
  const [traits, setTraits] = useState(activePersona.traits);

  // Catchphrases & Topics
  const [catchphrases, setCatchphrases] = useState(activePersona.catchphrases || []);
  const [newCatchphrase, setNewCatchphrase] = useState('');
  const [topicsToOwn, setTopicsToOwn] = useState(activePersona.topicsToOwn || []);
  const [newTopicToOwn, setNewTopicToOwn] = useState('');
  const [topicsToAvoid, setTopicsToAvoid] = useState(activePersona.topicsToAvoid || []);
  const [newTopicToAvoid, setNewTopicToAvoid] = useState('');

  // Visual Identity
  const [characterPrompt, setCharacterPrompt] = useState(activePersona.visualIdentity?.characterPrompt || '');
  const [colorPalette, setColorPalette] = useState(activePersona.visualIdentity?.colorPalette || ['#FFC83D', '#FF8A65', '#2B2D42']);
  const [styleKeywords, setStyleKeywords] = useState(activePersona.visualIdentity?.styleKeywords || []);
  const [newKeyword, setNewKeyword] = useState('');

  // Voice Identity
  const [voiceDesc, setVoiceDesc] = useState(activePersona.voiceIdentity?.description || '');
  const [voicePace, setVoicePace] = useState(activePersona.voiceIdentity?.pace || '');
  const [sampleScript, setSampleScript] = useState(activePersona.voiceIdentity?.sampleScript || '');
  const [elevenLabsId, setElevenLabsId] = useState(activePersona.voiceIdentity?.elevenLabsVoiceId || '');
  const [lipSyncProvider, setLipSyncProvider] = useState(activePersona.voiceIdentity?.lipSyncProvider || '');

  // AI Generator Modal
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiConceptPrompt, setAiConceptPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync state if activePersona changes
  React.useEffect(() => {
    setName(activePersona.name);
    setHandle(activePersona.handle);
    setType(activePersona.type);
    setNiche(activePersona.niche);
    setTone(activePersona.tone);
    setPlatformFocus(activePersona.platformFocus);
    setBackstory(activePersona.backstory);
    setAudience(activePersona.audience);
    setPostingCadence(activePersona.postingCadence);
    setTraits(activePersona.traits);
    setCatchphrases(activePersona.catchphrases || []);
    setTopicsToOwn(activePersona.topicsToOwn || []);
    setTopicsToAvoid(activePersona.topicsToAvoid || []);
    setCharacterPrompt(activePersona.visualIdentity?.characterPrompt || '');
    setColorPalette(activePersona.visualIdentity?.colorPalette || ['#FFC83D', '#FF8A65', '#2B2D42']);
    setStyleKeywords(activePersona.visualIdentity?.styleKeywords || []);
    setVoiceDesc(activePersona.voiceIdentity?.description || '');
    setVoicePace(activePersona.voiceIdentity?.pace || '');
    setSampleScript(activePersona.voiceIdentity?.sampleScript || '');
    setElevenLabsId(activePersona.voiceIdentity?.elevenLabsVoiceId || '');
    setLipSyncProvider(activePersona.voiceIdentity?.lipSyncProvider || '');
  }, [activePersona]);

  const handleSave = () => {
    updatePersona(activePersona.id, {
      name,
      handle,
      type,
      niche,
      tone,
      platformFocus,
      backstory,
      audience,
      postingCadence,
      traits,
      catchphrases,
      topicsToOwn,
      topicsToAvoid,
      visualIdentity: {
        ...activePersona.visualIdentity,
        characterPrompt,
        colorPalette,
        styleKeywords,
      },
      voiceIdentity: {
        ...activePersona.voiceIdentity,
        description: voiceDesc,
        pace: voicePace,
        sampleScript,
        elevenLabsVoiceId: elevenLabsId,
        lipSyncProvider,
      }
    });
  };

  const handleGeneratePersonaWithAI = async () => {
    if (!aiConceptPrompt.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: aiConceptPrompt,
          personaType: type
        })
      });

      const json = await res.json();
      const data = json.data;

      if (data) {
        setName(data.name || name);
        if (data.handle) setHandle(data.handle);
        if (data.type) setType(data.type);
        if (data.niche) setNiche(data.niche);
        if (data.backstory) setBackstory(data.backstory);
        if (data.audience) setAudience(data.audience);
        if (data.traits) setTraits(data.traits);
        if (data.catchphrases) setCatchphrases(data.catchphrases);
        if (data.topicsToOwn) setTopicsToOwn(data.topicsToOwn);
        if (data.topicsToAvoid) setTopicsToAvoid(data.topicsToAvoid);
        if (data.postingCadence) setPostingCadence(data.postingCadence);
        if (data.visualIdentity) {
          setCharacterPrompt(data.visualIdentity.characterPrompt || characterPrompt);
          if (data.visualIdentity.colorPalette) setColorPalette(data.visualIdentity.colorPalette);
          if (data.visualIdentity.styleKeywords) setStyleKeywords(data.visualIdentity.styleKeywords);
        }
        if (data.voiceIdentity) {
          setVoiceDesc(data.voiceIdentity.description || voiceDesc);
          setVoicePace(data.voiceIdentity.pace || voicePace);
          setSampleScript(data.voiceIdentity.sampleScript || sampleScript);
          setElevenLabsId(data.voiceIdentity.elevenLabsVoiceId || elevenLabsId);
          setLipSyncProvider(data.voiceIdentity.lipSyncProvider || lipSyncProvider);
        }

        addToast({
          title: 'Character Bible Synthesized',
          message: `Generated complete identity for ${data.name}`,
          type: 'success'
        });
        setAiModalOpen(false);
        setAiConceptPrompt('');
      }
    } catch (err) {
      addToast({
        title: 'Generation Failed',
        message: 'Could not connect to AI engine. Using local defaults.',
        type: 'error'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const playVoicePreview = () => {
    setIsPlayingAudio(true);
    // Use Web Speech API or synthetic chime to demo audio playback cleanly
    if ('speechSynthesis' in window && sampleScript) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sampleScript);
      utterance.rate = activePersona.id === 'pip-quackers' ? 1.25 : 0.95;
      utterance.pitch = activePersona.id === 'pip-quackers' ? 1.3 : 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2800);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow">
        <div>
          <h2 className="font-editorial text-xl font-bold text-[#16141F]">
            Persona Bible & Identity Vault
          </h2>
          <p className="text-xs text-[#7A7585]">
            Defines the multi-modal boundaries for visual diffusion, voice cloning, and autonomous agents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFF6EE] border border-[#FDE1CD] text-[#C05621] text-xs font-semibold hover:bg-[#FFEEDE] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E65100]" />
            <span>Generate with AI</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Bible Changes</span>
          </button>
        </div>
      </div>

      {/* Consistency Score Ring & Avatar Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <ConsistencyScoreRing persona={activePersona} />
        </div>
        <div className="md:col-span-7 flex items-center p-5 rounded-2xl bg-white border border-[#E8E2D8] card-shadow gap-5">
          <div className="relative group shrink-0">
            <img
              src={activePersona.avatar}
              alt={name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#EBE5DB] shadow-sm"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-xl font-bold text-[#16141F] truncate">
                {name}
              </span>
              <span className="text-xs text-[#8C8797] font-medium">{handle}</span>
            </div>
            <p className="text-xs text-[#6E687A] mt-1 line-clamp-2">
              {niche}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F2EDE4] text-[#4A4553] font-medium">
                {type}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFF2DE] text-[#C05621] font-medium">
                {platformFocus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Configuration Tabs / Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Left Column: Narrative & Personality Lore */}
        <div className="space-y-6">
          {/* Core Profile */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#EFEBE4]">
              <FileText className="w-4 h-4 text-[#E65100]" />
              <h3 className="font-editorial text-base font-semibold text-[#16141F]">
                Identity & Lore
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                  Social Handle
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                  Persona Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                >
                  <option value="Fictional Character">Fictional Character</option>
                  <option value="Virtual Human">Virtual Human</option>
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
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                >
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Primary Collectibles Niche
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Backstory & Origin Mythos
              </label>
              <textarea
                rows={3}
                value={backstory}
                onChange={(e) => setBackstory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65] leading-relaxed resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Target Collector Audience
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Posting Cadence
              </label>
              <input
                type="text"
                value={postingCadence}
                onChange={(e) => setPostingCadence(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
              />
            </div>
          </div>

          {/* Personality Sliders */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#EFEBE4]">
              <Sliders className="w-4 h-4 text-[#E65100]" />
              <h3 className="font-editorial text-base font-semibold text-[#16141F]">
                Personality Trait Dimensions
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-[#4A4553] mb-1">
                  <span>Playful vs Serious</span>
                  <span className="font-bold text-[#E65100] tabular-nums">{traits.playfulness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={traits.playfulness}
                  onChange={(e) => setTraits({ ...traits, playfulness: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#FF8A65] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-[#4A4553] mb-1">
                  <span>Casual vs Polished</span>
                  <span className="font-bold text-[#E65100] tabular-nums">{traits.polish}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={traits.polish}
                  onChange={(e) => setTraits({ ...traits, polish: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#FF8A65] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-[#4A4553] mb-1">
                  <span>Accessible vs Insider Lore</span>
                  <span className="font-bold text-[#E65100] tabular-nums">{traits.insiderKnowledge}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={traits.insiderKnowledge}
                  onChange={(e) => setTraits({ ...traits, insiderKnowledge: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#FF8A65] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-[#4A4553] mb-1">
                  <span>Calm Zen vs High Energy</span>
                  <span className="font-bold text-[#E65100] tabular-nums">{traits.energyLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={traits.energyLevel}
                  onChange={(e) => setTraits({ ...traits, energyLevel: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#FF8A65] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Catchphrases & Guardrails */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
            <h3 className="font-editorial text-base font-semibold text-[#16141F]">
              Catchphrases & Editorial Boundaries
            </h3>

            {/* Catchphrases */}
            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Signature Catchphrases
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {catchphrases.map((phrase, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F3] border border-[#E5DFD4] text-xs font-medium text-[#16141F]"
                  >
                    <span>"{phrase}"</span>
                    <button
                      onClick={() => setCatchphrases(catchphrases.filter((_, i) => i !== idx))}
                      className="text-[#9C94A6] hover:text-rose-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add catchphrase..."
                  value={newCatchphrase}
                  onChange={(e) => setNewCatchphrase(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newCatchphrase.trim()) {
                      setCatchphrases([...catchphrases, newCatchphrase.trim()]);
                      setNewCatchphrase('');
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]"
                />
                <button
                  onClick={() => {
                    if (newCatchphrase.trim()) {
                      setCatchphrases([...catchphrases, newCatchphrase.trim()]);
                      setNewCatchphrase('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#EFEBE4] hover:bg-[#E5DFD4] text-xs font-medium cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Topics to Own */}
            <div>
              <label className="text-[11px] font-semibold text-emerald-800 block mb-1">
                Topics to Own (Approved Pillars)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {topicsToOwn.map((topic, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium"
                  >
                    <span>{topic}</span>
                    <button
                      onClick={() => setTopicsToOwn(topicsToOwn.filter((_, i) => i !== idx))}
                      className="text-emerald-700 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add pillar..."
                  value={newTopicToOwn}
                  onChange={(e) => setNewTopicToOwn(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTopicToOwn.trim()) {
                      setTopicsToOwn([...topicsToOwn, newTopicToOwn.trim()]);
                      setNewTopicToOwn('');
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]"
                />
                <button
                  onClick={() => {
                    if (newTopicToOwn.trim()) {
                      setTopicsToOwn([...topicsToOwn, newTopicToOwn.trim()]);
                      setNewTopicToOwn('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#EFEBE4] hover:bg-[#E5DFD4] text-xs font-medium cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Topics to Avoid */}
            <div>
              <label className="text-[11px] font-semibold text-rose-800 block mb-1">
                Topics to Avoid (Strict Taboos)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {topicsToAvoid.map((topic, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 font-medium"
                  >
                    <span>{topic}</span>
                    <button
                      onClick={() => setTopicsToAvoid(topicsToAvoid.filter((_, i) => i !== idx))}
                      className="text-rose-600 hover:text-rose-800 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add taboo topic..."
                  value={newTopicToAvoid}
                  onChange={(e) => setNewTopicToAvoid(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTopicToAvoid.trim()) {
                      setTopicsToAvoid([...topicsToAvoid, newTopicToAvoid.trim()]);
                      setNewTopicToAvoid('');
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]"
                />
                <button
                  onClick={() => {
                    if (newTopicToAvoid.trim()) {
                      setTopicsToAvoid([...topicsToAvoid, newTopicToAvoid.trim()]);
                      setNewTopicToAvoid('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#EFEBE4] hover:bg-[#E5DFD4] text-xs font-medium cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Diffusion & Voice Synthesis Locks */}
        <div className="space-y-6">
          {/* Visual Identity & Reference Sheet */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#E65100]" />
                <h3 className="font-editorial text-base font-semibold text-[#16141F]">
                  Visual Identity & Reference Sheet
                </h3>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF2DE] text-[#C05621]">
                4-Slot LoRA Alignment
              </span>
            </div>

            {/* 4 Reference Images */}
            <div className="grid grid-cols-4 gap-2.5">
              <div className="flex flex-col items-center">
                <img
                  src={activePersona.visualIdentity?.faceFrontImage || activePersona.avatar}
                  alt="Face Front"
                  className="w-full aspect-square rounded-xl object-cover border border-[#E5DFD4]"
                />
                <span className="text-[10px] text-[#7A7585] mt-1 font-medium">Face Front</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={activePersona.visualIdentity?.faceSideImage || activePersona.avatar}
                  alt="Face Profile"
                  className="w-full aspect-square rounded-xl object-cover border border-[#E5DFD4]"
                />
                <span className="text-[10px] text-[#7A7585] mt-1 font-medium">Profile 45°</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={activePersona.visualIdentity?.fullBodyImage || activePersona.avatar}
                  alt="Full Body"
                  className="w-full aspect-square rounded-xl object-cover border border-[#E5DFD4]"
                />
                <span className="text-[10px] text-[#7A7585] mt-1 font-medium">Full Scale</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={activePersona.visualIdentity?.outfitSetImage || activePersona.avatar}
                  alt="Outfit Palette"
                  className="w-full aspect-square rounded-xl object-cover border border-[#E5DFD4]"
                />
                <span className="text-[10px] text-[#7A7585] mt-1 font-medium">Wardrobe</span>
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#E65100]" />
                <span>Color Palette</span>
              </label>
              <div className="flex items-center gap-2">
                {colorPalette.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 p-1 rounded-lg bg-[#FAF8F3] border border-[#E5DFD4]">
                    <span 
                      className="w-4 h-4 rounded-md border border-black/10 shrink-0" 
                      style={{ backgroundColor: color }} 
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...colorPalette];
                        newColors[idx] = e.target.value;
                        setColorPalette(newColors);
                      }}
                      className="w-16 text-[10px] font-mono bg-transparent focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Style Keywords */}
            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Visual Style Keywords
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {styleKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#E5DFD4] text-[11px] text-[#4A4553]"
                  >
                    <span>{kw}</span>
                    <button
                      onClick={() => setStyleKeywords(styleKeywords.filter((_, i) => i !== idx))}
                      className="text-[#8C8797] hover:text-rose-500 cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 50mm f/1.8, soft bokeh..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newKeyword.trim()) {
                      setStyleKeywords([...styleKeywords, newKeyword.trim()]);
                      setNewKeyword('');
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]"
                />
                <button
                  onClick={() => {
                    if (newKeyword.trim()) {
                      setStyleKeywords([...styleKeywords, newKeyword.trim()]);
                      setNewKeyword('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#EFEBE4] hover:bg-[#E5DFD4] text-xs font-medium cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Locked Character Prompt */}
            <div className="p-3.5 rounded-xl bg-[#FFFDF8] border border-[#F2DEB9] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8C4A00]">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#E65100]" />
                  <span>Locked Character Prompt (Diffusion Anchor)</span>
                </span>
                <span className="text-[10px] bg-[#FFECCC] px-1.5 py-0.2 rounded font-bold">
                  Always Injected
                </span>
              </div>
              <p className="text-[10px] text-[#8C6D46]">
                This exact prompt block is injected into Midjourney, Flux, and Veo diffusion calls to prevent character drift across episodes.
              </p>
              <textarea
                rows={4}
                value={characterPrompt}
                onChange={(e) => setCharacterPrompt(e.target.value)}
                className="w-full p-2.5 text-xs font-mono rounded-lg bg-white border border-[#E8DFC9] focus:outline-none focus:border-[#FF8A65] leading-relaxed resize-none text-[#16141F]"
              />
            </div>
          </div>

          {/* Voice Identity & Lip Sync Configuration */}
          <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFEBE4]">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#E65100]" />
                <h3 className="font-editorial text-base font-semibold text-[#16141F]">
                  Voice Profile & Lip Sync
                </h3>
              </div>
              <button
                onClick={playVoicePreview}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF8F3] border border-[#E5DFD4] text-xs font-semibold text-[#16141F] hover:bg-[#F0ECE4] transition-colors cursor-pointer"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-[#E65100] animate-pulse' : ''}`} />
                <span>{isPlayingAudio ? 'Playing...' : 'Test Sample Script'}</span>
              </button>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Acoustic Timbre & Tone
              </label>
              <textarea
                rows={2}
                value={voiceDesc}
                onChange={(e) => setVoiceDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                  Vocal Pace
                </label>
                <input
                  type="text"
                  value={voicePace}
                  onChange={(e) => setVoicePace(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                  ElevenLabs Voice ID
                </label>
                <input
                  type="text"
                  value={elevenLabsId}
                  onChange={(e) => setElevenLabsId(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Lip Sync Alignment Engine
              </label>
              <input
                type="text"
                value={lipSyncProvider}
                onChange={(e) => setLipSyncProvider(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                Sample Voice Benchmark Script
              </label>
              <textarea
                rows={3}
                value={sampleScript}
                onChange={(e) => setSampleScript(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65] resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Persona Generator Modal */}
      <AnimatePresence>
        {aiModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white rounded-[24px] border border-[#E5DFD4] card-shadow-elevated p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#16141F]">
                      Generate Persona with Gemini
                    </h3>
                    <p className="text-[11px] text-[#7A7585]">
                      Provide a one-line creative hook. The AI will synthesize lore, traits, prompts, and voice.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAiModalOpen(false)}
                  className="text-[#8C8797] hover:text-[#16141F] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#16141F] block mb-1.5">
                  Character Concept or Pitch
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. A cybernetic porcelain rabbit curator who appraises underground Tokyo vinyl drops and analyzes laser mold seam defects..."
                  value={aiConceptPrompt}
                  onChange={(e) => setAiConceptPrompt(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65] resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#8C8797]">
                  Powered by Gemini 3.8 Flash
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAiModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-[#6E687A] hover:bg-[#F5F2EB] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isGenerating || !aiConceptPrompt.trim()}
                    onClick={handleGeneratePersonaWithAI}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 disabled:opacity-50 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Synthesizing Identity...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate Bible</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
