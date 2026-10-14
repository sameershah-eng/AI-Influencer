import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Kanban, 
  CheckCircle2, 
  Clock, 
  Film, 
  ShieldCheck, 
  X, 
  ChevronRight, 
  Bot, 
  Calendar, 
  Lock, 
  Check, 
  ArrowRight,
  Eye,
  FileText,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContentItem, PipelineStage } from '../types';
import { PageId } from '../components/Sidebar';

interface ProductionPipelineProps {
  onNavigate: (page: PageId) => void;
}

export const ProductionPipeline: React.FC<ProductionPipelineProps> = ({ onNavigate }) => {
  const { 
    activePersona, 
    activeAccountContent, 
    moveContentStage, 
    updateContentItem,
    addToast 
  } = useApp();

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const stages: PipelineStage[] = [
    'Idea',
    'Scripted',
    'In Production',
    'In Review',
    'Approved',
    'Scheduled',
    'Published'
  ];

  const handleStageSelect = (item: ContentItem, newStage: PipelineStage) => {
    const success = moveContentStage(item.id, newStage);
    if (success && selectedItem?.id === item.id) {
      setSelectedItem(prev => prev ? { ...prev, stage: newStage } : null);
    }
  };

  const toggleChecklistItem = (item: ContentItem, key: keyof ContentItem['checklist']) => {
    const updatedChecklist = {
      ...item.checklist,
      [key]: !item.checklist[key]
    };
    updateContentItem(item.id, { checklist: updatedChecklist });
    if (selectedItem?.id === item.id) {
      setSelectedItem({ ...item, checklist: updatedChecklist });
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Bar */}
      <div className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Kanban className="w-5 h-5 text-[#E65100]" />
            <h2 className="font-editorial text-xl font-bold text-[#16141F]">
              Autonomous Production Pipeline
            </h2>
          </div>
          <p className="text-xs text-[#7A7585] mt-0.5">
            Orchestrates generative asset rendering, voice alignment, and human compliance gates for {activePersona.name}.
          </p>
        </div>

        {/* Human in the loop rule reminder */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFF5F7] border border-[#FCD5DE] text-[11px] text-[#D81B60] font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>Governance Rule: Human approval strictly required before "Scheduled" stage.</span>
        </div>
      </div>

      {/* 7-Column Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1300px]">
          {stages.map((stage) => {
            const itemsInStage = activeAccountContent.filter(i => i.stage === stage);
            const isReviewStage = stage === 'In Review';
            const isApprovedStage = stage === 'Approved';

            return (
              <div
                key={stage}
                className="w-72 shrink-0 flex flex-col rounded-2xl bg-[#F7F4EC] border border-[#EBE4D8] p-3 max-h-[750px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#16141F]">
                      {stage}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white text-[#4A4553] border border-[#E5DFD4]">
                      {itemsInStage.length}
                    </span>
                  </div>
                  {isReviewStage && itemsInStage.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#F2668B] animate-pulse" />
                  )}
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {itemsInStage.map((item) => {
                    const completedTasks = Object.values(item.checklist).filter(Boolean).length;
                    const totalTasks = Object.keys(item.checklist).length;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        onClick={() => setSelectedItem(item)}
                        className="p-3.5 rounded-xl bg-white border border-[#E8E2D8] card-shadow card-shadow-hover hover:border-[#FF8A65] transition-all cursor-pointer group space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#E8E2D8] font-semibold text-[#16141F]">
                            {item.format}
                          </span>
                          <span className="text-[#8C8797] font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.targetDurationSeconds}s
                          </span>
                        </div>

                        <h4 className="font-editorial text-xs font-semibold text-[#16141F] line-clamp-2 group-hover:text-[#E65100] transition-colors leading-snug">
                          {item.title}
                        </h4>

                        {/* Checklist Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-[#7A7585]">
                            <span>Render Pipeline</span>
                            <span>{completedTasks}/{totalTasks}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#FAF8F3] border border-[#ECE6DC] overflow-hidden">
                            <div 
                              className="h-full rounded-full brand-gradient transition-all duration-300"
                              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Card Footer: Agent Badge */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#F2ECE1] text-[10px] text-[#8C8797]">
                          <span className="flex items-center gap-1 truncate max-w-[140px]">
                            <Bot className="w-3 h-3 text-[#E65100] shrink-0" />
                            <span className="truncate">{item.assignedAgent.split('Agent')[0]}</span>
                          </span>
                          {item.stage === 'In Review' && (
                            <span className="text-[#D81B60] font-semibold">
                              Review
                            </span>
                          )}
                          {item.stage === 'Scheduled' && (
                            <span className="text-indigo-600 font-medium">
                              {item.scheduledDate ? item.scheduledDate.slice(5) : 'Auto'}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  {itemsInStage.length === 0 && (
                    <div className="p-6 text-center border-2 border-dashed border-[#E5DFD4] rounded-xl text-xs text-[#9892A2]">
                      No items
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Drawer for Card Inspection */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex justify-end z-50">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-lg bg-white h-full border-l border-[#E5DFD4] card-shadow-elevated flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#EFEBE4] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFF2DE] text-[#C05621] uppercase tracking-wider">
                    {selectedItem.stage}
                  </span>
                  <h3 className="font-editorial text-lg font-bold text-[#16141F] mt-1 leading-snug">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 rounded-lg text-[#8C8797] hover:text-[#16141F] hover:bg-[#FAF8F3] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Stage Navigation Action Strip */}
                <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#16141F]">
                    <span>Current Stage: {selectedItem.stage}</span>
                    {selectedItem.stage === 'In Review' && (
                      <button
                        onClick={() => {
                          setSelectedItem(null);
                          onNavigate('approval-queue');
                        }}
                        className="text-xs font-semibold text-[#D81B60] hover:underline flex items-center gap-1"
                      >
                        <span>Open in Approval Station</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stages.map((stg) => {
                      const isCurrent = selectedItem.stage === stg;
                      // Can only move to Scheduled if current stage is Approved
                      const isScheduleDisabled = stg === 'Scheduled' && selectedItem.stage !== 'Approved';

                      return (
                        <button
                          key={stg}
                          disabled={isCurrent || isScheduleDisabled}
                          onClick={() => handleStageSelect(selectedItem, stg)}
                          className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#16141F] text-white'
                              : isScheduleDisabled
                              ? 'bg-[#F2ECE1] text-[#A59FA9] opacity-50 cursor-not-allowed'
                              : 'bg-white border border-[#E5DFD4] text-[#4A4553] hover:bg-[#F2EDE4]'
                          }`}
                          title={isScheduleDisabled ? 'Must be approved in Approval Queue first' : undefined}
                        >
                          {stg}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Production Render Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E788B]">
                    Multi-Model Render Checklist
                  </h4>
                  <div className="space-y-2">
                    {[
                      { key: 'imageGenerated' as const, label: 'Consistent Character Frames (Midjourney/Flux)' },
                      { key: 'videoGenerated' as const, label: '9:16 Short-Form Video Diffusion (Veo 3.1 / Kling)' },
                      { key: 'voiceSynthesized' as const, label: 'Character Voice Dialogue (ElevenLabs Turbo)' },
                      { key: 'lipSyncCompleted' as const, label: 'Phoneme Lip-Sync Alignment (Hedra Character-2)' },
                      { key: 'finalEditRendered' as const, label: 'Subtitles & Soundstem Mastering' },
                    ].map((task) => (
                      <label
                        key={task.key}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] hover:bg-[#F2EDE4] transition-colors cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItem.checklist[task.key]}
                          onChange={() => toggleChecklistItem(selectedItem, task.key)}
                          className="w-4 h-4 rounded text-[#FF8A65] accent-[#FF8A65] cursor-pointer"
                        />
                        <span className={`flex-1 ${selectedItem.checklist[task.key] ? 'line-through text-[#8C8797]' : 'text-[#16141F] font-medium'}`}>
                          {task.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Spoken Script Snippets */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E788B]">
                    Script & Shot Breakdown
                  </h4>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {selectedItem.script?.map((s, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2D8] text-xs">
                        <div className="text-[10px] font-mono font-semibold text-[#E65100]">
                          {s.time} • ON SCREEN: {s.onScreenText}
                        </div>
                        <div className="text-[#16141F] mt-1 font-medium">
                          "{s.dialogue}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caption */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E788B]">
                    Caption
                  </h4>
                  <p className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] text-xs text-[#5C5666] leading-relaxed whitespace-pre-line">
                    {selectedItem.caption}
                  </p>
                </div>

                {/* History Log */}
                <div className="space-y-2 pt-2 border-t border-[#EFEBE4]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E788B]">
                    Audit Trail & History
                  </h4>
                  <div className="space-y-1.5">
                    {selectedItem.history?.map((h, idx) => (
                      <div key={idx} className="text-[11px] text-[#6E687A] flex items-center justify-between">
                        <span>{h.action} ({h.agentOrUser})</span>
                        <span className="text-[#9992A4] font-mono text-[10px]">{h.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
