import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Persona, 
  ContentItem, 
  KnowledgeEntry, 
  TrendEntry, 
  AgentConfig, 
  AgentLog, 
  IntegrationStatus,
  AccountId,
  PipelineStage 
} from '../types';
import { 
  SEED_PERSONAS, 
  SEED_CONTENT, 
  SEED_KNOWLEDGE, 
  SEED_TRENDS, 
  SEED_AGENTS, 
  SEED_AGENT_LOGS, 
  SEED_INTEGRATIONS 
} from '../data/seedData';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  activeAccountId: AccountId;
  setActiveAccountId: (id: AccountId) => void;
  personas: Persona[];
  activePersona: Persona;
  updatePersona: (id: AccountId, updates: Partial<Persona>) => void;
  createPersona: (newPersona: Persona) => void;

  contentItems: ContentItem[];
  activeAccountContent: ContentItem[];
  addContentItem: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => ContentItem;
  updateContentItem: (id: string, updates: Partial<ContentItem>) => void;
  deleteContentItem: (id: string) => void;
  moveContentStage: (id: string, newStage: PipelineStage) => boolean;
  approveContent: (id: string) => void;
  rejectContent: (id: string, reason: string) => void;
  requestChanges: (id: string, notes: string) => void;

  knowledgeBase: KnowledgeEntry[];
  activeAccountKnowledge: KnowledgeEntry[];
  addKnowledgeEntry: (entry: Omit<KnowledgeEntry, 'id' | 'updatedAt'>) => void;
  updateKnowledgeEntry: (id: string, updates: Partial<KnowledgeEntry>) => void;
  deleteKnowledgeEntry: (id: string) => void;

  trends: TrendEntry[];
  activeAccountTrends: TrendEntry[];
  addTrend: (trend: Omit<TrendEntry, 'id'>) => void;
  deleteTrend: (id: string) => void;

  agents: AgentConfig[];
  updateAgent: (id: string, updates: Partial<AgentConfig>) => void;
  agentLogs: AgentLog[];
  addAgentLog: (log: Omit<AgentLog, 'id'>) => void;

  integrations: IntegrationStatus[];
  updateIntegration: (id: string, updates: Partial<IntegrationStatus>) => void;

  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  aiStatus: { hasKey: boolean; model: string };
  resetToSeedData: () => void;
}

