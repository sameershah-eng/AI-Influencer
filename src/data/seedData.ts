import { 
  Persona, 
  ContentItem, 
  KnowledgeEntry, 
  TrendEntry, 
  AnalyticsDataPoint, 
  FormatPerformance, 
  HookPerformance, 
  AgentConfig, 
  AgentLog,
  IntegrationStatus 
} from '../types';

export const SEED_PERSONAS: Persona[] = [
  {
    id: 'pip-quackers',
    name: 'Pip Quackers',
    handle: '@pipquacks',
    avatar: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=400&q=80',
    type: 'Fictional Character',
    niche: 'Rubber Duck Collecting, Micro-Drops & Urban Duck Hunts',
    tone: 'Playful, curious, a little chaotic, fiercely loyal to fellow duck collectors',
    platformFocus: 'TikTok',
    backstory: 'Forged in a bespoke boutique bathhouse mold in Kyoto, Pip escaped the bathtub to document the underground international world of rare collectible rubber ducks. Known for spontaneous geo-cached duck hunts in subway stations and analyzing vintage squeak frequencies.',
    audience: 'Gen Z collectors, kinetic toy enthusiasts, meme curators, and streetwear drop chasers aged 16–28.',
    traits: {
      playfulness: 96,
      polish: 48,
      insiderKnowledge: 88,
      energyLevel: 94,
    },
    catchphrases: [
      'Un-duck-lievable!',
      'Check the belly stamp or you got got.',
      'Squeak frequency tested. Certified authentic.',
      'To the wild pond we go!'
    ],
    topicsToOwn: [
      'Glow-in-the-dark vintage bath duck appraisal',
      'Wild geocache duck drops in major cities',
      'Oddity duck molds from 1970–1999',
      'Squeak pitch testing with studio microphones',
      'Custom vinyl dipped rubber ducks'
    ],
    topicsToAvoid: [
      'Boring standard commercial yellow ducks without backstory',
      'Corporate bathtub sales promotions',
      'Toxic plastic manufacturing (strictly celebrate eco-rubber/silicone)'
    ],
    postingCadence: '5x weekly TikTok shorts + 1 Saturday geocached wild duck hunt',
    visualIdentity: {
      faceFrontImage: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=400&q=80',
      faceSideImage: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&w=400&q=80',
      fullBodyImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80',
      outfitSetImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
      colorPalette: ['#FFC83D', '#FF8A65', '#264653', '#2A9D8F'],
      styleKeywords: ['Satin finish matte rubber', 'Subtle micro-droplets of water', 'Miniature woven varsity jacket', 'Macro 35mm shallow focus'],
      characterPrompt: 'Pip Quackers, a high-stylized 3D designer collectible rubber duck with signature oversized inquisitive dark eyes, vibrant warm dandelion-yellow satin silicone skin, tiny embroidered streetwear beanie, subtle studio water splash accents, ultra-detailed macro photography, 8k render with soft warm studio rim light.'
    },
    voiceIdentity: {
      description: 'Bright, bouncy, youthful tenor with swift rhythmic patter and cheerful duck-chirp punctuation.',
      pace: 'Brisk & energetic (148 wpm)',
      sampleScript: 'Yo duck gang! If you think this 1983 Tokyo neon duck has a standard squeaker valve, plug your headphones in right now. Listen to this acoustic register.',
      elevenLabsVoiceId: 'pNInz6obpgDQGcFmaJgB', // Adam / playful profile
      lipSyncProvider: 'Hedra Character-2 Engine (Fast Synch)'
    },
    themeColor: {
      primary: '#FFC83D',
      secondary: '#FF8A65',
      accent: '#F2668B',
      light: '#FFF9EB',
    }
  },
  {
    id: 'mara-vale',
    name: 'Mara Vale',
    handle: '@maravale.studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    type: 'Virtual Human',
    niche: 'Designer Vinyl Toys, Micro-Run Cast Resin, Blind Box Unboxings',
    tone: 'Calm, architectural, tasteful, uncompromising insider eye',
    platformFocus: 'Instagram Reels',
    backstory: 'Former virtual industrial design apprentice turned independent toy curator. Mara operates from an open-concept concrete studio gallery in Berlin, reviewing museum-grade art toys, tracking Japanese vinyl drops (Sofubi), and dissecting limited-edition color separations.',
    audience: 'Discerning vinyl collectors, industrial designers, gallery goers, and premium toy investors aged 22–40.',
    traits: {
      playfulness: 42,
      polish: 95,
      insiderKnowledge: 97,
      energyLevel: 62,
    },
    catchphrases: [
      'The mold parting line never lies.',
      'Notice the gradient depth on the secondary pour.',
      'From archive to shelf.',
      'Subtle mastery in 8 inches.'
    ],
    topicsToOwn: [
      'Japanese vintage Sofubi slush-molding techniques',
      'Art toy provenance and authentication stamps',
      'Artist collaborations (Kaws, Coarse, Fools Paradise, Medicom)',
      'Display shelving architecture & UV glass preservation'
    ],
    topicsToAvoid: [
      'Hype-beast screaming or manufactured urgency',
      'Cheap flea-market knockoffs',
      'Destructive drop tests'
    ],
    postingCadence: '4x weekly Instagram Reels + 1 Sunday deep dive carousel',
    visualIdentity: {
      faceFrontImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      faceSideImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      fullBodyImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      outfitSetImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
      colorPalette: ['#4A5568', '#A0AEC0', '#ED8936', '#E2E8F0'],
      styleKeywords: ['Architectural studio backdrop', 'Minimalist black linen smock', 'Soft brutalist concrete', 'Clean diffused 5000K daylight'],
      characterPrompt: 'Mara Vale, virtual human curator with sharp sleek bob haircut, minimalist charcoal linen attire, micro-expression of thoughtful curiosity, handling high-end designer vinyl sculptures with white cotton conservator gloves, shot on Hasselblad medium format portrait, clean soft daylight from floor-to-ceiling loft window.'
    },
    voiceIdentity: {
      description: 'Sophisticated, velvety mezzo-soprano with measured pacing, European cadence, and quiet authority.',
      pace: 'Deliberate & intimate (112 wpm)',
      sampleScript: 'Before you cut the vacuum seal on this 1-of-50 resin sculpt, observe how the artisan treated the negative space under the arm. That is where authentic craft reveals itself.',
      elevenLabsVoiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella / soft luxury
      lipSyncProvider: 'HeyGen Avatar 3.0 Ultra-Res'
    },
    themeColor: {
      primary: '#6366F1',
      secondary: '#818CF8',
      accent: '#F472B6',
      light: '#F5F5FF',
    }
  }
];

