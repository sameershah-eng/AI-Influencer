/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider } from './context/AppContext';
import { Sidebar, PageId } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { CreatePersonaModal } from './components/CreatePersonaModal';

// Pages
import { CommandCenter } from './pages/CommandCenter';
import { PersonaStudio } from './pages/PersonaStudio';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { TrendRadar } from './pages/TrendRadar';
import { ContentEngine } from './pages/ContentEngine';
import { ProductionPipeline } from './pages/ProductionPipeline';
import { ApprovalQueue } from './pages/ApprovalQueue';
import { ContentCalendar } from './pages/ContentCalendar';
import { AnalyticsLoop } from './pages/AnalyticsLoop';
import { AgentsAutomation } from './pages/AgentsAutomation';
import { StackSettings } from './pages/StackSettings';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('command-center');
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [prefilledTrendTopic, setPrefilledTrendTopic] = useState('');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'command-center':
        return (
          <CommandCenter 
            onNavigate={setCurrentPage} 
            onOpenCreateAccount={() => setCreateAccountOpen(true)} 
          />
        );
      case 'persona-studio':
        return <PersonaStudio />;
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'trend-radar':
        return (
          <TrendRadar 
            onNavigate={setCurrentPage} 
            onSelectTrendForContent={(trend) => {
              setPrefilledTrendTopic(trend.topic);
              setCurrentPage('content-engine');
            }} 
          />
        );
      case 'content-engine':
        return (
          <ContentEngine 
            onNavigate={setCurrentPage} 
            prefilledTopic={prefilledTrendTopic} 
          />
        );
      case 'production-pipeline':
        return <ProductionPipeline onNavigate={setCurrentPage} />;
      case 'approval-queue':
        return <ApprovalQueue onNavigate={setCurrentPage} />;
      case 'content-calendar':
        return <ContentCalendar />;
      case 'analytics-loop':
        return <AnalyticsLoop />;
      case 'agents-automation':
        return <AgentsAutomation />;
      case 'stack-settings':
        return (
          <StackSettings 
            onOpenCreateAccount={() => setCreateAccountOpen(true)} 
          />
        );
      default:
        return <CommandCenter onNavigate={setCurrentPage} onOpenCreateAccount={() => setCreateAccountOpen(true)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FBF8F3] text-[#16141F]">
      {/* Fixed Left Navigation Bar */}
      <Sidebar 
        currentPage={currentPage} 
        onSelectPage={setCurrentPage} 
        onOpenCreateAccount={() => setCreateAccountOpen(true)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
        />

        <main className="flex-1 px-8 py-7 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              {renderCurrentPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <CreatePersonaModal 
        isOpen={createAccountOpen} 
        onClose={() => setCreateAccountOpen(false)} 
      />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
