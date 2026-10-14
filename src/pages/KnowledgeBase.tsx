import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Tag, 
  Trash2, 
  Edit3, 
  Check, 
  Sparkles, 
  X, 
  ShieldCheck,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KnowledgeEntry } from '../types';

export const KnowledgeBase: React.FC = () => {
  const { 
    activePersona, 
    activeAccountKnowledge, 
    addKnowledgeEntry, 
    updateKnowledgeEntry, 
    deleteKnowledgeEntry 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<KnowledgeEntry['category']>('Facts');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const categories = [
    'All',
    'Facts',
    'Product Info',
    'Collector Terminology',
    'Brand Rules',
    'Past Winning Post',
    'Strategy'
  ];

  const filteredKnowledge = activeAccountKnowledge.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const openCreateModal = () => {
    setEditingEntry(null);
    setTitle('');
    setCategory('Facts');
    setContent('');
    setTagsInput('');
    setModalOpen(true);
  };

  const openEditModal = (entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setCategory(entry.category);
    setContent(entry.content);
    setTagsInput(entry.tags.join(', '));
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editingEntry) {
      updateKnowledgeEntry(editingEntry.id, {
        title,
        category,
        content,
        tags,
      });
    } else {
      addKnowledgeEntry({
        accountId: activePersona.id,
        category,
        title,
        content,
        tags,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-7 pb-16 max-w-6xl">
      {/* Informative Header Banner */}
      <div className="p-6 rounded-[22px] bg-white border border-[#E8E2D8] card-shadow flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePersona.themeColor.primary }} />
            <h2 className="font-editorial text-xl font-bold text-[#16141F]">
              {activePersona.name}'s Proprietary Knowledge Base
            </h2>
          </div>
          <p className="text-xs text-[#6E687A] max-w-2xl leading-relaxed">
            Lore, factory specifications, terminology, and learned strategies for {activePersona.name}. 
            <strong className="text-[#16141F] font-semibold ml-1">
              Every entry here is automatically injected into Gemini prompt context
            </strong> when drafting scripts and captions.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Knowledge Entry</span>
        </button>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#16141F] text-white shadow-xs'
                    : 'bg-white border border-[#E8E2D8] text-[#5C5666] hover:bg-[#FAF8F3] hover:text-[#16141F]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8C8797] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lore, tags, rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#E8E2D8] focus:outline-none focus:border-[#FF8A65]"
          />
        </div>
      </div>

      {/* Knowledge Cards Grid */}
      {filteredKnowledge.length === 0 ? (
        <div className="p-12 text-center rounded-[22px] bg-white border border-[#E8E2D8] card-shadow space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF6EE] text-[#E65100] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-lg font-semibold text-[#16141F]">
            No Knowledge Entries Found
          </h3>
          <p className="text-xs text-[#7A7585] max-w-sm mx-auto">
            No lore or brand rules match your active filters. Add a new entry to guide your influencer's automated thinking.
          </p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-[#F5F2EB] text-xs font-semibold text-[#16141F] hover:bg-[#EBE5DB] transition-all cursor-pointer"
          >
            Create First Entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredKnowledge.map((entry) => {
            const categoryBadgeColors: Record<string, string> = {
              'Facts': 'bg-blue-50 text-blue-700 border-blue-200',
              'Product Info': 'bg-amber-50 text-amber-800 border-amber-200',
              'Collector Terminology': 'bg-purple-50 text-purple-700 border-purple-200',
              'Brand Rules': 'bg-rose-50 text-rose-700 border-rose-200',
              'Past Winning Post': 'bg-emerald-50 text-emerald-700 border-emerald-200',
              'Strategy': 'bg-orange-50 text-orange-800 border-orange-200',
            };

            return (
              <div
                key={entry.id}
                className="p-5 rounded-[20px] bg-white border border-[#E8E2D8] card-shadow card-shadow-hover flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                      categoryBadgeColors[entry.category] || 'bg-gray-50 text-gray-700'
                    }`}>
                      {entry.category}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(entry)}
                        className="p-1 rounded-md hover:bg-[#F2EDE4] text-[#7A7585] hover:text-[#16141F] cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteKnowledgeEntry(entry.id)}
                        className="p-1 rounded-md hover:bg-rose-50 text-[#7A7585] hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-editorial text-base font-semibold text-[#16141F] mb-1.5 leading-snug">
                    {entry.title}
                  </h3>

                  <p className="text-xs text-[#5C5666] leading-relaxed line-clamp-4">
                    {entry.content}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#F2ECE1] flex items-center justify-between text-[10px] text-[#8C8797]">
                  <div className="flex items-center gap-1 overflow-hidden">
                    <Tag className="w-3 h-3 shrink-0" />
                    <span className="truncate">{entry.tags.join(', ')}</span>
                  </div>
                  <span className="shrink-0">{entry.updatedAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white rounded-[24px] border border-[#E5DFD4] card-shadow-elevated p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#EFEBE4]">
                <h3 className="font-editorial text-lg font-bold text-[#16141F]">
                  {editingEntry ? 'Edit Knowledge Entry' : 'New Knowledge Base Entry'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-[#8C8797] hover:text-[#16141F] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                    Entry Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ultrasonic Squeak Acoustic Standards"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                  >
                    <option value="Facts">Facts</option>
                    <option value="Product Info">Product Info</option>
                    <option value="Collector Terminology">Collector Terminology</option>
                    <option value="Brand Rules">Brand Rules</option>
                    <option value="Past Winning Post">Past Winning Post</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                    Content & Injected Lore
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide specific factual guidelines, measurements, history, or script constraints..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65] resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#4A4553] block mb-1">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Acoustics, Series 3, Packaging"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F3] border border-[#E5DFD4] focus:outline-none focus:border-[#FF8A65]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EFEBE4]">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#6E687A] hover:bg-[#F5F2EB] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={!title.trim() || !content.trim()}
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl brand-gradient text-white text-xs font-semibold shadow-sm hover:brightness-105 disabled:opacity-50 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingEntry ? 'Update Entry' : 'Save to Lore Vault'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
