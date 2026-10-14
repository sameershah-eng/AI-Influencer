import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ShieldCheck, 
  Film, 
  Sparkles, 
  Volume2, 
  Clock, 
  MessageSquare, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContentItem } from '../types';
import { PageId } from '../components/Sidebar';

interface ApprovalQueueProps {
  onNavigate: (page: PageId) => void;
}

export const ApprovalQueue: React.FC<ApprovalQueueProps> = ({ onNavigate }) => {
  const { 
    activePersona, 
    activeAccountContent, 
    approveContent, 
    rejectContent, 
    requestChanges 
  } = useApp();

  // All items currently awaiting review
  const reviewQueue = activeAccountContent.filter(i => i.stage === 'In Review');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modals for comments
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [notesInput, setNotesInput] = useState('');
  const [rejectInput, setRejectInput] = useState('');

  const currentItem: ContentItem | undefined = reviewQueue[currentIndex];

  const handleApprove = (id: string) => {
    approveContent(id);
    if (currentIndex >= reviewQueue.length - 1) {
      setCurrentIndex(Math.max(0, reviewQueue.length - 2));
    }
  };

  const handleRequestChanges = () => {
    if (!currentItem || !notesInput.trim()) return;
    requestChanges(currentItem.id, notesInput.trim());
    setNotesModalOpen(false);
    setNotesInput('');
    if (currentIndex >= reviewQueue.length - 1) {
      setCurrentIndex(Math.max(0, reviewQueue.length - 2));
    }
  };

  const handleReject = () => {
    if (!currentItem || !rejectInput.trim()) return;
    rejectContent(currentItem.id, rejectInput.trim());
    setRejectModalOpen(false);
    setRejectInput('');
    if (currentIndex >= reviewQueue.length - 1) {
      setCurrentIndex(Math.max(0, reviewQueue.length - 2));
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Compliance Rule Banner */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] card-shadow flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FFF0F4] text-[#D81B60] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#16141F]">
              Human-in-the-Loop Sign-Off Station
            </h2>
            <p className="text-[11px] text-[#7A7585]">
              Strict Safety Rule: Autonomous agent dispatchers cannot schedule or publish content without verified editorial approval.
            </p>
          </div>
        </div>

        <div className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E5DFD4] text-[#16141F]">
          Queue: {reviewQueue.length} Pending
        </div>
      </div>

      {reviewQueue.length === 0 ? (
        /* Empty State */
        <div className="p-16 text-center rounded-[24px] bg-white border border-[#E8E2D8] card-shadow space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#16141F]">
              All Clear in Queue
            </h3>
            <p className="text-xs text-[#7A7585] mt-1 max-w-xs mx-auto leading-relaxed">
              Every content package for {activePersona.name} has been reviewed and certified for algorithmic release.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('content-calendar')}
              className="px-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] text-xs font-semibold text-[#16141F] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
            >
              View Scheduled Calendar
            </button>
            <button
              onClick={() => onNavigate('production-pipeline')}
              className="px-4 py-2 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 transition-all cursor-pointer"
            >
              Check Production Pipeline
            </button>
          </div>
        </div>
      ) : currentItem ? (
        /* Review Workspace */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
          {/* Left: Phone-Frame Live Preview (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* Phone Frame */}
            <div className="w-[310px] h-[610px] rounded-[44px] bg-[#16141F] p-3 shadow-2xl border-4 border-[#282535] relative flex flex-col overflow-hidden">
              {/* Dynamic Island / Speaker Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
              </div>

              {/* Screen Area (9:16 vertical) */}
              <div className="flex-1 rounded-[32px] overflow-hidden relative bg-slate-900 flex flex-col justify-between p-4 text-white">
                {/* Background Video/Image Render Frame */}
                <img
                  src={currentItem.thumbnailUrl}
                  alt={currentItem.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Overlay: Format & Progress Indicator */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-semibold">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                    {currentItem.format.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                    0:00 / {currentItem.targetDurationSeconds}s
                  </span>
                </div>

                {/* Center Dynamic On-Screen Text Badge */}
                <div className="relative z-10 text-center my-auto px-2">
                  <span className="inline-block bg-[#16141F]/90 text-[#FFC83D] border border-[#FFC83D]/40 font-editorial text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg tracking-wide uppercase">
                    {currentItem.script?.[0]?.onScreenText || 'WATCH THIS'}
                  </span>
                </div>

                {/* Bottom Overlay: Handle, Caption, Sound */}
                <div className="relative z-10 space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{activePersona.handle}</span>
                    <span className="text-[10px] text-white/70">• Follow</span>
                  </div>

                  <p className="text-[11px] text-white/90 line-clamp-3 leading-snug">
                    {currentItem.caption}
                  </p>

                  <div className="flex items-center gap-1.5 text-[10px] text-white/75 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                    <Volume2 className="w-3 h-3 text-[#FFC83D] shrink-0" />
                    <span className="truncate">{currentItem.soundStyle}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-[#8C8797] mt-3 font-medium">
              Real-time 9:16 aspect ratio simulation ({activePersona.platformFocus})
            </div>
          </div>

          {/* Right: Inspection & Decision Console (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            {/* Queue Pager */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
              <span className="text-xs font-semibold text-[#16141F]">
                Reviewing <strong>{currentIndex + 1}</strong> of <strong>{reviewQueue.length}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  className="p-1.5 rounded-lg bg-white border border-[#E5DFD4] hover:bg-[#F5F2EB] disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentIndex >= reviewQueue.length - 1}
                  onClick={() => setCurrentIndex(prev => Math.min(reviewQueue.length - 1, prev + 1))}
                  className="p-1.5 rounded-lg bg-white border border-[#E5DFD4] hover:bg-[#F5F2EB] disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Asset Details */}
            <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05621] block">
                  Title & Hook Strategy
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#16141F] mt-1 leading-snug">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-[#5C5666] mt-2 italic bg-[#FAF8F3] p-3 rounded-xl border border-[#EAE4D9]">
                  "{currentItem.hookOptions?.[currentItem.selectedHookIndex || 0]?.spokenText || currentItem.script?.[0]?.dialogue}"
                </p>
              </div>

              {/* Script Timeline */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8496] block">
                  Full Script Timeline
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {currentItem.script?.map((line, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#ECE5D8] text-xs">
                      <div className="text-[10px] font-mono font-semibold text-[#E65100]">
                        {line.time}
                      </div>
                      <div className="text-[#16141F] mt-0.5 font-medium">
                        "{line.dialogue}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Warnings if any */}
              {currentItem.reviewNotes && (
                <div className="p-3 rounded-xl bg-[#FFF6EE] border border-[#FDE1CD] flex items-start gap-2 text-xs text-[#C05621]">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Prior Review Note:</strong> {currentItem.reviewNotes}
                  </div>
                </div>
              )}
            </div>

            {/* Decision Action Buttons */}
            <div className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8496] block">
                Editorial Verdict
              </span>

              <div className="grid grid-cols-3 gap-3">
                {/* Reject */}
                <button
                  onClick={() => setRejectModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>

                {/* Request Changes */}
                <button
                  onClick={() => setNotesModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Request Changes</span>
                </button>

                {/* Approve */}
                <button
                  onClick={() => handleApprove(currentItem.id)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Request Changes Modal */}
      <AnimatePresence>
        {notesModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-[24px] border border-[#E5DFD4] card-shadow-elevated p-6 space-y-4"
            >
              <h3 className="font-editorial text-lg font-bold text-[#16141F]">
                Request Changes from Agents
              </h3>
              <p className="text-xs text-[#7A7585]">
                Describe the specific edits required. The asset will return to the "In Production" stage with these notes.
              </p>

              <textarea
                rows={3}
                placeholder="e.g. Lip sync is slightly misaligned at 0:14 peak. Re-render Hedra engine phonemes."
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65] resize-none"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setNotesModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#7A7585] hover:bg-[#FAF8F3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={!notesInput.trim()}
                  onClick={handleRequestChanges}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  Return to Production
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {rejectModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-[24px] border border-[#E5DFD4] card-shadow-elevated p-6 space-y-4"
            >
              <h3 className="font-editorial text-lg font-bold text-[#16141F]">
                Reject Content Package
              </h3>
              <p className="text-xs text-[#7A7585]">
                Provide an editorial justification. This item will be dropped back to "Idea" and flagged for revision.
              </p>

              <textarea
                rows={3}
                placeholder="e.g. Tone violates persona taboo topic. Rejecting concept."
                value={rejectInput}
                onChange={(e) => setRejectInput(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65] resize-none"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setRejectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#7A7585] hover:bg-[#FAF8F3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={!rejectInput.trim()}
                  onClick={handleReject}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