export const SEED_CONTENT: ContentItem[] = [
  // --- PIP QUACKERS ITEMS (12 items across 7 stages) ---
  {
    id: 'pip-1',
    accountId: 'pip-quackers',
    title: 'The Secret Bathroom Safe in Osaka Toy Market',
    stage: 'Published',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      {
        type: 'Curiosity Gap',
        spokenText: 'I crawled behind a claw machine in Osaka and found this locked safe full of ducks.',
        visualAction: 'Extreme macro shot of flashlight illuminating rusty safe handle.'
      },
      {
        type: 'Contrarian',
        spokenText: 'Everyone goes to Akihabara. Real duck hunters go to this basement alley.',
        visualAction: 'Fast handheld camera panning down rainy alley stairs.'
      },
      {
        type: 'Cliffhanger',
        spokenText: 'If this duck has the 1991 stamped plug, it is worth more than my rent.',
        visualAction: 'Pip spinning golden vinyl duck towards camera.'
      }
    ],
    script: [
      { time: '0:00 - 0:03', shot: 'Pip peering around a claw machine with headlamp on', dialogue: 'I crawled behind a claw machine in Osaka and found this locked safe full of ducks.', onScreenText: 'SECRET TOY SAFE?!' },
      { time: '0:03 - 0:11', shot: 'Close up of Pip unboxing sealed retro plastic blister pack', dialogue: 'Look at the UV reactive wing tips. They only used this pigment in Kansai factories between 1989 and 1993.', onScreenText: 'GLOWING KANSAI PIGMENT' },
      { time: '0:11 - 0:21', shot: 'Pip turning duck upside down and inspecting serial seal under blacklight', dialogue: 'Check the belly stamp. Batch code 04-B! That means the squeaker has the double-chamber harmonica reed.', onScreenText: 'DOUBLE HARMONICA REED' },
      { time: '0:21 - 0:27', shot: 'Pip testing squeak, hilarious surprised eye reaction', dialogue: 'Certified grail! Where should we hide the next geo-cache? Drop your city below!', onScreenText: 'DROP YOUR CITY 👇' }
    ],
    caption: 'Found the holy grail of Osaka bathhouse vinyl! 🦆🎌 The 1991 Kansai UV duck is real and the double squeaker reed sounds like a choir of angels.\n\nShould our next wild drop be in London, Tokyo, or New York? Comment below!',
    hashtags: ['#DuckCollector', '#PipQuackers', '#ToyHunt', '#OsakaBasement', '#RareFinds', '#GrailDrop'],
    soundStyle: 'Hyperpop 808 with vinyl crackle and squeak audio stems',
    visualPrompt: 'Pip Quackers in Osaka night market illuminated by neon signage, holding a glowing yellow collectible duck, cinematic rain reflections on wet asphalt, 9:16 vertical TikTok frame.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 27,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    createdAt: '2026-09-28T14:20:00Z',
    updatedAt: '2026-10-02T10:15:00Z',
    metrics: { views: 482000, likes: 62400, comments: 2890, shares: 14200, engagementRate: 8.6 },
    history: [
      { timestamp: '2026-09-28 14:20', action: 'Created via Trend Scout', agentOrUser: 'Trend Scout Agent' },
      { timestamp: '2026-09-28 14:45', action: 'Script generated', agentOrUser: 'Script Writer Agent' },
      { timestamp: '2026-09-29 11:10', action: 'Approved by Creative Director', agentOrUser: 'Elena Rostova (Lead)' },
      { timestamp: '2026-10-02 09:00', action: 'Auto-published to TikTok', agentOrUser: 'Publisher Agent' }
    ]
  },
  {
    id: 'pip-2',
    accountId: 'pip-quackers',
    title: 'The $1,200 Gold Leaf Rubber Duck Blind Test',
    stage: 'Published',
    format: 'skit',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Hot Take', spokenText: 'Can a $2 dollar store duck beat a $1,200 24-karat art toy in a water race?', visualAction: 'Pip holding both ducks over a marble tub' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Split screen: Budget duck vs 24k gold leaf collector piece', dialogue: 'Can a two dollar budget duck beat a twelve hundred dollar art piece in the whirlpool cup?', onScreenText: '$2 vs $1,200' },
      { time: '0:04 - 0:15', shot: 'Water jets turn on, high speed slow-mo physics', dialogue: 'The gold duck has center weighted hydro-ballast. But look at the budget duck drafting like a stock car!', onScreenText: 'AERODYNAMIC DRAFTING' },
      { time: '0:15 - 0:25', shot: 'Budget duck crosses finish ribbon first, Pip celebratory beak shake', dialogue: 'Physics does not care about your bank account! Squeak gang takes the podium!', onScreenText: 'BUDGET DUCK WINS!' }
    ],
    caption: 'Never underestimate the hydrodynamics of a $2 classic 🦆💨 The $1,200 gold leaf sculpture capsized at turn 3! Which one are you keeping on your desk?',
    hashtags: ['#DuckRace', '#ArtToyVsCheapToy', '#PipQuackers', '#ViralTikTok'],
    soundStyle: 'Formula 1 engine revs fading into cartoon brass fanfare',
    visualPrompt: 'Pip Quackers acting as race commentator with tiny checkered flag next to bubbling marble bath runway, 9:16 cinematic video.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 25,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    createdAt: '2026-10-03T11:00:00Z',
    updatedAt: '2026-10-05T16:00:00Z',
    metrics: { views: 720000, likes: 98400, comments: 4120, shares: 21800, engagementRate: 9.2 },
    history: [
      { timestamp: '2026-10-03 11:00', action: 'Idea spun from community comment', agentOrUser: 'Community Agent' },
      { timestamp: '2026-10-04 09:30', action: 'Approved and scheduled', agentOrUser: 'Marcus Chen' },
      { timestamp: '2026-10-05 16:00', action: 'Published to TikTok', agentOrUser: 'Publisher Agent' }
    ]
  },
  {
    id: 'pip-3',
    accountId: 'pip-quackers',
    title: 'Hiding a 1-of-1 Cyberpunk Duck in Central Park Fountain',
    stage: 'Scheduled',
    format: 'POV',
    scheduledDate: '2026-10-16',
    scheduledTime: '18:00',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Urgency', spokenText: 'If you live in NYC, drop everything and run to Bethesda Fountain right now.', visualAction: 'Pip stealthily tucking a magnetic neon duck under a stone arch.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'POV walking under Bethesda terrace with neon duck in paw', dialogue: 'If you live in NYC, drop everything and run to Bethesda Fountain right now.', onScreenText: 'NYC HUNT IS LIVE 🚨' },
      { time: '0:04 - 0:14', shot: 'Close up of magnetic base snapping to decorative iron grate', dialogue: 'Tucked behind the south iron scrollwork. First one to find it gets the certificate of authenticity and the golden squeaker key.', onScreenText: 'MAGNETIC SECRET STASH' },
      { time: '0:14 - 0:22', shot: 'Pip saluting camera and running into the twilight mist', dialogue: 'Clues are pinned in the comments. May the fastest duck hunter win!', onScreenText: 'CHECK PINNED COMMENT' }
    ],
    caption: 'NYC DUCK HUNT DROP #14! 🗽🦆 Left our custom neon matte prototype hidden at Bethesda Terrace. First collector to find it keeps it! Tag someone sprint distance away.',
    hashtags: ['#DuckHuntNYC', '#GeocacheHunt', '#PipQuackers', '#HiddenTreasure'],
    soundStyle: 'Suspenseful mission impossible synth pluck with ticking clock',
    visualPrompt: 'First person POV perspective in Central Park Bethesda Fountain at golden dusk, showing neon yellow collectible duck with magnetic base being hidden, high resolution 9:16.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 22,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    createdAt: '2026-10-10T09:12:00Z',
    updatedAt: '2026-10-12T15:40:00Z',
    history: [
      { timestamp: '2026-10-10 09:12', action: 'Created from Trend Radar topic', agentOrUser: 'Trend Scout Agent' },
      { timestamp: '2026-10-11 14:00', action: 'Approved by Creative Director', agentOrUser: 'Elena Rostova (Lead)' },
      { timestamp: '2026-10-12 15:40', action: 'Scheduled for Friday 18:00', agentOrUser: 'Publisher Agent' }
    ]
  },
  {
    id: 'pip-4',
    accountId: 'pip-quackers',
    title: 'The Ultrasonic Squeaker Frequency Test (Does it summon real ducks?)',
    stage: 'Approved',
    format: 'skit',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Curiosity', spokenText: 'We installed an ultrasonic 28kHz whistle inside this duck. Let’s see what happens at the lake.', visualAction: 'Pip standing at lakeside with audio spectrometer meter.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Pip with lab goggles and microphone by misty park lake', dialogue: 'We installed an ultrasonic twenty-eight kilohertz whistle inside this duck. Watch the water.', onScreenText: 'ULTRASONIC DUCK EXPERIMENT' },
      { time: '0:04 - 0:15', shot: 'Pip presses duck, spectrogram spikes, cut to 5 wild ducks turning heads in sync', dialogue: 'One squeak... and forty mallards just turned around in unison like they received a galactic transmission.', onScreenText: 'THEY HEARD IT 📡' },
      { time: '0:15 - 0:24', shot: 'Pip surrounded peacefully by wild ducks, handing out duck-safe oat flakes', dialogue: 'They accept me as their silicone king. What frequency should we test next?', onScreenText: 'I AM THEIR KING NOW' }
    ],
    caption: 'Science went too far... or did it just go far enough? 🦆🔬 The ultrasonic duck prototype worked a little TOO well at Echo Lake today. What crazy modification should we engineer next?',
    hashtags: ['#DuckScience', '#PipQuackers', '#WildDucks', '#AudioExperiment'],
    soundStyle: 'Comedic electronic sweep and crisp water ambience',
    visualPrompt: 'Pip Quackers in miniature lab coat standing on wooden dock with gentle wild mallards swimming around respectfully, warm morning mist, 9:16 vertical render.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Voice and Lip Sync Agent',
    targetDurationSeconds: 24,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: false },
    createdAt: '2026-10-11T13:00:00Z',
    updatedAt: '2026-10-13T08:30:00Z',
    history: [
      { timestamp: '2026-10-11 13:00', action: 'Drafted in Content Engine', agentOrUser: 'Script Writer Agent' },
      { timestamp: '2026-10-13 08:30', action: 'Approved by human reviewer', agentOrUser: 'Elena Rostova (Lead)' }
    ]
  },
  {
    id: 'pip-5',
    accountId: 'pip-quackers',
    title: 'Why Real Collectors Weigh Their Blind Boxes Before Buying',
    stage: 'In Review',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Insider Hack', spokenText: 'Stop shaking the box like an amateur. Here is how you weigh for the chase variant.', visualAction: 'Pip producing miniature micro-gram jewelry scale from hoodie pocket.' }
    ],
    script: [
      { time: '0:00 - 0:03', shot: 'Pip whipping out pocket scale in front of retail toy shelf', dialogue: 'Stop shaking the box like an amateur. Here is how you weigh for the chase variant.', onScreenText: 'STOP SHAKING THE BOX ❌' },
      { time: '0:03 - 0:12', shot: 'Macro display showing 38.4g vs 44.1g on digital scale screen', dialogue: 'Common ducks weigh thirty-eight grams. But the secret chrome duck has solid weighted lead-free zinc in the keelson: forty-four point one.', onScreenText: '44.1g = CHASE GOLD' },
      { time: '0:12 - 0:21', shot: 'Pip opening foil pouch, gleaming chrome finish emerges', dialogue: 'BOOM! Holy grail in one try. No duplicates. Save this video before the toy stores ban scales!', onScreenText: 'SAVE THIS HACK 💾' }
    ],
    caption: 'The weight trick works 100% of the time! ⚖️🦆 44.1 grams is the magic number for Series 3. Have you ever brought a scale into a toy store or are you normal?',
    hashtags: ['#BlindBoxHack', '#ToyCollectorHacks', '#PipQuackers', '#ScaleTrick'],
    soundStyle: 'Crisp digital scale beeps over snappy lo-fi beat',
    visualPrompt: 'Pip Quackers in cozy anime toy shop aisle holding digital pocket scale showing 44.1 grams in glowing green LCD, cinematic lighting, 9:16.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 21,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    reviewNotes: 'Lip sync timing on second 14 needs a +80ms offset adjustment to match the emphatic "BOOM!" audio peak.',
    createdAt: '2026-10-12T16:00:00Z',
    updatedAt: '2026-10-13T19:20:00Z',
    history: [
      { timestamp: '2026-10-12 16:00', action: 'Video rendered', agentOrUser: 'Visual Director Agent' },
      { timestamp: '2026-10-13 19:20', action: 'Moved to In Review', agentOrUser: 'System Workflow' }
    ]
  },
  {
    id: 'pip-6',
    accountId: 'pip-quackers',
    title: 'Custom Hydro-Dipping a Giant 12-inch Duck in Neon Camo',
    stage: 'In Review',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Visual ASMR', spokenText: 'Watch this giant blank duck submerge into oil-slick hydro-paint.', visualAction: 'Slow motion surface immersion of matte duck into swirled neon film.' }
    ],
    script: [
      { time: '0:00 - 0:03', shot: 'Macro swirl of neon pink and acid yellow film floating on warm water', dialogue: 'Watch this giant blank duck submerge into oil-slick hydro-paint.', onScreenText: 'HYDRO-DIP ASMR' },
      { time: '0:03 - 0:14', shot: 'Steady downward plunge, graphics wrapping around contours in real-time', dialogue: 'The surface tension is insane. Look how the camo pattern wraps under the bill with zero air bubbles.', onScreenText: 'ZERO BUBBLES' },
      { time: '0:14 - 0:23', shot: 'Duck emerges dripping with pristine glossy marbling, Pip cheering', dialogue: 'Ten out of ten pull. If this gets fifty thousand likes, I’m hydro-dipping my entire desk.', onScreenText: 'LIKE FOR PART 2' }
    ],
    caption: 'Satisfying hydro-dip ASMR on our 12-inch prototype duck! 🎨💦 That surface tension wrap was perfection. What colorway should we dip next?',
    hashtags: ['#HydroDip', '#ASMRToys', '#CustomVinyl', '#PipQuackers'],
    soundStyle: 'Soothing water splash ASMR with ASMR whispers',
    visualPrompt: 'Slow motion hydro-dipping tank in creative design studio, neon iridescent marbling on yellow rubber duck, extreme macro 4k.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 23,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: false, finalEditRendered: false },
    reviewNotes: 'Flagged for audio balance: hydro-dip water splashes are peaking at +2dB over voice track.',
    createdAt: '2026-10-13T10:00:00Z',
    updatedAt: '2026-10-14T02:10:00Z',
    history: [
      { timestamp: '2026-10-13 10:00', action: 'Synthesized audio', agentOrUser: 'Voice and Lip Sync Agent' },
      { timestamp: '2026-10-14 02:10', action: 'Submitted for editorial sign-off', agentOrUser: 'Performance Analyst' }
    ]
  },
  {
    id: 'pip-7',
    accountId: 'pip-quackers',
    title: 'The Squeaker Replacement Hack for Vintage Dead Ducks',
    stage: 'In Production',
    format: 'talking head',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Problem Solver', spokenText: 'Don’t throw away that mute 1980s duck. Here is the 30-second heart surgery.', visualAction: 'Pip holding brass extraction tweezers next to silent duck.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Pip pressing old squeak valve that makes sad air puff sound', dialogue: 'Don’t throw away that mute 1980s duck. Here is the 30-second heart surgery.', onScreenText: 'MUTE DUCK SURGERY 🩺' },
      { time: '0:04 - 0:14', shot: 'Gentle warm water dip and tweezers extraction of hardened valve', dialogue: 'Dip the tail in fifty-degree warm water to loosen the seal, pop out the cracked reed, and slot in our brass replacement valve.', onScreenText: 'WARM WATER DIP' },
      { time: '0:14 - 0:24', shot: 'Pip presses duck, glorious loud squeak echoes, Pip winks at camera', dialogue: 'Listen to that lung capacity! She has another forty years of life left.', onScreenText: 'BACK TO LIFE 🔊' }
    ],
    caption: 'How to bring a 40-year-old silent duck back to life! 🦆🫀 Don’t toss vintage collectibles when a $0.50 replacement reed restores the squeak.',
    hashtags: ['#ToyRestoration', '#VintageToys', '#DuckLovers', '#PipQuackers'],
    soundStyle: 'Playful upbeat jazz bassline with funny sound effects',
    visualPrompt: 'Pip Quackers in vintage workshop setting with brass restoration tools and antique rubber ducks on wooden workbench, 9:16 vertical.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 24,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-13T14:15:00Z',
    updatedAt: '2026-10-14T04:00:00Z',
    history: [
      { timestamp: '2026-10-13 14:15', action: 'Visual director rendered storyboard', agentOrUser: 'Visual Director Agent' }
    ]
  },
  {
    id: 'pip-8',
    accountId: 'pip-quackers',
    title: 'Ranking Every Rubber Duck in the British Museum Gift Shop',
    stage: 'In Production',
    format: 'slideshow',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Tier List', spokenText: 'I bought all 14 historical ducks from the British Museum. Let’s tier rank them.', visualAction: 'Pip wearing tiny gladiator helmet sorting ducks into S, A, B, F tier.' }
    ],
    script: [
      { time: '0:00 - 0:03', shot: 'Pip sorting Roman, Viking, and Egyptian ducks onto neon tier board', dialogue: 'I bought all fourteen historical ducks from the British Museum. Let’s rank them.', onScreenText: 'HISTORICAL TIER RANK 🏛️' },
      { time: '0:03 - 0:12', shot: 'Highlighting Rosetta Stone duck with micro-hieroglyphs', dialogue: 'The Rosetta Stone duck has actual readable demotic script engraved on the back. Instant S-Tier.', onScreenText: 'S-TIER: ROSETTA DUCK' },
      { time: '0:12 - 0:22', shot: 'Holding up flimsy Viking duck that wobbles sideways', dialogue: 'Meanwhile the Viking duck capsizes in two seconds. Total F-tier seaworthiness.', onScreenText: 'F-TIER: CAPSIZED VIKING' }
    ],
    caption: 'Official historical rubber duck tier list! 🏛️🦆 Rosetta Stone duck is undeniably S-tier craft, but that Viking mold needs serious hydrodynamic work. Who do you rank highest?',
    hashtags: ['#TierList', '#MuseumDucks', '#PipQuackers', '#ToyReview'],
    soundStyle: 'Regal classical harpsichord remixed with modern trap drums',
    visualPrompt: 'Pip Quackers in British Museum gallery setting holding historical costumed rubber ducklings, museum spotlights, 9:16 format.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 22,
    checklist: { imageGenerated: true, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-13T17:00:00Z',
    updatedAt: '2026-10-14T05:30:00Z',
    history: [
      { timestamp: '2026-10-13 17:00', action: 'Script approved for production', agentOrUser: 'Elena Rostova (Lead)' }
    ]
  },
  {
    id: 'pip-9',
    accountId: 'pip-quackers',
    title: 'Can You Spot the Fake $300 Supreme Duck?',
    stage: 'Scripted',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Counterfeit Warning', spokenText: 'One of these is a $300 authentic Supreme duck. One is a $6 bootleg from Wish.', visualAction: 'Pip holding two seemingly identical red box-logo ducks side-by-side.' }
    ],
    script: [
      { time: '0:00 - 0:03', shot: 'Two red ducks rotating on white turntable', dialogue: 'One of these is a three hundred dollar authentic Supreme duck. One is a six dollar bootleg.', onScreenText: 'REAL VS FAKE 🔍' },
      { time: '0:03 - 0:13', shot: 'Macro zoom on font kerning of Supreme box logo', dialogue: 'Look at the slant of the letter P. The authentic mold uses sixteen-degree italics with rounded bevel edges.', onScreenText: 'CHECK THE "P" KERNING' },
      { time: '0:13 - 0:21', shot: 'UV light test on underbelly authenticity stamp', dialogue: 'The real one has invisible watermarked barcode under 365nm UV. Did you guess right?', onScreenText: 'UV BARCODE TEST' }
    ],
    caption: 'Real vs Fake Supreme Duck! 🔴🦆 Would you have spotted the font kerning tell on the bill? Beware of cheap fakes floating around resale platforms!',
    hashtags: ['#RealVsFake', '#SupremeDrop', '#StreetwearToys', '#PipQuackers'],
    soundStyle: 'Boom-bap NYC hip hop beat with scratching samples',
    visualPrompt: 'Pip Quackers comparing two red box-logo collectible ducks on illuminated studio inspection table with forensic magnifier, 9:16 portrait.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 21,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-13T22:00:00Z',
    updatedAt: '2026-10-14T06:10:00Z',
    history: [
      { timestamp: '2026-10-13 22:00', action: 'Drafted from Trend Scout alert', agentOrUser: 'Trend Scout Agent' }
    ]
  },
  {
    id: 'pip-10',
    accountId: 'pip-quackers',
    title: 'The Cold Weather Duck Float Test (Do they shrink in winter?)',
    stage: 'Scripted',
    format: 'skit',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Myth Buster', spokenText: 'Does freezing weather shrink your rubber ducks? We tested five different silicone polymers.', visualAction: 'Pip opening liquid nitrogen freezer with frosty sunglasses.' }
    ],
    script: [
      { time: '0:00 - 0:03', shot: 'Pip taking frozen duck out of sub-zero ice bath', dialogue: 'Does freezing weather shrink your rubber ducks? We tested five silicone polymers.', onScreenText: 'SUB-ZERO DUCK TEST ❄️' },
      { time: '0:03 - 0:12', shot: 'Precision caliper measuring beak before and after 0°C exposure', dialogue: 'Natural rubber maintains its elasticity, but cheap PVC drops one point eight millimeters in diameter, altering the buoyancy center.', onScreenText: '-1.8mm SHRINKAGE' },
      { time: '0:12 - 0:20', shot: 'Duck floating sideways in ice water, Pip shaking head', dialogue: 'Store your collectibles at room temperature or say goodbye to perfect float stability.', onScreenText: 'ROOM TEMP ONLY' }
    ],
    caption: 'Do rubber ducks shrink in the winter cold? ❄️🦆 We put them in an ice test and the results surprised us. Keep your vinyl warm!',
    hashtags: ['#MythBusters', '#ScienceExperiment', '#PipQuackers', '#ToyCare'],
    soundStyle: 'Crisp synth pads with icy crackle sound effects',
    visualPrompt: 'Pip Quackers in winter puffer jacket holding frosty frozen yellow duck with steam rising, icy backdrop, 9:16 vertical.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 20,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-14T01:00:00Z',
    updatedAt: '2026-10-14T06:45:00Z',
    history: [
      { timestamp: '2026-10-14 01:00', action: 'Drafted in Content Engine', agentOrUser: 'Script Writer Agent' }
    ]
  },
  {
    id: 'pip-11',
    accountId: 'pip-quackers',
    title: 'Building a Floating Duck Castle in an Abandoned Waterpark',
    stage: 'Idea',
    format: 'POV',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Adventure', spokenText: 'We snuck into an abandoned 1990s wave pool with 500 yellow ducks.', visualAction: 'Drone shot zooming through dilapidated water slide.' }
    ],
    script: [
      { time: '0:00 - 0:05', shot: 'Drone shot over derelict water slide into empty pool', dialogue: 'We brought five hundred ducks into an abandoned wave pool to build the ultimate floating kingdom.', onScreenText: 'ABANDONED WAVE POOL' }
    ],
    caption: 'The abandoned water park duck fortress project begins... 🏰🌊 500 ducks, one empty wave pool, zero regrets. Part 1 drops this weekend!',
    hashtags: ['#Urbex', '#Waterpark', '#PipQuackers', '#MegaBuild'],
    soundStyle: 'Cinematic orchestral intro transitioning to trap beat',
    visualPrompt: 'Aerial shot of abandoned wave pool with hundreds of cheerful yellow rubber ducks floating peacefully in shallow turquoise rainwater.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Trend Scout Agent',
    targetDurationSeconds: 28,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-14T07:15:00Z',
    updatedAt: '2026-10-14T07:15:00Z',
    history: [
      { timestamp: '2026-10-14 07:15', action: 'Generated from Trend Scout', agentOrUser: 'Trend Scout Agent' }
    ]
  },
  {
    id: 'pip-12',
    accountId: 'pip-quackers',
    title: 'The World’s Smallest Squeaking Duck vs 1 Grain of Rice',
    stage: 'Idea',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Micro Curiosity', spokenText: 'This duck is literally smaller than a grain of basmati rice. And yes, it actually squeaks.', visualAction: 'Pip holding tweezers under microscope lens.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Macro microscope shot comparing yellow spec to single white rice grain', dialogue: 'This duck is literally smaller than a single grain of basmati rice. And yes, it squeaks.', onScreenText: 'SMALLER THAN RICE 🔬' }
    ],
    caption: 'Micro-sculpture meets duck acoustics! 🔬🦆 4mm tall with a functional piezoelectric micro-squeaker. How did they even cast this mold?',
    hashtags: ['#MicroArt', '#Miniatures', '#PipQuackers', '#Unbelievable'],
    soundStyle: 'High frequency comedic micro-pip squeak audio',
    visualPrompt: 'Microscopic macro view of a pristine 4mm yellow rubber duck resting next to a textured grain of uncooked rice on black velvet.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Trend Scout Agent',
    targetDurationSeconds: 18,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-14T07:40:00Z',
    updatedAt: '2026-10-14T07:40:00Z',
    history: [
      { timestamp: '2026-10-14 07:40', action: 'Logged idea', agentOrUser: 'Community Agent' }
    ]
  },

  // --- MARA VALE ITEMS (12 items across 7 stages) ---
  {
    id: 'mara-1',
    accountId: 'mara-vale',
    title: 'Dissecting a $4,500 Coarse Vinyl Masterwork',
    stage: 'Published',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Sublime Craft', spokenText: 'Most people see a toy. I see two hundred hours of hand-poured multi-part resin.', visualAction: 'Mara putting on cotton white gloves and unboxing matte wooden crate.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara in concrete studio opening laser-engraved wooden crate', dialogue: 'Most people see a toy. I see two hundred hours of hand-poured multi-part resin.', onScreenText: 'COARSE VINYL NO. 07' },
      { time: '0:04 - 0:13', shot: 'Macro turntable slow pan across gradient fade from matte bone to deep ochre', dialogue: 'Notice the transition along the clavicle. In industrial molding, this gradient usually pools. Here, it is atomized airbrush applied by the artist personally.', onScreenText: 'ATOMIZED GRADIENT' },
      { time: '0:13 - 0:24', shot: 'Inspecting underside numbered coin embedded flush in the resin base', dialogue: 'Edition seven of twenty-five. When provenance is embedded directly into the sculpt, forgery becomes functionally impossible.', onScreenText: 'EMBEDDED COIN PROVENANCE' },
      { time: '0:24 - 0:30', shot: 'Mara looking thoughtfully into camera, subtle nod', dialogue: 'What is the holy grail piece on your current wishlist? Tell me in the comments.', onScreenText: 'YOUR GRAIL SCULPT? 👇' }
    ],
    caption: 'An intimate study of Coarse Studio’s latest resin sculpture 🖤 The subtle atomized gradient along the clavicle demonstrates why physical artisan toys remain irreplaceable in a digital world.\n\nEdition 07/25. Which artist’s work currently defines your collection? Let’s converse below.',
    hashtags: ['#DesignerToys', '#MaraVale', '#ArtToyCurator', '#CoarseToys', '#VinylArt', '#ContemporarySculpture'],
    soundStyle: 'Ambient minimal ambient cello with delicate physical unboxing acoustics',
    visualPrompt: 'Mara Vale in serene minimalist concrete loft studio holding an exquisite matte resin collectible sculpture with cotton white conservator gloves, natural diffused window light, Hasselblad color rendering.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 30,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    createdAt: '2026-09-29T10:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z',
    metrics: { views: 320000, likes: 44200, comments: 1980, shares: 9800, engagementRate: 7.4 },
    history: [
      { timestamp: '2026-09-29 10:00', action: 'Curated by Mara', agentOrUser: 'Mara Vale System' },
      { timestamp: '2026-09-30 14:00', action: 'Approved by Creative Director', agentOrUser: 'Elena Rostova (Lead)' },
      { timestamp: '2026-10-01 12:00', action: 'Published to Instagram Reels', agentOrUser: 'Publisher Agent' }
    ]
  },
  {
    id: 'mara-2',
    accountId: 'mara-vale',
    title: 'The Sofubi Slush Molding Secret Japanese Masters Use',
    stage: 'Published',
    format: 'talking head',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Insider Revelation', spokenText: 'Ever wonder why vintage Japanese vinyl feels softer and smells sweet? Here is the secret.', visualAction: 'Mara holding translucent candy-flake kaiju figure up to studio sunlight.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara holding translucent emerald Kaiju figure against light', dialogue: 'Ever wonder why authentic Japanese Sofubi feels softer and has that distinctive aroma? Here is the chemistry.', onScreenText: 'THE SOFUBI SECRET 🇯🇵' },
      { time: '0:04 - 0:14', shot: 'Cutaways of two-piece copper molds submerged in molten vinyl tanks', dialogue: 'In Tokyo’s Katsushika district, masters still heat liquid plastisol in molten tin baths. The rotation speed determines the wall thickness down to a fraction of a millimeter.', onScreenText: 'MOLTEN TIN BATH ROTATION' },
      { time: '0:14 - 0:26', shot: 'Mara pressing gently on the torso showing immediate elastic spring-back', dialogue: 'Zero plasticizers. Pure memory. That is why a fifty-year-old Godzilla figure from 1974 still looks factory fresh today.', onScreenText: '50 YEARS OF RESILIENCE' }
    ],
    caption: 'The lost alchemy of Japanese Sofubi (soft vinyl) 🦖✨ Walking through why authentic slush-molded vinyl from Tokyo workshops outlasts mass-market injection plastics by decades.\n\nDo you own any authentic Sofubi in your collection? Share your favorites below.',
    hashtags: ['#Sofubi', '#JapaneseVinyl', '#ToyPreservation', '#MaraVale', '#CollectorCulture'],
    soundStyle: 'Warm analog synthesizer drones and delicate studio room tone',
    visualPrompt: 'Mara Vale holding translucent emerald green Japanese kaiju soft vinyl toy up to clean Nordic studio window light, architectural interior, 9:16 portrait.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 26,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    createdAt: '2026-10-04T12:00:00Z',
    updatedAt: '2026-10-06T15:30:00Z',
    metrics: { views: 410000, likes: 58900, comments: 2450, shares: 12400, engagementRate: 8.1 },
    history: [
      { timestamp: '2026-10-04 12:00', action: 'Script written', agentOrUser: 'Script Writer Agent' },
      { timestamp: '2026-10-05 10:00', action: 'Approved by Creative Director', agentOrUser: 'Marcus Chen' },
      { timestamp: '2026-10-06 15:30', action: 'Published to Instagram Reels', agentOrUser: 'Publisher Agent' }
    ]
  },
  {
    id: 'mara-3',
    accountId: 'mara-vale',
    title: 'The Architectural Guide to Displaying Vinyl Toys Without UV Damage',
    stage: 'Scheduled',
    format: 'POV',
    scheduledDate: '2026-10-17',
    scheduledTime: '17:30',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Preservation Rule', spokenText: 'The single biggest mistake collector homes make is placing display cases directly across from daylight.', visualAction: 'Mara adjusting low-iron museum glass cabinet in minimalist apartment.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara walking along custom aluminum and glass wall vitrine', dialogue: 'The single biggest mistake collector homes make is placing display cases directly across from daylight.', onScreenText: 'STOP UV DEGRADATION ☀️' },
      { time: '0:04 - 0:15', shot: 'UV meter displaying zero readings inside coated glass enclosure', dialogue: 'Standard window glass only blocks thirty percent of UVA rays. Within two years, your white resins will yellow and your neon lacquers will desaturate.', onScreenText: '99% UV-FILTERING GLASS' },
      { time: '0:15 - 0:26', shot: 'Showing warm 2700K 95-CRI recessed micro-spotlights angled at 45 degrees', dialogue: 'Use museum-grade low-iron glass and high CRI LEDs. Light your pieces like sculptures, not merchandise.', onScreenText: 'MUSEUM-GRADE LIGHTING' }
    ],
    caption: 'Preserving what you love: the architectural guide to display curation 🏛️✨ Yellowed vinyl and cracked resins are preventable with the right glass and lighting balance.\n\nSave this for your next studio or living room renovation.',
    hashtags: ['#CollectorInteriors', '#ToyPreservation', '#InteriorArchitecture', '#MaraVale', '#DisplayVitrines'],
    soundStyle: 'Gentle neo-classical piano and whisper quiet atmospheric tape hiss',
    visualPrompt: 'POV architectural interior of modern minimalist concrete gallery room with illuminated glass showcase filled with curated monochromatic designer figures, 9:16 format.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 26,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    createdAt: '2026-10-09T14:00:00Z',
    updatedAt: '2026-10-12T11:00:00Z',
    history: [
      { timestamp: '2026-10-09 14:00', action: 'Drafted in Content Engine', agentOrUser: 'Script Writer Agent' },
      { timestamp: '2026-10-11 09:30', action: 'Approved by Creative Director', agentOrUser: 'Elena Rostova (Lead)' },
      { timestamp: '2026-10-12 11:00', action: 'Scheduled for Saturday 17:30', agentOrUser: 'Publisher Agent' }
    ]
  },
  {
    id: 'mara-4',
    accountId: 'mara-vale',
    title: 'Why Blind Box "Odd Ratios" Are the Dark Souls of Collecting',
    stage: 'Approved',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Psychology of Drop', spokenText: 'A one in one-hundred-and-forty-four pull ratio sounds impossible until you calculate the batch distribution.', visualAction: 'Mara neatly unboxing a complete sealed 12-case master box.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara slicing outer plastic cellophane with brass scalpel', dialogue: 'A one in one-hundred-and-forty-four pull ratio sounds impossible until you calculate the master carton batch distribution.', onScreenText: '1:144 SECRET CHASE' },
      { time: '0:04 - 0:14', shot: 'Arranging twelve boxes in sequential geometric grid on grey felt pad', dialogue: 'Factories do not pack randomly. Weight tolerances within a single master carton are strictly balanced to prevent shelf tipping.', onScreenText: 'WEIGHT TOLERANCES' },
      { time: '0:14 - 0:25', shot: 'Revealing the chase variant figure with translucent crystalline wings', dialogue: 'And there she is. Case number four yields the celestial secret variant. Grace over luck.', onScreenText: 'SECRET VARIANT CONFIRMED' }
    ],
    caption: 'Deconstructing master carton probability 🎲✨ When you understand factory packaging tolerances, the 1:144 secret chase isn’t pure luck—it’s applied observation.\n\nHave you ever pulled a true secret chase from a sealed blind box? Tell your story below.',
    hashtags: ['#BlindBoxUnboxing', '#SecretChase', '#MaraVale', '#PopMart', '#DesignerVinyl'],
    soundStyle: 'Pristine paper-slice ASMR with low resonant bass swell',
    visualPrompt: 'Mara Vale in grey wool crewneck sitting at minimalist granite table opening designer art toy box with surgical precision, pristine studio depth, 9:16 portrait.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 25,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: false },
    createdAt: '2026-10-11T16:00:00Z',
    updatedAt: '2026-10-13T10:15:00Z',
    history: [
      { timestamp: '2026-10-11 16:00', action: 'Drafted in Content Engine', agentOrUser: 'Script Writer Agent' },
      { timestamp: '2026-10-13 10:15', action: 'Approved by Creative Director', agentOrUser: 'Elena Rostova (Lead)' }
    ]
  },
  {
    id: 'mara-5',
    accountId: 'mara-vale',
    title: 'The Evolution of Medicom Be@rbrick: High Art or Manufactured Hype?',
    stage: 'In Review',
    format: 'talking head',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Critical Critique', spokenText: 'Is the 1000% Bearbrick still a design icon, or has it become the supreme wallpaper of interior design?', visualAction: 'Mara standing between 1000% Karimoku wood bear and modern raw concrete wall.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara standing beside towering 1000% wooden Karimoku figure', dialogue: 'Is the Bearbrick still an essential design icon, or has it devolved into luxury wallpaper?', onScreenText: 'ICON OR WALLPAPER?' },
      { time: '0:04 - 0:15', shot: 'Close up of hand-carved wood grain seams on Karimoku edition', dialogue: 'When Medicom collaborates with seventy-year-old Japanese furniture makers, the craft is unquestionable. But the hundreds of licensed vinyl editions dilute the narrative.', onScreenText: 'KARIMOKU CRAFTSMANSHIP' },
      { time: '0:15 - 0:26', shot: 'Mara gesturing toward gallery seating', dialogue: 'Invest in materials and tactile provenance—never in sheer license branding.', onScreenText: 'INVEST IN PROVENANCE' }
    ],
    caption: 'A candid critique on Bearbrick culture in 2026 🐻🪵 While mass PVC licensed drops flood resale sites, pieces like the hand-carved Karimoku wooden editions prove the silhouette still possesses artistic soul when craftsmanship leads.\n\nWhere do you stand? Design classic or tired hype?',
    hashtags: ['#Bearbrick', '#MedicomToy', '#DesignCritique', '#MaraVale', '#ArtToyInvesting'],
    soundStyle: 'Minimalist electronic beat with crisp snare rim clicks',
    visualPrompt: 'Mara Vale in charcoal tailored blazer standing beside a tall natural walnut wood Bearbrick sculpture in an art gallery space, 9:16 portrait.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 26,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: true },
    reviewNotes: 'Tone in second 18 sounds slightly harsh toward mass collectors. Consider softening voice inflection to sound analytical rather than dismissive.',
    createdAt: '2026-10-12T11:20:00Z',
    updatedAt: '2026-10-14T01:30:00Z',
    history: [
      { timestamp: '2026-10-12 11:20', action: 'Video rendered', agentOrUser: 'Visual Director Agent' },
      { timestamp: '2026-10-14 01:30', action: 'Submitted to human review', agentOrUser: 'Workflow Coordinator' }
    ]
  },
  {
    id: 'mara-6',
    accountId: 'mara-vale',
    title: 'How to Detect Re-Glued and Restored Vinyl Sculptures',
    stage: 'In Review',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Forensic Check', spokenText: 'Before you wire thousands to a secondary market seller, inspect the neck seam under oblique lighting.', visualAction: 'Mara holding raking fiber-optic lamp across a rare vinyl figure neck joint.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara holding raking fiber-optic lamp against figure neck', dialogue: 'Before you send thousands on the secondary market, inspect the seam under oblique light.', onScreenText: 'DETECT RE-GLUED VINYL 🔍' },
      { time: '0:04 - 0:14', shot: 'Macro showing micro-beading of cyanoacrylate adhesive residue', dialogue: 'Factory ultrasonic welding leaves a clean matte shear. Superglue off-gassing creates tiny white halos along the perimeter called blooming.', onScreenText: 'ADHESIVE "BLOOMING"' },
      { time: '0:14 - 0:24', shot: 'Mara setting down figure and looking at camera', dialogue: 'Always request forty-five-degree macro video before confirming wire transfers.', onScreenText: 'REQUEST 45° VIDEO' }
    ],
    caption: 'Forensic appraisal: how to spot clandestine superglue repairs on rare vinyl 🔬 Secondary market fraud is rising. Look for adhesive "blooming" around limb joints before closing private sales.\n\nShare this with any collector friends making secondary acquisitions.',
    hashtags: ['#ToyAppraisal', '#VinylAuthentication', '#MaraVale', '#CollectorTips'],
    soundStyle: 'Precise click of inspection tools and subtle bass heartbeat',
    visualPrompt: 'Mara Vale in white lab conservator coat using specialized forensic optical light on black designer sculpture, extreme close up studio shot, 9:16.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 24,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: true, lipSyncCompleted: true, finalEditRendered: false },
    reviewNotes: 'Need legal disclaimer note: "Educational appraisal guide, not a formal guarantee of provenance."',
    createdAt: '2026-10-13T09:00:00Z',
    updatedAt: '2026-10-14T03:15:00Z',
    history: [
      { timestamp: '2026-10-13 09:00', action: 'Video compiled', agentOrUser: 'Visual Director Agent' }
    ]
  },
  {
    id: 'mara-7',
    accountId: 'mara-vale',
    title: 'The Rise of Micro-Batch Cold-Cast Porcelain Toys',
    stage: 'In Production',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'New Frontier', spokenText: 'Vinyl is giving way to something far colder, heavier, and more permanent: mineral porcelain.', visualAction: 'Mara tapping fingernail against white matte porcelain mask.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Fingernail tap producing resonant ceramic chime', dialogue: 'Vinyl is yielding to something colder, heavier, and far more permanent: mineral porcelain.', onScreenText: 'COLD-CAST PORCELAIN 🏺' },
      { time: '0:04 - 0:14', shot: 'Slow turn showing unglazed chalk-white finish with sharp edge retention', dialogue: 'Porcelain allows for sub-millimeter radii that vinyl melts away during cooling. The tactile feedback in the hand is sensational.', onScreenText: 'SUB-MILLIMETER SHARPNESS' }
    ],
    caption: 'The tactile shift toward mineral cold-cast porcelain in modern art toys 🤍 Sharp geometries that PVC can never achieve. Is porcelain the future of limited gallery editions?',
    hashtags: ['#PorcelainToys', '#ArtToys', '#MaraVale', '#SculptureArt'],
    soundStyle: 'Crisp porcelain ring chimes and delicate string quartet',
    visualPrompt: 'Mara Vale holding a pure chalk-white geometric porcelain bust against raw slate stone background, warm accent lighting, 9:16.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Visual Director Agent',
    targetDurationSeconds: 23,
    checklist: { imageGenerated: true, videoGenerated: true, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-13T15:00:00Z',
    updatedAt: '2026-10-14T04:45:00Z',
    history: [
      { timestamp: '2026-10-13 15:00', action: 'Visual asset rendered', agentOrUser: 'Visual Director Agent' }
    ]
  },
  {
    id: 'mara-8',
    accountId: 'mara-vale',
    title: 'Curating the Monochromatic Collector Shelf: 5 Essential Rules',
    stage: 'In Production',
    format: 'slideshow',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Styling Masterclass', spokenText: 'If your toy shelf feels cluttered instead of intentional, you are missing these three layout principles.', visualAction: 'Mara adjusting positions of five monochrome figures on floating black shelf.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara stepping back from floating shelf with laser level', dialogue: 'If your toy shelf feels chaotic instead of intentional, you are missing these layout principles.', onScreenText: 'SHELF CURATION 101' },
      { time: '0:04 - 0:13', shot: 'Diagram showing height pyramid and negative breathing margins', dialogue: 'First: establish a pyramid of heights. Second: leave forty percent negative air space. The eye needs silence to appreciate the sculpt.', onScreenText: '40% NEGATIVE SPACE' }
    ],
    caption: 'Transforming shelves into gallery installations 📐✨ Five interior design rules for displaying contemporary collectibles with poise and intention.',
    hashtags: ['#InteriorStyling', '#Shelfie', '#MaraVale', '#ArtDisplay'],
    soundStyle: 'Low-fi ambient Rhodes piano chords',
    visualPrompt: 'Mara Vale stepping back to inspect an impeccably styled floating shelf with monochromatic vinyl figures, soft Scandinavian architectural daylight.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 25,
    checklist: { imageGenerated: true, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-13T19:30:00Z',
    updatedAt: '2026-10-14T05:15:00Z',
    history: [
      { timestamp: '2026-10-13 19:30', action: 'Script generated', agentOrUser: 'Script Writer Agent' }
    ]
  },
  {
    id: 'mara-9',
    accountId: 'mara-vale',
    title: 'Why Matt Gondek’s Deconstructed Figures Command 10x Retail',
    stage: 'Scripted',
    format: 'talking head',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Art Market Analysis', spokenText: 'How did exploding pop-culture deconstruction become the hottest secondary market blue chip?', visualAction: 'Mara holding exploded comic head vinyl sculpt.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara examining multi-color exploding face sculpt', dialogue: 'How did exploding pop-culture deconstruction become the hottest secondary market blue chip?', onScreenText: 'EXPLODED POP ART 💥' }
    ],
    caption: 'Deconstructing Matt Gondek’s secondary market explosion 🎨 Why visceral disintegration resonates so strongly with contemporary art toy collectors.',
    hashtags: ['#MattGondek', '#ArtMarket', '#ContemporaryArt', '#MaraVale'],
    soundStyle: 'Modern electronic pulse with percussive clicks',
    visualPrompt: 'Mara Vale holding complex deconstructed cartoon head vinyl sculpture in minimalist gallery setting, soft rim lighting, 9:16.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 25,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-13T23:00:00Z',
    updatedAt: '2026-10-14T06:00:00Z',
    history: [
      { timestamp: '2026-10-13 23:00', action: 'Generated from Trend Radar', agentOrUser: 'Trend Scout Agent' }
    ]
  },
  {
    id: 'mara-10',
    accountId: 'mara-vale',
    title: 'Unboxing the 1-of-1 Prototype That Never Got Approved',
    stage: 'Scripted',
    format: 'unboxing',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Exclusive Access', spokenText: 'The brand cancelled this drop four days before production. I have the only surviving prototype.', visualAction: 'Mara unwrapping unpainted grey resin cast from bubble wrap.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Mara slicing bubble wrap on unpainted grey resin prototype', dialogue: 'The studio cancelled this drop four days before production. I have the only surviving test cast.', onScreenText: 'CANCELLED DROP PROTOTYPE' }
    ],
    caption: 'Inside the cancellation graveyard 🪦 Unboxing the sole surviving pre-production test cast of a figure that was deemed "too structurally fragile" for retail.',
    hashtags: ['#CancelledToys', '#ToyPrototypes', '#MaraVale', '#RareFinds'],
    soundStyle: 'Eerie low bass frequency with paper rustling ASMR',
    visualPrompt: 'Mara Vale holding a raw grey matte resin prototype figure with delicate skeletal details, studio macro camera, 9:16 portrait.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Script Writer Agent',
    targetDurationSeconds: 27,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-14T02:00:00Z',
    updatedAt: '2026-10-14T06:20:00Z',
    history: [
      { timestamp: '2026-10-14 02:00', action: 'Drafted in Content Engine', agentOrUser: 'Script Writer Agent' }
    ]
  },
  {
    id: 'mara-11',
    accountId: 'mara-vale',
    title: 'The $10,000 Private Vault Tour in Zurich',
    stage: 'Idea',
    format: 'POV',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Luxury Vault', spokenText: 'Behind a steel bank vault door in Zurich lies the world’s most secretive designer vinyl archive.', visualAction: 'Heavy steel vault wheel turning slowly.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Heavy steel vault wheel unlocking', dialogue: 'Behind a bank vault in Zurich lies the world’s most secretive vinyl archive.', onScreenText: 'SWISS TOY VAULT 🏦' }
    ],
    caption: 'An exclusive key to the Zurich underground toy vault 🗝️ Millions in vintage Kaws, original Futura figures, and Tokyo one-offs.',
    hashtags: ['#ToyVault', '#Zurich', '#MaraVale', '#LuxuryCollecting'],
    soundStyle: 'Dramatic cinematic orchestral drone',
    visualPrompt: 'POV entering a climate-controlled vault illuminated with recessed LED channels and glass security pedestals holding rare art toys.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Trend Scout Agent',
    targetDurationSeconds: 29,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-14T07:10:00Z',
    updatedAt: '2026-10-14T07:10:00Z',
    history: [
      { timestamp: '2026-10-14 07:10', action: 'Generated from Trend Scout', agentOrUser: 'Trend Scout Agent' }
    ]
  },
  {
    id: 'mara-12',
    accountId: 'mara-vale',
    title: 'Why Hand-Mixed Pigment Batches Are Becoming Extinct',
    stage: 'Idea',
    format: 'talking head',
    selectedHookIndex: 0,
    hookOptions: [
      { type: 'Artisan Requiem', spokenText: 'Only four artisans in Europe still mix raw oil-based vinyl pigments by eye. This is their story.', visualAction: 'Mara swirling a glass flask of deep ultramarine pigment.' }
    ],
    script: [
      { time: '0:00 - 0:04', shot: 'Swirling glass beaker of vibrant cobalt pigment', dialogue: 'Only four artisans in Europe still mix vinyl pigments by eye. This is what we risk losing.', onScreenText: 'THE LOST PIGMENTS' }
    ],
    caption: 'The twilight of hand-mixed artisan pigments in collectible vinyl 🎨 Once machines standardize color palettes, the accidental genius of batch variance vanishes.',
    hashtags: ['#PigmentCraft', '#Artisans', '#MaraVale', '#VinylArt'],
    soundStyle: 'Acoustic guitar and gentle workshop ambience',
    visualPrompt: 'Mara Vale in painter studio wearing dark apron, holding a vintage glass beaker containing luminous cobalt blue pigment powder.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    assignedAgent: 'Trend Scout Agent',
    targetDurationSeconds: 25,
    checklist: { imageGenerated: false, videoGenerated: false, voiceSynthesized: false, lipSyncCompleted: false, finalEditRendered: false },
    createdAt: '2026-10-14T07:35:00Z',
    updatedAt: '2026-10-14T07:35:00Z',
    history: [
      { timestamp: '2026-10-14 07:35', action: 'Added to pipeline ideas', agentOrUser: 'Community Agent' }
    ]
  }
];

