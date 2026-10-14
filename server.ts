import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client with required User-Agent
const apiKey = process.env.GEMINI_API_KEY || '';
const hasGeminiKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');

let ai: GoogleGenAI | null = null;
if (hasGeminiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check and AI status
app.get('/api/ai/status', (req, res) => {
  res.json({
    hasKey: hasGeminiKey,
    model: 'gemini-3.8-flash',
  });
});

// 1. Generate Persona with Gemini
app.post('/api/ai/generate-persona', async (req, res) => {
  const { concept, personaType } = req.body;
  if (!concept) {
    return res.status(400).json({ error: 'Concept prompt is required' });
  }

  const prompt = `You are an elite creative director at a high-end character collectibles studio.
Generate a complete character bible for an AI virtual influencer persona based on this concept:
"${concept}"
Persona Type preferred: ${personaType || 'Fictional Character / Collectible Mascot'}

Return a JSON object conforming exactly to this structure:
{
  "name": "Full Character Name",
  "handle": "@handle",
  "type": "Fictional Character" | "Virtual Human" | "AI-Assisted Creator",
  "niche": "Primary collectible niche (e.g. Designer vinyl toys, Art toys, Miniature figures)",
  "backstory": "2-3 compelling sentences of origin lore that fans love",
  "audience": "Core demographic description and psychographics",
  "traits": {
    "playfulness": 85, (0-100)
    "polish": 60, (0-100)
    "insiderKnowledge": 90, (0-100)
    "energyLevel": 80 (0-100)
  },
  "catchphrases": ["Catchphrase 1", "Catchphrase 2", "Catchphrase 3"],
  "topicsToOwn": ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
  "topicsToAvoid": ["Taboo 1", "Taboo 2", "Taboo 3"],
  "postingCadence": "e.g., 5x weekly TikToks + 2x weekend drops",
  "visualIdentity": {
    "colorPalette": ["#HEX1", "#HEX2", "#HEX3", "#HEX4"],
    "styleKeywords": ["Keyword1", "Keyword2", "Keyword3", "Keyword4"],
    "characterPrompt": "Exact photorealistic or stylized prompt instructions to maintain visual consistency across all renders. Include lighting, materials, texture, camera lens, and fixed character attributes."
  },
  "voiceIdentity": {
    "description": "Voice timbre, accent, vocal cadence, and audio personality",
    "pace": "Energetic & snappy (140 wpm)" or "Smooth & deliberate (115 wpm)",
    "sampleScript": "15-second opening intro script spoken in character",
    "elevenLabsVoiceId": "mock-voice-id-generator",
    "lipSyncProvider": "Hedra Character-2 / HeyGen Avatar 3.0"
  }
}`;

  if (!ai) {
    // Elegant fallback if no key set
    return res.json({
      fallback: true,
      data: {
        name: concept.slice(0, 20) + ' Quirk',
        handle: '@' + concept.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12),
        type: personaType || 'Fictional Character',
        niche: 'Collectible art toys, blind boxes, vinyl sculpting',
        backstory: `Born from a limited-run design prototype that gained consciousness in the studio kiln. Now unboxing rare editions and hunting holy grails.`,
        audience: 'Gen Z and Millennial art toy collectors, streetwear enthusiasts, and indie sculptors aged 18-34.',
        traits: { playfulness: 88, polish: 65, insiderKnowledge: 92, energyLevel: 85 },
        catchphrases: ['Keep your beak sharp!', 'Holy grail unboxed!', 'Drop alarm activated.'],
        topicsToOwn: ['Blind box odd-ratio hunting', 'Vinyl patina comparisons', 'Underground artisan sculptors', 'Mint-in-box care'],
        topicsToAvoid: ['Mass-market cheap bootlegs', 'Speculative price gouging', 'Boring static display talk'],
        postingCadence: '5x short-form reels + 2x live drop reactions',
        visualIdentity: {
          colorPalette: ['#FFC83D', '#FF8A65', '#2B2D42', '#8D99AE'],
          styleKeywords: ['Matte vinyl finish', 'Soft studio lighting', 'Micro-fiber tabletop', 'Macro 50mm lens'],
          characterPrompt: `High fidelity stylized collectible character, custom soft matte resin finish, signature oversized expressive eyes, miniature embroidered jacket, warm directional 3-point photography lighting, shallow depth of field.`
        },
        voiceIdentity: {
          description: 'Sprightly, slightly raspy alto with quick comedic timing and warm vinyl-record undertones.',
          pace: 'Brisk & rhythmic (142 wpm)',
          sampleScript: 'Stop scrolling! We just got the crate from Tokyo, and if this is the secret chase variant, my feathers are going to detach. Let’s slice the tape.',
          elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM',
          lipSyncProvider: 'Hedra Character-2 (Fast L16)'
        }
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ data: parsed });
  } catch (err: any) {
    console.error('Persona generation error:', err);
    return res.status(500).json({ error: err.message || 'Generation failed' });
  }
});

// 2. Research Trends with Gemini
app.post('/api/ai/research-trends', async (req, res) => {
  const { personaName, niche, audience, tone, platformFocus } = req.body;

  const prompt = `You are a viral trend intelligence agent for short-form video (${platformFocus || 'TikTok & Instagram Reels'}).
The virtual influencer is "${personaName || 'Our Character'}" in the "${niche || 'Collectible Toys'}" niche.
Tone: ${tone || 'Playful and curious'}. Audience: ${audience || 'Toy collectors & enthusiasts'}.

Identify 4 viral, high-potential trend radar topics right now that fit this niche and tone.
Return JSON in this format:
{
  "trends": [
    {
      "topic": "Catchy short title of trend",
      "platform": "TikTok" | "Instagram Reels",
      "momentum": "rising" | "peaking" | "fading",
      "momentumScore": 92, (number 50-99)
      "category": "Format Trend" | "Audio Meme" | "Niche Culture" | "Community Challenge",
      "description": "1-2 sentences on what this trend is and why it's blowing up",
      "exampleHooks": [
        "First 2-second visual/verbal hook",
        "Alternative hook with cliffhanger",
        "High-retention controversial question hook"
      ],
      "suggestedFormat": "talking head" | "skit" | "unboxing" | "POV" | "slideshow",
      "recommendedSound": "Audio trend style or BPM note"
    }
  ]
}`;

  if (!ai) {
    return res.json({
      fallback: true,
      trends: [
        {
          topic: 'The "Weight Test" Blind Box Hack',
          platform: 'TikTok',
          momentum: 'rising',
          momentumScore: 94,
          category: 'Format Trend',
          description: 'Collectors bring digital jewelry scales into toy stores to detect secret chase figures by exact gram weight.',
          exampleHooks: [
            'Do NOT buy another blind box until you hear this weight trick.',
            'Testing if 42.6 grams actually guarantees the rare golden duck...',
            'The store clerk asked why I brought a scale. Here is what happened.'
          ],
          suggestedFormat: 'unboxing',
          recommendedSound: 'ASMR scale clicking + upbeat lo-fi drop'
        },
        {
          topic: 'POV: You Left Your Vinyl Figure in Direct Sunlight',
          platform: 'Instagram Reels',
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
          topic: 'Custom Patina Speed-Paint Challenge',
          platform: 'TikTok',
          momentum: 'rising',
          momentumScore: 91,
          category: 'Community Challenge',
          description: 'Taking common base ducklings or vinyl molds and airbrushing them with iridescent or cyber-rust textures in 60 seconds.',
          exampleHooks: [
            'Turning a $5 dollar-store duck into an $800 gallery centerpiece.',
            'My followers told me to paint this duck in holographic chrome...',
            'This one mistake almost melted the vinyl mold.'
          ],
          suggestedFormat: 'skit',
          recommendedSound: 'Hyperpop synth beat with spray can sound FX'
        },
        {
          topic: 'Secret Vault Unboxing: 2018 Archive Grail',
          platform: 'Instagram Reels',
          momentum: 'peaking',
          momentumScore: 87,
          category: 'Format Trend',
          description: 'Opening an original sealed first-edition archive collectible with white cotton gloves and forensic inspection.',
          exampleHooks: [
            'There are only 25 of these left sealed in the world.',
            'The tape on this box has not been cut in six years.',
            'Is this the rarest toy in my entire vault?'
          ],
          suggestedFormat: 'unboxing',
          recommendedSound: 'Deep ambient sub-bass drone with crisp cardboard slicing audio'
        }
      ]
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Trend research error:', err);
    return res.status(500).json({ error: err.message || 'Trend research failed' });
  }
});

// 3. Content Engine Generation with Gemini
app.post('/api/ai/generate-content', async (req, res) => {
  const { persona, knowledgeBase, topic, format, trendContext } = req.body;

  const kbSnippet = Array.isArray(knowledgeBase)
    ? knowledgeBase.slice(0, 5).map((k: any) => `- ${k.title}: ${k.content}`).join('\n')
    : 'No extra knowledge base entries.';

  const prompt = `You are the lead AI Script Writer and Creative Director for the virtual influencer:
NAME: ${persona.name}
NICHE: ${persona.niche}
TONE: Playfulness ${persona.traits?.playfulness || 80}%, Polish ${persona.traits?.polish || 60}%, Insider ${persona.traits?.insiderKnowledge || 85}%
CATCHPHRASES: ${(persona.catchphrases || []).join(', ')}
LOCKED CHARACTER VISUAL PROMPT: "${persona.visualIdentity?.characterPrompt || 'Stylized collectible character'}"

BRAND KNOWLEDGE BASE:
${kbSnippet}

TASK: Generate a complete viral short-form video package (${persona.platformFocus || 'TikTok/Reels'}).
TOPIC: ${topic}
FORMAT: ${format || 'unboxing'}
${trendContext ? `INSPIRED BY TREND: ${trendContext}` : ''}

Output JSON format strictly conforming to:
{
  "title": "Working title of video",
  "hookOptions": [
    {
      "type": "Curiosity Gap",
      "spokenText": "Spoken opening line (first 2.5 seconds)",
      "visualAction": "What the viewer sees on screen during this hook"
    },
    {
      "type": "Contrarian / Hot Take",
      "spokenText": "Bold contrarian opening line",
      "visualAction": "High energy visual action"
    },
    {
      "type": "Urgent Cliffhanger",
      "spokenText": "FOMO or urgency hook",
      "visualAction": "Dynamic prop or box reveal action"
    }
  ],
  "script": [
    {
      "time": "0:00 - 0:03",
      "shot": "Tight close-up of hands / paws holding sealed packaging",
      "dialogue": "Selected hook line spoken with trademark energy",
      "onScreenText": "BOLD 3-WORD HOOK"
    },
    {
      "time": "0:03 - 0:12",
      "shot": "Mid-shot: Character unboxing or pointing out key sculpt details",
      "dialogue": "Detailed body section citing insider collector lore",
      "onScreenText": "KEY COLLECTOR SPEC"
    },
    {
      "time": "0:12 - 0:24",
      "shot": "Macro 360-degree rotation of figure highlighting paint finish and rare markings",
      "dialogue": "Climax revelation: weighing the piece or revealing the chase emblem",
      "onScreenText": "CHASE EMBLEM FOUND?"
    },
    {
      "time": "0:24 - 0:30",
      "shot": "Character addressing camera directly with signature wave or duck pose",
      "dialogue": "Call to action asking community a specific question to drive comment velocity",
      "onScreenText": "COMMENT YOUR GRAIL"
    }
  ],
  "caption": "Complete engaging caption formatted with linebreaks and CTA",
  "hashtags": ["#collectibles", "#arttoys", "#blindbox", "#ducklingstudio", "#designerart"],
  "soundStyle": "Description of the soundscape, BPM, audio stems, and vocal mix",
  "visualPrompt": "Comprehensive AI video/image generator prompt incorporating the locked character traits: '${persona.visualIdentity?.characterPrompt || ''}' and setting the scene with cinematic lighting and 9:16 vertical composition.",
  "assignedAgent": "Script Writer Agent + Visual Director Agent",
  "targetDurationSeconds": 28
}`;

  if (!ai) {
    return res.json({
      fallback: true,
      content: {
        title: `${topic} — ${persona.name} Mastercut`,
        hookOptions: [
          {
            type: "Curiosity Gap",
            spokenText: "I was told nobody ever pulls the 1-in-72 chase from this batch. They lied.",
            visualAction: "Rapid-fire close up of golden tape peeling in slow motion with lens flare."
          },
          {
            type: "Contrarian / Hot Take",
            spokenText: "Stop buying common retail drops when the archive editions are still at retail.",
            visualAction: "Character dramatically sliding away three generic boxes to reveal the heavy foil pouch."
          },
          {
            type: "Urgent Cliffhanger",
            spokenText: "Wait, do you see this micro-stamp on the base? That means only one thing.",
            visualAction: "Macro microscope view of the duckling underside showing laser numbered serial."
          }
        ],
        script: [
          {
            time: "0:00 - 0:03",
            shot: "Close up on yellow beak with neon reflection as sealed foil crinkles.",
            dialogue: "I was told nobody ever pulls the 1-in-72 chase from this batch. They lied.",
            onScreenText: "1 IN 72 CHASE?!"
          },
          {
            time: "0:03 - 0:11",
            shot: "Medium split screen: character inspecting weight while citing batch production numbers.",
            dialogue: "Look at the matte sheen on this beak. If you know the 2024 mold lineage, that seam line is nonexistent.",
            onScreenText: "FLAWLESS MATTE COAT"
          },
          {
            time: "0:11 - 0:22",
            shot: "Slow-motion turn showing custom iridescent feather detailing under studio keylight.",
            dialogue: "And right here on the heel—the stamped silver foil crest. We officially landed the holy grail of drop three.",
            onScreenText: "HOLY GRAIL CONFIRMED"
          },
          {
            time: "0:22 - 0:28",
            shot: "Character looking straight into camera holding figure proudly, playful head tilt.",
            dialogue: "Drop your current favorite in the comments—are you team Rubber Yellow or Cyber Iridescent?",
            onScreenText: "YELLOW OR CYBER?"
          }
        ],
        caption: `We went hunting and the toy gods answered today 🦆✨ Never sleeping on sealed batch #04 again. The paint fidelity on this limited sculpt is absurd.\n\nWhich finish would you keep on your shelf? Let me know in the comments! 👇`,
        hashtags: ["#DucklingStudio", "#PipQuackers", "#ArtToys", "#VinylFigure", "#BlindBoxOpening", "#GrailToy"],
        soundStyle: "Punchy lo-fi hip hop beat (118 BPM) with ASMR plastic crinkles and vinyl scratch accent",
        visualPrompt: `${persona.visualIdentity?.characterPrompt || 'Stylized collectible character'}, filming a vertical 9:16 TikTok video, holding a sleek rare collectible figure, shallow depth of field, warm 5500K studio keylight, soft bokeh background with shelves of colorful art toys, cinematic 4k render.`,
        assignedAgent: "Script Writer Agent",
        targetDurationSeconds: 28
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ content: parsed });
  } catch (err: any) {
    console.error('Content generation error:', err);
    return res.status(500).json({ error: err.message || 'Content generation failed' });
  }
});

// 4. Regenerate a single section of content
app.post('/api/ai/regenerate-section', async (req, res) => {
  const { section, currentContent, persona, instructions } = req.body;

  const prompt = `You are fine-tuning a short-form video package for "${persona.name}".
SECTION TO REGENERATE: ${section}
ADDITIONAL USER INSTRUCTIONS: ${instructions || 'Make it sharper, higher retention, and more authentic to the character tone.'}
EXISTING CONTENT CONTEXT:
${JSON.stringify(currentContent, null, 2)}

Provide ONLY the regenerated content for the section "${section}". Return valid JSON matching the format for this section:
If section is "hooks": return {"hookOptions": [{"type": "...", "spokenText": "...", "visualAction": "..."}]}
If section is "script": return {"script": [{"time": "...", "shot": "...", "dialogue": "...", "onScreenText": "..."}]}
If section is "caption": return {"caption": "...", "hashtags": ["#..."]}
If section is "visualPrompt": return {"visualPrompt": "..."}`;

  if (!ai) {
    if (section === 'caption') {
      return res.json({
        caption: `Unboxing the impossible pull! 🏆 This mold hasn't seen daylight since the private Tokyo pop-up. Rate this sculpt 1 to 10 below!`,
        hashtags: ['#ToyCollector', '#BlindBox', '#VaultDrop', '#VinylArt']
      });
    }
    if (section === 'visualPrompt') {
      return res.json({
        visualPrompt: `${persona.visualIdentity?.characterPrompt || 'Character'}, holding a glowing rare collectible in high contrast studio rim lighting, 9:16 portrait ratio, film grain, hyper-detailed textures.`
      });
    }
    return res.json({
      hookOptions: [
        { type: "Hyper-Retention", spokenText: "The moment I touched the packaging, I knew.", visualAction: "Extreme close-up of tape splitting." }
      ]
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.75,
      },
    });
    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 5. Generate Analytics Insights & Actionable Strategy with Gemini
app.post('/api/ai/generate-insights', async (req, res) => {
  const { persona, postsSummary, metrics } = req.body;

  const prompt = `You are the Chief AI Growth Strategist at Duckling Studio.
Analyze the performance data for virtual influencer "${persona.name}" (${persona.niche}, ${persona.platformFocus}).
KEY METRICS:
Followers: ${metrics?.followers || '84,200'}
7-Day Views: ${metrics?.views7d || '1,420,000'}
Avg Engagement Rate: ${metrics?.engagementRate || '6.8%'}
Top formats: Unboxing (8.4% ER), Skits (5.9% ER), Talking Head (4.2% ER).
Recent posts data summary:
${JSON.stringify(postsSummary || [], null, 2)}

Provide exactly 5 concrete, actionable, high-conviction growth recommendations based on the analytics.
Each insight must have a specific strategy that can be saved into the character's Knowledge Base.

Return JSON in this format:
{
  "insights": [
    {
      "id": "rec-1",
      "title": "Clear concise headline",
      "impact": "High" | "Medium",
      "metricObserved": "e.g., Unboxing videos have 2.3x higher watch-to-end rate than talk head",
      "recommendation": "Specific 2-sentence tactical change for next week's production pipeline",
      "kbStrategyTitle": "Knowledge Base rule name (e.g., 'Retention Rule: 3-Second Scale Check')",
      "kbStrategyContent": "The detailed strategic guideline text ready to be injected into future script writer prompts."
    }
  ]
}`;

  if (!ai) {
    return res.json({
      fallback: true,
      insights: [
        {
          id: 'rec-1',
          title: 'Weight-Verification Hooks Double 3-Second Retention',
          impact: 'High',
          metricObserved: 'Videos opening with digital scales achieved 74% 3-sec retention vs 42% average.',
          recommendation: 'Mandate digital scale readings in the first 2 seconds of all blind box unboxings. Pair with mechanical click audio.',
          kbStrategyTitle: 'Hook Rule: Scale-First Opening',
          kbStrategyContent: 'Always show the figure on the digital scale within the first 1.5 seconds before dialogue begins to create immediate mystery around chase weight variance.'
        },
        {
          id: 'rec-2',
          title: 'Macro Paint Inspection Drives 3.1x Saves',
          impact: 'High',
          metricObserved: 'Reels with 4K macro shots of paint seams generated 3,400+ bookmark saves.',
          recommendation: 'Incorporate at least one 4-second continuous macro turntable shot showing vinyl sheen and mold seams.',
          kbStrategyTitle: 'Visual Rule: Macro Turntable Shot',
          kbStrategyContent: 'Every showcase script must dedicate 4 seconds to an ultra-close macro sweep of the sculpt textures to feed collector scrutiny and bookmarking.'
        },
        {
          id: 'rec-3',
          title: 'Mid-Tier Skits Underperform Without Prop Reveal',
          impact: 'Medium',
          metricObserved: 'Skits without physical unboxing props drop 38% retention by second 8.',
          recommendation: 'Eliminate pure talking-head comedy. Always give the character an actual collectible prop to handle physically.',
          kbStrategyTitle: 'Content Format: Always Hold Collectibles',
          kbStrategyContent: 'Virtual human or character should never speak with empty hands. Hold at least one packaging element or limited edition accessory.'
        },
        {
          id: 'rec-4',
          title: 'Sunday 6 PM Drops Outperform Weekday Midday by 44%',
          impact: 'High',
          metricObserved: 'Peak collector activity occurs Sunday 17:00-20:00 EST during live drops.',
          recommendation: 'Shift primary viral hero posts from Tuesday mornings to Sunday 18:00 EST schedule.',
          kbStrategyTitle: 'Scheduling Rule: Sunday Prime Drop Window',
          kbStrategyContent: 'Deploy top tier chase unboxings on Sundays between 5:30 PM and 7:00 PM EST to align with domestic collector drop releases.'
        },
        {
          id: 'rec-5',
          title: 'Direct Lore Questions Drive 85% More Comments',
          impact: 'Medium',
          metricObserved: 'CTAs asking "Yellow or Cyber?" received 4x more replies than generic "Follow for more".',
          recommendation: 'Close all videos with a binary choice question comparing two distinct colorways or editions.',
          kbStrategyTitle: 'CTA Guideline: Binary Colorway Debates',
          kbStrategyContent: 'Outros must always force a binary aesthetic debate (e.g., Matte vs Gloss, OG vs Chase) to fuel algorithmic comment velocity.'
        }
      ]
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.65,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Insights generation error:', err);
    return res.status(500).json({ error: err.message || 'Insights failed' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Duckling Studio server listening on port ${PORT}`);
  });
}

startServer();
