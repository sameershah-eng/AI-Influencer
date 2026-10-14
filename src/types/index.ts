export type AccountId = string;

export type PipelineStage = 
  | 'Idea'
  | 'Scripted'
  | 'In Production'
  | 'In Review'
  | 'Approved'
  | 'Scheduled'
  | 'Published';

export interface PersonaTraits {
  playfulness: number; // 0 - 100
  polish: number; // 0 - 100
  insiderKnowledge: number; // 0 - 100
  energyLevel: number; // 0 - 100
}

export interface VisualIdentity {
  faceFrontImage?: string;
  faceSideImage?: string;
  fullBodyImage?: string;
  outfitSetImage?: string;
  colorPalette: string[];
  styleKeywords: string[];
  characterPrompt: string;
}

export interface VoiceIdentity {
  description: string;
  pace: string;
  sampleScript: string;
  elevenLabsVoiceId: string;
  lipSyncProvider: string;
}

export interface Persona {
  id: AccountId;
  name: string;
  handle: string;
  avatar: string;
  type: 'Fictional Character' | 'Virtual Human' | 'AI-Assisted Human';
  niche: string;
  tone: string;
  platformFocus: 'TikTok' | 'Instagram Reels';
  backstory: string;
  audience: string;
  traits: PersonaTraits;
  catchphrases: string[];
  topicsToOwn: string[];
  topicsToAvoid: string[];
  postingCadence: string;
  visualIdentity: VisualIdentity;
  voiceIdentity: VoiceIdentity;
  themeColor: {
    primary: string;
    secondary: string;
    accent: string;
    light: string;
  };
}

export interface ScriptItem {
  time: string;
  shot: string;
  dialogue: string;
  onScreenText: string;
}

export interface HookOption {
  type: string;
  spokenText: string;
  visualAction: string;
}

export interface ContentItem {
  id: string;
  accountId: AccountId;
  title: string;
  stage: PipelineStage;
  format: 'talking head' | 'skit' | 'unboxing' | 'POV' | 'slideshow';
  hookOptions: HookOption[];
  selectedHookIndex: number;
  script: ScriptItem[];
  caption: string;
  hashtags: string[];
  soundStyle: string;
  visualPrompt: string;
  thumbnailUrl: string;
  assignedAgent: string;
  targetDurationSeconds: number;
  scheduledDate?: string; // YYYY-MM-DD
  scheduledTime?: string; // e.g. "18:30"
  checklist: {
    imageGenerated: boolean;
    videoGenerated: boolean;
    voiceSynthesized: boolean;
    lipSyncCompleted: boolean;
    finalEditRendered: boolean;
  };
  reviewNotes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  metrics?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    engagementRate: number;
  };
  history: Array<{
    timestamp: string;
    action: string;
    agentOrUser: string;
  }>;
}

export interface KnowledgeEntry {
  id: string;
  accountId: AccountId;
  category: 'Facts' | 'Product Info' | 'Collector Terminology' | 'Brand Rules' | 'Past Winning Post' | 'Strategy';
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

export interface TrendEntry {
  id: string;
  accountId: AccountId;
  topic: string;
  platform: 'TikTok' | 'Instagram Reels';
  momentum: 'rising' | 'peaking' | 'fading';
  momentumScore: number;
  category: string;
  description: string;
  exampleHooks: string[];
  suggestedFormat: 'talking head' | 'skit' | 'unboxing' | 'POV' | 'slideshow';
  recommendedSound: string;
}

export interface AnalyticsDataPoint {
  date: string; // e.g. "Oct 01"
  views: number;
  engagementRate: number; // e.g. 7.2
  followers: number;
}

export interface FormatPerformance {
  format: string;
  postsCount: number;
  avgViews: number;
  avgEngagementRate: number;
}

export interface HookPerformance {
  hookStyle: string;
  avgRetention3s: number;
  sampleCount: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  description: string;
  iconName: string;
  model: string;
  isActive: boolean;
  requiresHumanApproval: boolean;
  lastRunTime: string;
  status: 'idle' | 'running' | 'success' | 'alert';
  latencyMs: number;
}

export interface AgentLog {
  id: string;
  accountId: AccountId;
  agentId: string;
  agentName: string;
  action: string;
  detail: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'in_progress';
}

export interface IntegrationStatus {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'configured' | 'pending';
  tier: string;
  iconName: string;
  description: string;
  endpointUrl?: string;
}