export const SEED_KNOWLEDGE: KnowledgeEntry[] = [
  // Pip Quackers Knowledge
  {
    id: 'kb-pip-1',
    accountId: 'pip-quackers',
    category: 'Facts',
    title: 'Origin of the Squeak Valve Patent',
    content: 'The first acoustic rubber duck squeak patent was filed in 1947 by Peter Ganine. True vintage pieces feature a brass two-leaf reed instead of modern plastic ball valves. This produces a higher resonance pitch (1,150 Hz vs modern 820 Hz).',
    tags: ['Acoustics', 'Patent History', 'Authentication'],
    updatedAt: '2026-10-01'
  },
  {
    id: 'kb-pip-2',
    accountId: 'pip-quackers',
    category: 'Collector Terminology',
    title: 'The "Keelson" Weight Specification',
    content: 'In rubber duck racing and display circles, the "keelson" refers to the weighted ballast embedded in the bottom rim. Standard racing ducks use a 12-gram circular lead-free zinc slug to guarantee self-righting within 0.4 seconds of water entry.',
    tags: ['Hydrodynamics', 'Terminology', 'Racing'],
    updatedAt: '2026-10-03'
  },
  {
    id: 'kb-pip-3',
    accountId: 'pip-quackers',
    category: 'Brand Rules',
    title: 'Pip Tone & Personality Guardrails',
    content: 'Pip must never sound bored, cynical, or corporate. If mentioning price, always contrast it humorously with ordinary life expenses (e.g. "worth more than 40 boxes of cereal"). Always champion physical hunts and outdoor community exploration over passive online scrolling.',
    tags: ['Brand Voice', 'Guardrails', 'Humor'],
    updatedAt: '2026-10-05'
  },
  {
    id: 'kb-pip-4',
    accountId: 'pip-quackers',
    category: 'Past Winning Post',
    title: 'Breakdown: Osaka Basement Safe (482k views)',
    content: 'Winning mechanics: 1) Flashlight opening hook in darkness created instant mystery within 1.2s. 2) UV blacklight reveal at 0:11 provided a vivid visual climax. 3) Geo-cache CTA drove 2,890 comments asking for specific city drops.',
    tags: ['Analytics Post-Mortem', 'Hook Framework', 'Viral Formula'],
    updatedAt: '2026-10-06'
  },
  {
    id: 'kb-pip-5',
    accountId: 'pip-quackers',
    category: 'Product Info',
    title: 'Series 03 Neon Drop Production Specs',
    content: 'Series 03 consists of 6 standard colorways (1:6 odds) and 1 chase "Cyber-Chrome" duck (1:72 odds). Material is medical-grade hypoallergenic silicone with matte vapor-honed finish. Hand-stamped serial on belly.',
    tags: ['Series 3', 'Specs', 'Odds'],
    updatedAt: '2026-10-08'
  },
  {
    id: 'kb-pip-6',
    accountId: 'pip-quackers',
    category: 'Strategy',
    title: 'Retention Rule: 3-Second Scale Check',
    content: 'Mandate digital scale readings in the first 2 seconds of all blind box unboxings. Pair with mechanical click audio. Historical tests indicate a 74% 3-sec retention lift.',
    tags: ['Retention', 'Hooks', 'Production Rule'],
    updatedAt: '2026-10-12'
  },

  // Mara Vale Knowledge
  {
    id: 'kb-mara-1',
    accountId: 'mara-vale',
    category: 'Collector Terminology',
    title: 'Sofubi (Slush Molding) Taxonomy',
    content: 'Sofubi (ソフトビニール soft vinyl) refers strictly to Japanese rotocast vinyl produced in heated copper electroformed molds. Genuine Sofubi exhibits a distinct elastic softness, seamless part tolerances, and resistance to environmental UV embrittlement.',
    tags: ['Sofubi', 'Molding', 'Japan'],
    updatedAt: '2026-10-02'
  },
  {
    id: 'kb-mara-2',
    accountId: 'mara-vale',
    category: 'Brand Rules',
    title: 'Mara Curation Standards & Voice',
    content: 'Mara speaks with the quiet poise of a museum conservator. Avoid hype slang ("fire", "cop", "drop alert"). Use architectural and design vocabulary: "patina", "radii", "parting lines", "negative space", "provenance". Never touch high-end resin without white cotton gloves on camera.',
    tags: ['Voice Guide', 'Conservator', 'Aesthetics'],
    updatedAt: '2026-10-04'
  },
  {
    id: 'kb-mara-3',
    accountId: 'mara-vale',
    category: 'Product Info',
    title: 'Cold-Cast Resin vs Injection Molded PVC',
    content: 'Cold-cast resin combines resin polymer with 70% powdered marble, stone, or bronze. It feels heavy, cold to the touch, and holds razor-sharp undercut edges impossible in flexible injection PVC. Demands humidity control between 40-55% RH.',
    tags: ['Materials', 'Preservation', 'Resin'],
    updatedAt: '2026-10-07'
  },
  {
    id: 'kb-mara-4',
    accountId: 'mara-vale',
    category: 'Past Winning Post',
    title: 'Breakdown: Coarse Vinyl Dissection (320k views)',
    content: 'Winning mechanics: 1) ASMR scalpel opening and white gloves signaled elite craftsmanship. 2) Macro turntable slow-pan held viewer gaze for 8 continuous seconds without dialogue. 3) Provocative question on art vs commercial hype fueled collector discourse in comments.',
    tags: ['Post-Mortem', 'Macro Shot', 'Engagement'],
    updatedAt: '2026-10-09'
  },
  {
    id: 'kb-mara-5',
    accountId: 'mara-vale',
    category: 'Facts',
    title: 'Kaws Companion Mold Evolution',
    content: 'Original 1999 Bounty Hunter release measured 8 inches with hollow blow-molded legs. 2006 Medicom re-sculpt introduced internal metal armature to prevent ankle sag over 10-year lifespans. Original stamps read "Medicom Toy / Made in China" on right foot sole.',
    tags: ['Kaws', 'Archive', 'Authentication'],
    updatedAt: '2026-10-10'
  },
  {
    id: 'kb-mara-6',
    accountId: 'mara-vale',
    category: 'Strategy',
    title: 'Visual Rule: Macro Turntable Shot',
    content: 'Every showcase script must dedicate 4 seconds to an ultra-close macro sweep of sculpt textures to feed collector scrutiny and drive high bookmark saves.',
    tags: ['Visual Rule', 'Macro', 'Instagram Saves'],
    updatedAt: '2026-10-13'
  }
];