const STORAGE_KEYS = {
  ACTIVE_ACCOUNT: 'duckling_active_account',
  PERSONAS: 'duckling_personas_v2',
  CONTENT: 'duckling_content_v2',
  KNOWLEDGE: 'duckling_knowledge_v2',
  TRENDS: 'duckling_trends_v2',
  AGENTS: 'duckling_agents_v2',
  LOGS: 'duckling_logs_v2',
  INTEGRATIONS: 'duckling_integrations_v2',
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage with seed fallbacks
  const [activeAccountId, setActiveAccountIdState] = useState<AccountId>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_ACCOUNT) || 'pip-quackers';
  });

  const [personas, setPersonas] = useState<Persona[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PERSONAS);
    return saved ? JSON.parse(saved) : SEED_PERSONAS;
  });

  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return saved ? JSON.parse(saved) : SEED_CONTENT;
  });

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE);
    return saved ? JSON.parse(saved) : SEED_KNOWLEDGE;
  });

  const [trends, setTrends] = useState<TrendEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRENDS);
    return saved ? JSON.parse(saved) : SEED_TRENDS;
  });

  const [agents, setAgents] = useState<AgentConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AGENTS);
    return saved ? JSON.parse(saved) : SEED_AGENTS;
  });

  const [agentLogs, setAgentLogs] = useState<AgentLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : SEED_AGENT_LOGS;
  });

  const [integrations, setIntegrations] = useState<IntegrationStatus[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
    return saved ? JSON.parse(saved) : SEED_INTEGRATIONS;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [aiStatus, setAiStatus] = useState<{ hasKey: boolean; model: string }>({
    hasKey: true,
    model: 'gemini-3.8-flash'
  });

  // Check AI health on mount
  useEffect(() => {
    fetch('/api/ai/status')
      .then(res => res.json())
      .then(data => {
        setAiStatus({
          hasKey: Boolean(data.hasKey),
          model: data.model || 'gemini-3.8-flash',
        });
      })
      .catch(() => {
        // Dev offline or fallback
      });
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ACCOUNT, activeAccountId);
  }, [activeAccountId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));
  }, [personas]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(contentItems));
  }, [contentItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(knowledgeBase));
  }, [knowledgeBase]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRENDS, JSON.stringify(trends));
  }, [trends]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(agentLogs));
  }, [agentLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTEGRATIONS, JSON.stringify(integrations));
  }, [integrations]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setActiveAccountId = (id: AccountId) => {
    setActiveAccountIdState(id);
    const target = personas.find(p => p.id === id);
    if (target) {
      addToast({
        title: `Switched to ${target.name}`,
        message: `Active niche: ${target.niche}`,
        type: 'info'
      });
    }
  };

  const activePersona = useMemo(() => {
    return personas.find(p => p.id === activeAccountId) || personas[0] || SEED_PERSONAS[0];
  }, [personas, activeAccountId]);

  const activeAccountContent = useMemo(() => {
    return contentItems.filter(item => item.accountId === activeAccountId);
  }, [contentItems, activeAccountId]);

  const activeAccountKnowledge = useMemo(() => {
    return knowledgeBase.filter(kb => kb.accountId === activeAccountId);
  }, [knowledgeBase, activeAccountId]);

  const activeAccountTrends = useMemo(() => {
    return trends.filter(t => t.accountId === activeAccountId);
  }, [trends, activeAccountId]);

  // Persona actions
  const updatePersona = (id: AccountId, updates: Partial<Persona>) => {
    setPersonas(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast({ title: 'Persona updated', message: 'Character bible changes saved successfully', type: 'success' });
  };

  const createPersona = (newPersona: Persona) => {
    setPersonas(prev => [...prev, newPersona]);
    setActiveAccountIdState(newPersona.id);
    addToast({ title: 'New Persona Created', message: `${newPersona.name} is now active`, type: 'success' });
  };

  // Content actions
  const addContentItem = (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => {
    const newItem: ContentItem = {
      ...item,
      id: 'content-' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          action: 'Created in Content Engine',
          agentOrUser: 'Script Writer Agent',
        }
      ]
    };
    setContentItems(prev => [newItem, ...prev]);
    addToast({ title: 'Sent to Pipeline', message: `"${newItem.title}" added to ${newItem.stage}`, type: 'success' });
    return newItem;
  };

  const updateContentItem = (id: string, updates: Partial<ContentItem>) => {
    setContentItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return item;
    }));
  };

  const deleteContentItem = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
    addToast({ title: 'Item Deleted', type: 'info' });
  };

  const moveContentStage = (id: string, newStage: PipelineStage): boolean => {
    const item = contentItems.find(i => i.id === id);
    if (!item) return false;

    // Strict rule: "Nothing can move to Scheduled without approval. Show this rule clearly."
    if (newStage === 'Scheduled' && item.stage !== 'Approved') {
      addToast({
        title: 'Approval Required',
        message: 'Content must be formally approved in the Approval Queue before it can be scheduled.',
        type: 'error'
      });
      return false;
    }

    const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const updatedHistory = [
      ...(item.history || []),
      {
        timestamp,
        action: `Moved stage from ${item.stage} to ${newStage}`,
        agentOrUser: 'Elena Rostova (Lead)'
      }
    ];

    setContentItems(prev => prev.map(i => i.id === id ? {
      ...i,
      stage: newStage,
      updatedAt: new Date().toISOString(),
      history: updatedHistory
    } : i));

    addToast({
      title: `Moved to ${newStage}`,
      message: `"${item.title}" stage updated`,
      type: 'success'
    });
    return true;
  };

  const approveContent = (id: string) => {
    const item = contentItems.find(i => i.id === id);
    if (!item) return;

    const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const updatedHistory = [
      ...(item.history || []),
      {
        timestamp,
        action: 'Formally approved in Approval Queue',
        agentOrUser: 'Elena Rostova (Lead)'
      }
    ];

    setContentItems(prev => prev.map(i => i.id === id ? {
      ...i,
      stage: 'Approved',
      reviewNotes: undefined,
      rejectionReason: undefined,
      updatedAt: new Date().toISOString(),
      history: updatedHistory
    } : i));

    addToast({
      title: 'Post Approved',
      message: `"${item.title}" is now ready for scheduling!`,
      type: 'success'
    });
  };

  const rejectContent = (id: string, reason: string) => {
    const item = contentItems.find(i => i.id === id);
    if (!item) return;

    const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const updatedHistory = [
      ...(item.history || []),
      {
        timestamp,
        action: `Rejected: ${reason}`,
        agentOrUser: 'Elena Rostova (Lead)'
      }
    ];

    setContentItems(prev => prev.map(i => i.id === id ? {
      ...i,
      stage: 'Idea',
      rejectionReason: reason,
      updatedAt: new Date().toISOString(),
      history: updatedHistory
    } : i));

    addToast({
      title: 'Item Rejected',
      message: `Returned to Idea stage with reason: "${reason}"`,
      type: 'warning'
    });
  };

  const requestChanges = (id: string, notes: string) => {
    const item = contentItems.find(i => i.id === id);
    if (!item) return;

    const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const updatedHistory = [
      ...(item.history || []),
      {
        timestamp,
        action: `Changes requested: ${notes}`,
        agentOrUser: 'Elena Rostova (Lead)'
      }
    ];

    setContentItems(prev => prev.map(i => i.id === id ? {
      ...i,
      stage: 'In Production',
      reviewNotes: notes,
      updatedAt: new Date().toISOString(),
      history: updatedHistory
    } : i));

    addToast({
      title: 'Changes Requested',
      message: `Returned to In Production with reviewer notes`,
      type: 'info'
    });
  };

  // Knowledge base actions
  const addKnowledgeEntry = (entry: Omit<KnowledgeEntry, 'id' | 'updatedAt'>) => {
    const newEntry: KnowledgeEntry = {
      ...entry,
      id: 'kb-' + Math.random().toString(36).substring(2, 9),
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setKnowledgeBase(prev => [newEntry, ...prev]);
    addToast({ title: 'Knowledge Entry Saved', message: `"${newEntry.title}" added to persona bible`, type: 'success' });
  };

  const updateKnowledgeEntry = (id: string, updates: Partial<KnowledgeEntry>) => {
    setKnowledgeBase(prev => prev.map(k => k.id === id ? { ...k, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : k));
    addToast({ title: 'Knowledge Entry Updated', type: 'success' });
  };

  const deleteKnowledgeEntry = (id: string) => {
    setKnowledgeBase(prev => prev.filter(k => k.id !== id));
    addToast({ title: 'Entry Deleted', type: 'info' });
  };

  // Trend actions
  const addTrend = (trend: Omit<TrendEntry, 'id'>) => {
    const newTrend: TrendEntry = {
      ...trend,
      id: 'trend-' + Math.random().toString(36).substring(2, 9),
    };
    setTrends(prev => [newTrend, ...prev]);
    addToast({ title: 'New Trend Added', message: newTrend.topic, type: 'success' });
  };

  const deleteTrend = (id: string) => {
    setTrends(prev => prev.filter(t => t.id !== id));
    addToast({ title: 'Trend Removed', type: 'info' });
  };

  // Agent actions
  const updateAgent = (id: string, updates: Partial<AgentConfig>) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    addToast({ title: 'Agent Configuration Saved', type: 'success' });
  };

  const addAgentLog = (log: Omit<AgentLog, 'id'>) => {
    const newLog: AgentLog = {
      ...log,
      id: 'log-' + Math.random().toString(36).substring(2, 9),
    };
    setAgentLogs(prev => [newLog, ...prev]);
  };

  const updateIntegration = (id: string, updates: Partial<IntegrationStatus>) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const resetToSeedData = () => {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ACCOUNT);
    localStorage.removeItem(STORAGE_KEYS.PERSONAS);
    localStorage.removeItem(STORAGE_KEYS.CONTENT);
    localStorage.removeItem(STORAGE_KEYS.KNOWLEDGE);
    localStorage.removeItem(STORAGE_KEYS.TRENDS);
    localStorage.removeItem(STORAGE_KEYS.AGENTS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.INTEGRATIONS);
    setActiveAccountIdState('pip-quackers');
    setPersonas(SEED_PERSONAS);
    setContentItems(SEED_CONTENT);
    setKnowledgeBase(SEED_KNOWLEDGE);
    setTrends(SEED_TRENDS);
    setAgents(SEED_AGENTS);
    setAgentLogs(SEED_AGENT_LOGS);
    setIntegrations(SEED_INTEGRATIONS);
    addToast({ title: 'Demo Data Restored', message: 'Loaded fresh seed personas and content items', type: 'info' });
  };

  return (
    <AppContext.Provider value={{
      activeAccountId,
      setActiveAccountId,
      personas,
      activePersona,
      updatePersona,
      createPersona,
      contentItems,
      activeAccountContent,
      addContentItem,
      updateContentItem,
      deleteContentItem,
      moveContentStage,
      approveContent,
      rejectContent,
      requestChanges,
      knowledgeBase,
      activeAccountKnowledge,
      addKnowledgeEntry,
      updateKnowledgeEntry,
      deleteKnowledgeEntry,
      trends,
      activeAccountTrends,
      addTrend,
      deleteTrend,
      agents,
      updateAgent,
      agentLogs,
      addAgentLog,
      integrations,
      updateIntegration,
      toasts,
      addToast,
      removeToast,
      aiStatus,
      resetToSeedData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
