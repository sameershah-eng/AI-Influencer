import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  Film, 
  Send, 
  CheckCircle2,
  Calendar as CalendarIcon,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContentItem } from '../types';

export const ContentCalendar: React.FC = () => {
  const { 
    personas, 
    activePersona, 
    contentItems, 
    updateContentItem, 
    addToast 
  } = useApp();

  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [filterAccount, setFilterAccount] = useState<string>('all');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // October (0-indexed: 9)

  const monthName = 'October 2026';

  // Days in October 2026 (Starts on Thursday)
  const daysInMonth = 31;
  const startDayOfWeek = 4; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu

  // Scheduled & Published items across all accounts
  const scheduledItems = contentItems.filter(item => {
    const isScheduledOrPublished = item.stage === 'Scheduled' || item.stage === 'Published';
    if (!isScheduledOrPublished) return false;
    if (filterAccount === 'all') return true;
    return item.accountId === filterAccount;
  });

  const getItemsForDay = (dayNum: number) => {
    const dateStr = `2026-10-${dayNum.toString().padStart(2, '0')}`;
    return scheduledItems.filter(i => {
      if (i.scheduledDate === dateStr) return true;
      // Fallback distribution for demo visualization
      if (i.id === 'pip-1' && dayNum === 2) return true;
      if (i.id === 'pip-2' && dayNum === 5) return true;
      if (i.id === 'pip-3' && dayNum === 16) return true;
      if (i.id === 'mara-1' && dayNum === 1) return true;
      if (i.id === 'mara-2' && dayNum === 6) return true;
      if (i.id === 'mara-3' && dayNum === 17) return true;
      return false;
    });
  };

  const handleMoveDay = (item: ContentItem, newDay: number) => {
    const newDateStr = `2026-10-${newDay.toString().padStart(2, '0')}`;
    updateContentItem(item.id, {
      scheduledDate: newDateStr
    });
    addToast({
      title: 'Post Rescheduled',
      message: `"${item.title}" moved to Oct ${newDay}`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl">
      {/* Calendar Header Controls */}
      <div className="p-5 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#E65100]" />
            <h2 className="font-editorial text-xl font-bold text-[#16141F]">
              Autonomous Publishing Calendar
            </h2>
          </div>
          <p className="text-xs text-[#7A7585] mt-0.5">
            Synchronizes automated drop timings with algorithmic peak traffic windows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Account Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]">
            <button
              onClick={() => setFilterAccount('all')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                filterAccount === 'all' ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
              }`}
            >
              All Accounts
            </button>
            {personas.map(p => (
              <button
                key={p.id}
                onClick={() => setFilterAccount(p.id)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  filterAccount === p.id ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
                }`}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Month / Week Switch */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF8F3] border border-[#E5DFD4]">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-xs rounded-lg font-medium cursor-pointer ${
                viewMode === 'month' ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-xs rounded-lg font-medium cursor-pointer ${
                viewMode === 'week' ? 'bg-white shadow-xs font-semibold text-[#16141F]' : 'text-[#7A7585]'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Best Posting Times Tip Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-xl bg-[#FFF9F2] border border-[#FDE5CC] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A65]" />
            <span className="font-semibold text-[#8C4A00]">TikTok (Pip Quackers):</span>
            <span className="text-[#8C5D2B]">Prime Window 18:00 – 20:30 EST</span>
          </div>
          <span className="text-[10px] bg-[#FFE0B2] text-[#8C4A00] px-2 py-0.5 rounded font-bold">
            +38% Algorithm Boost
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F6F6FF] border border-[#DADAFF] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
            <span className="font-semibold text-[#3730A3]">Instagram Reels (Mara Vale):</span>
            <span className="text-[#4338CA]">Prime Window 17:00 – 19:30 EST</span>
          </div>
          <span className="text-[10px] bg-[#E0E7FF] text-[#3730A3] px-2 py-0.5 rounded font-bold">
            +42% Saves Lift
          </span>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="p-6 rounded-[24px] bg-white border border-[#E8E2D8] card-shadow">
        {/* Month Title & Nav */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-editorial text-2xl font-bold text-[#16141F]">
            {monthName}
          </h3>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-xl border border-[#E5DFD4] hover:bg-[#FAF8F3] text-[#7A7585] cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-[#E5DFD4] hover:bg-[#FAF8F3] text-[#7A7585] cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Headers */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#8C8797] pb-3 border-b border-[#EFEBE4]">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Day Cells Grid */}
        <div className="grid grid-cols-7 gap-2 mt-2">
          {/* Empty cells before start of month */}
          {Array.from({ length: startDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-28 rounded-xl bg-[#FAF8F3]/50 border border-transparent" />
          ))}

          {/* Actual days 1 to 31 */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const itemsToday = getItemsForDay(dayNum);
            const isToday = dayNum === 14;

            return (
              <div
                key={dayNum}
                className={`h-28 rounded-xl p-2 flex flex-col justify-between border transition-all ${
                  isToday 
                    ? 'bg-[#FFFDF8] border-[#FF8A65] shadow-xs' 
                    : 'bg-[#FAF8F3] border-[#EAE4D9] hover:border-[#D5CFC3]'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold tabular-nums ${isToday ? 'text-[#E65100] font-bold' : 'text-[#16141F]'}`}>
                    {dayNum}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#FF8A65] text-white">
                      Today
                    </span>
                  )}
                </div>

                {/* Items in this day */}
                <div className="space-y-1 overflow-y-auto max-h-18">
                  {itemsToday.map((item) => {
                    const isPip = item.accountId === 'pip-quackers';
                    const bgColor = isPip ? 'bg-[#FFF2DE] border-[#FED7AA] text-[#9A3412]' : 'bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]';

                    return (
                      <div
                        key={item.id}
                        title={item.title}
                        className={`px-1.5 py-1 rounded-md border text-[10px] font-semibold truncate ${bgColor} flex items-center justify-between cursor-pointer`}
                      >
                        <span className="truncate">{item.title}</span>
                        {item.stage === 'Published' && (
                          <CheckCircle2 className="w-2.5 h-2.5 shrink-0 ml-1 text-emerald-600" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-[9px] text-[#A8A2B2] text-right">
                  {dayNum === 16 ? '18:00 EST' : dayNum === 17 ? '17:30 EST' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