export const SEED_TRENDS: TrendEntry[] = [
  // Pip Quackers Trends (8 trends)
  {
    id: 'trend-pip-1',
    accountId: 'pip-quackers',
    topic: 'The "Weight Test" Blind Box Hack',
    platform: 'TikTok',
    momentum: 'rising',
    momentumScore: 94,
    category: 'Format Trend',
    description: 'Collectors bring digital jewelry scales into physical retail stores to detect secret chase figures by exact gram variance.',
    exampleHooks: [
      'Do NOT buy another blind box until you hear this weight trick.',
      'Testing if 42.6 grams actually guarantees the rare golden duck...',
      'The store clerk asked why I brought a scale. Here is what happened.'
    ],
    suggestedFormat: 'unboxing',
    recommendedSound: 'Digital scale beep + upbeat lo-fi drop'
  },
  {
    id: 'trend-pip-2',
    accountId: 'pip-quackers',
    topic: 'POV: You Left Your Vinyl Figure in Direct Sunlight',
    platform: 'TikTok',
    momentum: 'peaking',
    momentumScore: 89,
    category: 'Niche Culture',
    description: 'Dramatic comedic melodrama showing collectible toys panicking when placed on a sunny windowsill without UV protection.',
    exampleHooks: [
      'POV: Your $200 vinyl figure sees you opening the window blinds.',
      'Yellowing plastic is real and here is the 10-second fix.',
      'Show this to anyone who displays art toys near sunlight.'
    ],
    suggestedFormat: 'POV',
    recommendedSound: 'Dramatic orchestral crescendo cut with comedy thump'
  },
  {
    id: 'trend-pip-3',
    accountId: 'pip-quackers',
    topic: 'Custom Patina Speed-Paint Challenge',
    platform: 'TikTok',
    momentum: 'rising',
    momentumScore: 91,
    category: 'Community Challenge',
    description: 'Taking common base ducklings and airbrushing them with iridescent or cyber-rust textures in 60 seconds.',
    exampleHooks: [
      'Turning a $5 dollar-store duck into an $800 gallery centerpiece.',
      'My followers told me to paint this duck in holographic chrome...',
      'This one mistake almost melted the vinyl mold.'
    ],
    suggestedFormat: 'skit',
    recommendedSound: 'Hyperpop synth beat with spray can sound FX'
  },
  {
    id: 'trend-pip-4',
    accountId: 'pip-quackers',
    topic: 'Geocache Hunt in Public Transit',
    platform: 'TikTok',
    momentum: 'rising',
    momentumScore: 96,
    category: 'IRL Adventure',
    description: 'Hiding magnetic 3D printed or vinyl drops in subway cars, under bridges, and library bookshelves with GPS coordinates.',
    exampleHooks: [
      'If you ride the 7-train in NYC, check under seat 14 right now.',
      'Hiding a 1-of-1 golden duck in the largest library in Europe.',
      'Will someone find this before transit security cleans the station?'
    ],
    suggestedFormat: 'POV',
    recommendedSound: 'Ticking suspense clock with heartbeat bass'
  },
  {
    id: 'trend-pip-5',
    accountId: 'pip-quackers',
    topic: 'Acoustic Squeak Pitch Tournament',
    platform: 'TikTok',
    momentum: 'peaking',
    momentumScore: 82,
    category: 'Audio Meme',
    description: 'Pitting 16 different ducks against each other in bracket style acoustic frequency showdowns using spectrum analyzers.',
    exampleHooks: [
      'The loudest duck squeak in the world registered at 104 decibels.',
      'Why does this 1970 duck squeak in F-sharp minor?',
      'Tournament of champions: round one starts now.'
    ],
    suggestedFormat: 'unboxing',
    recommendedSound: 'Drum roll into high-pitched squeak resonance'
  },
  {
    id: 'trend-pip-6',
    accountId: 'pip-quackers',
    topic: 'Bath Bomb Duck Hatching ASMR',
    platform: 'TikTok',
    momentum: 'fading',
    momentumScore: 68,
    category: 'Visual ASMR',
    description: 'Embedding miniature collectible ducks inside giant artisan effervescent bath bombs that dissolve in macro 4K.',
    exampleHooks: [
      'Dissolving a 10-pound black obsidian bath bomb to save this duck.',
      'Listen to this carbonation hiss in 4k macro audio.',
      'What color is going to emerge from the volcanic center?'
    ],
    suggestedFormat: 'unboxing',
    recommendedSound: 'Binaural bubbling water and fizzing effervescence'
  },
  {
    id: 'trend-pip-7',
    accountId: 'pip-quackers',
    topic: 'The $10 vs $1,000 Blindfold Guess',
    platform: 'TikTok',
    momentum: 'rising',
    momentumScore: 88,
    category: 'Format Trend',
    description: 'Blindfolded collectors trying to identify mold seams, weight balance, and material texture using only their fingertips.',
    exampleHooks: [
      'Can my hands tell the difference between a $10 duck and a $1,000 grail?',
      'Blindfolded vinyl touch test: round 1.',
      'She identified the factory mold in 3 seconds flat.'
    ],
    suggestedFormat: 'skit',
    recommendedSound: 'Playful game show suspense track'
  },
  {
    id: 'trend-pip-8',
    accountId: 'pip-quackers',
    topic: 'Subway Surfing Rubber Duck Racing',
    platform: 'TikTok',
    momentum: 'fading',
    momentumScore: 61,
    category: 'Niche Culture',
    description: 'Setting weighted hydrodynamic ducks in urban gutter streams and rain runoff puddles during downpours.',
    exampleHooks: [
      'Gutter Grand Prix: Tokyo rainstorm edition.',
      'Which duck will survive the sewer grate jump?',
      'The current was way faster than we planned.'
    ],
    suggestedFormat: 'POV',
    recommendedSound: 'Upbeat phonk drift track with rain sounds'
  },

  // Mara Vale Trends (8 trends)
  {
    id: 'trend-mara-1',
    accountId: 'mara-vale',
    topic: 'Museum-Quality Conservator Gloves Unboxing',
    platform: 'Instagram Reels',
    momentum: 'rising',
    momentumScore: 95,
    category: 'Format Trend',
    description: 'Handling art toys with white conservator gloves, brass calipers, and forensic scalpels to elevate perceived luxury.',
    exampleHooks: [
      'Never touch unsealed matte resin with bare fingertips.',
      'Why art museum staff handle designer toys like ancient artifacts.',
      'The tactile satisfying sound of white cotton conservator gloves.'
    ],
    suggestedFormat: 'unboxing',
    recommendedSound: 'Crisp ASMR linen and cardboard slicing audio'
  },
  {
    id: 'trend-mara-2',
    accountId: 'mara-vale',
    topic: 'Brutalist Concrete Shelf Styling',
    platform: 'Instagram Reels',
    momentum: 'peaking',
    momentumScore: 92,
    category: 'Interior Architecture',
    description: 'Pairing monochrome designer vinyl figures with raw concrete plinths, travertine tiles, and low-iron architectural vitrines.',
    exampleHooks: [
      'How to make a toy collection look like a Chelsea art gallery.',
      'Three interior design rules for displaying vinyl without visual clutter.',
      'Stop using cheap bookcases for gallery-grade sculptures.'
    ],
    suggestedFormat: 'slideshow',
    recommendedSound: 'Minimal ambient piano with warm reverb'
  },
  {
    id: 'trend-mara-3',
    accountId: 'mara-vale',
    topic: 'The Slush Molding Master Tour: Tokyo Sofubi',
    platform: 'Instagram Reels',
    momentum: 'rising',
    momentumScore: 89,
    category: 'Artisan Documentary',
    description: 'Spotlighting the remaining copper electroform artisans in Katsushika and Sumida who cast soft vinyl by hand in molten tin.',
    exampleHooks: [
      'Only 6 workshops in Tokyo still know this 70-year-old molding secret.',
      'This copper mold has produced over 50,000 legendary kaiju figures.',
      'Why modern 3D printers still cannot replicate authentic slush vinyl.'
    ],
    suggestedFormat: 'talking head',
    recommendedSound: 'Warm acoustic instrumentation with workshop ambience'
  },
  {
    id: 'trend-mara-4',
    accountId: 'mara-vale',
    topic: 'Micro-Batch Cold-Cast Mineral Resin',
    platform: 'Instagram Reels',
    momentum: 'rising',
    momentumScore: 93,
    category: 'Material Innovation',
    description: 'The shift from petroleum PVC plastics to heavy cold-cast marble dust and bio-resins in limited contemporary drops.',
    exampleHooks: [
      'Why the top independent sculptors are abandoning PVC for cold-cast marble.',
      'Weighing a 3-pound mineral bust: hear that resonant ceramic chime.',
      'The environmental future of limited edition collectible art.'
    ],
    suggestedFormat: 'unboxing',
    recommendedSound: 'Resonant ceramic bell ring and deep sub-bass'
  },
  {
    id: 'trend-mara-5',
    accountId: 'mara-vale',
    topic: 'Secondary Market Forensic Authentication',
    platform: 'Instagram Reels',
    momentum: 'peaking',
    momentumScore: 86,
    category: 'Appraisal & Finance',
    description: 'Testing UV watermarks, weight balances, laser-etched serials, and paint seam tolerances on high-value secondary market pieces.',
    exampleHooks: [
      'How I spotted a $3,000 counterfeit vinyl sculpt in 15 seconds.',
      'Look for adhesive blooming on the neck joint before sending payment.',
      'The three authentication tells that counterfeiters always miss.'
    ],
    suggestedFormat: 'talking head',
    recommendedSound: 'Minimal tech pulse with clinical inspection cues'
  },
  {
    id: 'trend-mara-6',
    accountId: 'mara-vale',
    topic: 'The 360 Turntable Macro ASMR Reel',
    platform: 'Instagram Reels',
    momentum: 'rising',
    momentumScore: 90,
    category: 'Visual Showcase',
    description: 'Continuous slow-motion 360-degree rotation of an intricate figure with zero dialogue, letting lighting and textures speak.',
    exampleHooks: [
      '4K macro inspection of atomized airbrush feathering.',
      'Watch how the rim light travels across this sculpted contour.',
      'Pure visual tranquility for collectors.'
    ],
    suggestedFormat: 'POV',
    recommendedSound: 'Gentle neo-classical string ensemble'
  },
  {
    id: 'trend-mara-7',
    accountId: 'mara-vale',
    topic: 'Drop Fatigue and the Return to Scarcity',
    platform: 'Instagram Reels',
    momentum: 'peaking',
    momentumScore: 78,
    category: 'Culture Critique',
    description: 'Deep analytical reels discussing oversaturation of blind boxes and why collectors are retreating to sub-50 edition runs.',
    exampleHooks: [
      'Is mass blind-box consumerism killing the spirit of art toys?',
      'Why edition sizes under 50 are outperforming 10,000-piece drops.',
      'The quiet rebellion happening inside collector Discord servers.'
    ],
    suggestedFormat: 'talking head',
    recommendedSound: 'Moody down-tempo trip-hop with thoughtful pacing'
  },
  {
    id: 'trend-mara-8',
    accountId: 'mara-vale',
    topic: 'Vintage 1990s Hong Kong Urban Vinyl Archive',
    platform: 'Instagram Reels',
    momentum: 'fading',
    momentumScore: 65,
    category: 'Archive History',
    description: 'Retrospectives on the birth of designer vinyl in Hong Kong (Michael Lau, Eric So) and why first-edition figures are museum grails.',
    exampleHooks: [
      'Where designer vinyl was born in 1998: the Hong Kong underground.',
      'The original gardener figures that started an entire global movement.',
      'Holding an original 1999 Michael Lau prototype.'
    ],
    suggestedFormat: 'slideshow',
    recommendedSound: 'Late 90s downtempo trip hop beat'
  }
];

export const SEED_ANALYTICS: Record<string, AnalyticsDataPoint[]> = {
  'pip-quackers': [
    { date: 'Sep 15', views: 82000, engagementRate: 7.1, followers: 72400 },
    { date: 'Sep 16', views: 94000, engagementRate: 7.4, followers: 73100 },
    { date: 'Sep 17', views: 76000, engagementRate: 6.8, followers: 73600 },
    { date: 'Sep 18', views: 110000, engagementRate: 8.2, followers: 74500 },
    { date: 'Sep 19', views: 145000, engagementRate: 8.9, followers: 75800 },
    { date: 'Sep 20', views: 130000, engagementRate: 8.4, followers: 76700 },
    { date: 'Sep 21', views: 165000, engagementRate: 9.1, followers: 77900 },
    { date: 'Sep 22', views: 120000, engagementRate: 7.8, followers: 78600 },
    { date: 'Sep 23', views: 140000, engagementRate: 8.0, followers: 79400 },
    { date: 'Sep 24', views: 155000, engagementRate: 8.3, followers: 80200 },
    { date: 'Sep 25', views: 190000, engagementRate: 9.4, followers: 81600 },
    { date: 'Sep 26', views: 175000, engagementRate: 8.8, followers: 82500 },
    { date: 'Sep 27', views: 210000, engagementRate: 9.6, followers: 83900 },
    { date: 'Sep 28', views: 245000, engagementRate: 9.8, followers: 85400 },
    { date: 'Sep 29', views: 220000, engagementRate: 9.1, followers: 86500 },
    { date: 'Sep 30', views: 230000, engagementRate: 8.9, followers: 87400 },
    { date: 'Oct 01', views: 290000, engagementRate: 10.2, followers: 89100 },
    { date: 'Oct 02', views: 340000, engagementRate: 10.8, followers: 91400 },
    { date: 'Oct 03', views: 310000, engagementRate: 9.7, followers: 92800 },
    { date: 'Oct 04', views: 280000, engagementRate: 9.2, followers: 93900 },
    { date: 'Oct 05', views: 395000, engagementRate: 11.2, followers: 96200 },
    { date: 'Oct 06', views: 360000, engagementRate: 10.4, followers: 97800 },
    { date: 'Oct 07', views: 340000, engagementRate: 9.9, followers: 99100 },
    { date: 'Oct 08', views: 320000, engagementRate: 9.5, followers: 100200 },
    { date: 'Oct 09', views: 310000, engagementRate: 9.3, followers: 101100 },
    { date: 'Oct 10', views: 350000, engagementRate: 10.1, followers: 102500 },
    { date: 'Oct 11', views: 375000, engagementRate: 10.5, followers: 103900 },
    { date: 'Oct 12', views: 410000, engagementRate: 11.0, followers: 105800 },
    { date: 'Oct 13', views: 440000, engagementRate: 11.4, followers: 107900 },
    { date: 'Oct 14', views: 460000, engagementRate: 11.8, followers: 109800 }
  ],
  'mara-vale': [
    { date: 'Sep 15', views: 52000, engagementRate: 6.2, followers: 48200 },
    { date: 'Sep 16', views: 58000, engagementRate: 6.4, followers: 48600 },
    { date: 'Sep 17', views: 49000, engagementRate: 6.0, followers: 48900 },
    { date: 'Sep 18', views: 72000, engagementRate: 7.1, followers: 49500 },
    { date: 'Sep 19', views: 88000, engagementRate: 7.5, followers: 50200 },
    { date: 'Sep 20', views: 84000, engagementRate: 7.3, followers: 50800 },
    { date: 'Sep 21', views: 95000, engagementRate: 7.8, followers: 51600 },
    { date: 'Sep 22', views: 81000, engagementRate: 7.0, followers: 52100 },
    { date: 'Sep 23', views: 92000, engagementRate: 7.2, followers: 52800 },
    { date: 'Sep 24', views: 104000, engagementRate: 7.7, followers: 53600 },
    { date: 'Sep 25', views: 122000, engagementRate: 8.2, followers: 54600 },
    { date: 'Sep 26', views: 115000, engagementRate: 7.9, followers: 55300 },
    { date: 'Sep 27', views: 138000, engagementRate: 8.5, followers: 56300 },
    { date: 'Sep 28', views: 154000, engagementRate: 8.7, followers: 57400 },
    { date: 'Sep 29', views: 146000, engagementRate: 8.3, followers: 58200 },
    { date: 'Sep 30', views: 158000, engagementRate: 8.4, followers: 59100 },
    { date: 'Oct 01', views: 195000, engagementRate: 9.1, followers: 60500 },
    { date: 'Oct 02', views: 220000, engagementRate: 9.5, followers: 62100 },
    { date: 'Oct 03', views: 205000, engagementRate: 8.8, followers: 63200 },
    { date: 'Oct 04', views: 185000, engagementRate: 8.2, followers: 64100 },
    { date: 'Oct 05', views: 260000, engagementRate: 10.1, followers: 65800 },
    { date: 'Oct 06', views: 240000, engagementRate: 9.4, followers: 67100 },
    { date: 'Oct 07', views: 225000, engagementRate: 9.0, followers: 68100 },
    { date: 'Oct 08', views: 215000, engagementRate: 8.8, followers: 69000 },
    { date: 'Oct 09', views: 210000, engagementRate: 8.6, followers: 69800 },
    { date: 'Oct 10', views: 235000, engagementRate: 9.2, followers: 70900 },
    { date: 'Oct 11', views: 250000, engagementRate: 9.5, followers: 72100 },
    { date: 'Oct 12', views: 275000, engagementRate: 9.9, followers: 73600 },
    { date: 'Oct 13', views: 290000, engagementRate: 10.2, followers: 75100 },
    { date: 'Oct 14', views: 305000, engagementRate: 10.5, followers: 76500 }
  ]
};

export const SEED_FORMAT_PERFORMANCE: Record<string, FormatPerformance[]> = {
  'pip-quackers': [
    { format: 'Unboxing', postsCount: 14, avgViews: 520000, avgEngagementRate: 9.8 },
    { format: 'POV IRL Hunt', postsCount: 10, avgViews: 480000, avgEngagementRate: 9.4 },
    { format: 'Skit & Comedy', postsCount: 8, avgViews: 390000, avgEngagementRate: 8.2 },
    { format: 'Talking Head', postsCount: 4, avgViews: 210000, avgEngagementRate: 6.1 },
    { format: 'Slideshow Tier List', postsCount: 3, avgViews: 180000, avgEngagementRate: 5.7 }
  ],
  'mara-vale': [
    { format: 'Unboxing / Curation', postsCount: 16, avgViews: 380000, avgEngagementRate: 8.9 },
    { format: 'Talking Head Critique', postsCount: 11, avgViews: 290000, avgEngagementRate: 8.1 },
    { format: 'POV Architectural Display', postsCount: 9, avgViews: 340000, avgEngagementRate: 8.6 },
    { format: 'Slideshow Curation', postsCount: 6, avgViews: 220000, avgEngagementRate: 7.2 },
    { format: 'Skit / Melodrama', postsCount: 2, avgViews: 140000, avgEngagementRate: 5.4 }
  ]
};

export const SEED_HOOK_PERFORMANCE: Record<string, HookPerformance[]> = {
  'pip-quackers': [
    { hookStyle: 'Scale & Weight Test Opening', avgRetention3s: 78.4, sampleCount: 8 },
    { hookStyle: 'Flashlight Darkness Reveal', avgRetention3s: 74.2, sampleCount: 6 },
    { hookStyle: 'Contrarian / Don’t Buy This', avgRetention3s: 69.8, sampleCount: 7 },
    { hookStyle: 'Audio Squeak Tournament', avgRetention3s: 64.5, sampleCount: 5 },
    { hookStyle: 'Generic Question Opening', avgRetention3s: 41.2, sampleCount: 4 }
  ],
  'mara-vale': [
    { hookStyle: 'Conservator Gloves ASMR', avgRetention3s: 82.1, sampleCount: 10 },
    { hookStyle: 'Forensic Light Examination', avgRetention3s: 77.8, sampleCount: 7 },
    { hookStyle: 'Sublime Craft / 200hr Resin', avgRetention3s: 73.4, sampleCount: 8 },
    { hookStyle: 'Architectural UV Preserving', avgRetention3s: 70.1, sampleCount: 6 },
    { hookStyle: 'Standard Intro Greeting', avgRetention3s: 38.6, sampleCount: 3 }
  ]
};

export const SEED_AGENTS: AgentConfig[] = [
  {
    id: 'agent-trend-scout',
    name: 'Trend Scout',
    role: 'Real-time Viral Intelligence',
    description: 'Monitors TikTok, Reels, Reddit r/vinyltoys, and Discord channels to detect emerging collector memes and format trends.',
    iconName: 'Radar',
    model: 'Gemini 3.8 Flash (Grounding)',
    isActive: true,
    requiresHumanApproval: false,
    lastRunTime: '12 mins ago',
    status: 'success',
    latencyMs: 840
  },
  {
    id: 'agent-script-writer',
    name: 'Script Writer',
    role: 'Persona-Aligned Scripting',
    description: 'Generates multi-hook options, timestamped shot directions, dialogue in character voice, on-screen text, and captions.',
    iconName: 'FileEdit',
    model: 'Gemini 3.8 Flash',
    isActive: true,
    requiresHumanApproval: false,
    lastRunTime: '38 mins ago',
    status: 'success',
    latencyMs: 1120
  },
  {
    id: 'agent-visual-director',
    name: 'Visual Director',
    role: 'Prompt Locking & Visual Consistency',
    description: 'Enforces character prompts, studio lighting parameters, 9:16 vertical composition, and coordinates image/video generation.',
    iconName: 'Camera',
    model: 'Gemini 3.1 Flash Image + Veo 3.1',
    isActive: true,
    requiresHumanApproval: true,
    lastRunTime: '1 hour ago',
    status: 'success',
    latencyMs: 3400
  },
  {
    id: 'agent-voice-lipsync',
    name: 'Voice and Lip Sync',
    role: 'Vocal Synthesis & Lip Alignment',
    description: 'Synthesizes dialogue via ElevenLabs and aligns phoneme lip-sync models (Hedra / HeyGen) with character avatars.',
    iconName: 'Mic',
    model: 'ElevenLabs Turbo v2.5 + Hedra Char-2',
    isActive: true,
    requiresHumanApproval: true,
    lastRunTime: '2 hours ago',
    status: 'success',
    latencyMs: 2900
  },
  {
    id: 'agent-publisher',
    name: 'Publisher Agent',
    role: 'Multi-Platform Dispatcher',
    description: 'Automatically queues approved media to TikTok and Instagram Reels APIs during peak algorithmic engagement windows.',
    iconName: 'Send',
    model: 'n8n Webhook Engine',
    isActive: true,
    requiresHumanApproval: true, // Rule: nothing scheduled without approval
    lastRunTime: '3 hours ago',
    status: 'idle',
    latencyMs: 420
  },
  {
    id: 'agent-performance-analyst',
    name: 'Performance Analyst',
    role: 'Learning Loop & Knowledge Synthesizer',
    description: 'Computes retention curves, identifies winning hook traits, and automatically synthesizes tactical rules into Knowledge Base.',
    iconName: 'LineChart',
    model: 'Gemini 3.8 Flash',
    isActive: true,
    requiresHumanApproval: false,
    lastRunTime: '5 hours ago',
    status: 'success',
    latencyMs: 1450
  }
];

export const SEED_AGENT_LOGS: AgentLog[] = [
  {
    id: 'log-1',
    accountId: 'pip-quackers',
    agentId: 'agent-trend-scout',
    agentName: 'Trend Scout',
    action: 'Discovered high-velocity topic',
    detail: 'Detected 94% momentum spike for "Weight Test Blind Box Hack" across 18 TikTok toy creator accounts.',
    timestamp: '14 mins ago',
    status: 'success'
  },
  {
    id: 'log-2',
    accountId: 'pip-quackers',
    agentId: 'agent-script-writer',
    agentName: 'Script Writer',
    action: 'Drafted 3 hook options',
    detail: 'Generated full 24s script for "Ultrasonic Squeaker Frequency Test" using character bible catchphrases.',
    timestamp: '38 mins ago',
    status: 'success'
  },
  {
    id: 'log-3',
    accountId: 'mara-vale',
    agentId: 'agent-visual-director',
    agentName: 'Visual Director',
    action: 'Enforced locked prompt',
    detail: 'Verified character identity match on 4K render for "Forensic Superglue Authentication" with 98.4% consistency score.',
    timestamp: '1 hour ago',
    status: 'success'
  },
  {
    id: 'log-4',
    accountId: 'pip-quackers',
    agentId: 'agent-voice-lipsync',
    agentName: 'Voice and Lip Sync',
    action: 'Audio balance warning',
    detail: 'Water splash ASMR peaked at +2dB above dialogue in "Hydro-Dipping Giant Duck". Tagged for human review.',
    timestamp: '2 hours ago',
    status: 'warning'
  },
  {
    id: 'log-5',
    accountId: 'mara-vale',
    agentId: 'agent-publisher',
    agentName: 'Publisher Agent',
    action: 'Enforced approval gate',
    detail: 'Blocked scheduled dispatch for "Bearbrick Culture Critique" pending human editorial sign-off.',
    timestamp: '3 hours ago',
    status: 'success'
  },
  {
    id: 'log-6',
    accountId: 'pip-quackers',
    agentId: 'agent-performance-analyst',
    agentName: 'Performance Analyst',
    action: 'Identified hook correlation',
    detail: 'Calculated 2.3x retention lift when digital scales are visible in seconds 0:00–0:02.',
    timestamp: '5 hours ago',
    status: 'success'
  }
];

export const SEED_INTEGRATIONS: IntegrationStatus[] = [
  {
    id: 'int-gemini',
    name: 'Gemini 3.8 Flash',
    category: 'LLM & Reasoning Engine',
    status: 'connected',
    tier: 'Enterprise API',
    iconName: 'Sparkles',
    description: 'Powers persona generation, multi-hook scripts, trend intelligence, and analytics learning loop.'
  },
  {
    id: 'int-image',
    name: 'Flux 1.1 Pro / Midjourney v6.1',
    category: 'Consistent Character Imagery',
    status: 'connected',
    tier: 'Custom LoRA Pipeline',
    iconName: 'Image',
    description: 'Renders locked character faces, multi-angle reference sheets, and high-fidelity video starting frames.'
  },
  {
    id: 'int-video',
    name: 'Veo 3.1 / Kling 1.5 / Runway Gen-3',
    category: 'Video Generation & Diffusion',
    status: 'connected',
    tier: 'High-Res Vertical 1080p',
    iconName: 'Video',
    description: 'Generates 9:16 vertical short-form video clips with character physics and camera motion.'
  },
  {
    id: 'int-voice',
    name: 'ElevenLabs Voice Engine',
    category: 'Voice Cloning & TTS',
    status: 'connected',
    tier: 'Custom Persona Clones',
    iconName: 'Mic',
    description: 'Synthesizes custom character vocal timbres, cadence, energetic pacing, and emotional inflection.'
  },
  {
    id: 'int-lipsync',
    name: 'Hedra Character-2 / HeyGen 3.0',
    category: 'Lip Sync & Performance Sync',
    status: 'connected',
    tier: 'Sub-frame Acoustic Alignment',
    iconName: 'Smile',
    description: 'Transfers audio phonemes to 3D character avatars and virtual humans with zero uncanny valley drift.'
  },
  {
    id: 'int-n8n',
    name: 'n8n Workflow Automation',
    category: 'Orchestration Engine',
    status: 'connected',
    tier: 'Self-Hosted Cloud Node',
    iconName: 'Cpu',
    description: 'Executes automated agent triggers, scheduled webhooks, and connects staging databases.'
  },
  {
    id: 'int-tiktok',
    name: 'TikTok Creator API',
    category: 'Social Publishing & Metrics',
    status: 'configured',
    tier: 'Direct Video Push v2',
    iconName: 'Share2',
    description: 'Publishes 9:16 shorts, manages creator tags, and ingests real-time video analytics every hour.'
  },
  {
    id: 'int-instagram',
    name: 'Instagram Graph API',
    category: 'Social Publishing & Metrics',
    status: 'configured',
    tier: 'Reels Publishing v21.0',
    iconName: 'Instagram',
    description: 'Direct dispatch to Instagram Reels, auto-carousels, and story drop announcements.'
  }
];
