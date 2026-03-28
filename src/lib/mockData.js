export const MOCK_WORKFLOWS = [
  {
    id: 'wf_001',
    title: 'Q3 Product Launch Blog Series',
    type: 'blog',
    status: 'completed',
    created: '2h ago',
    audience: 'Tech Professionals',
    tone: 'Professional',
  },
  {
    id: 'wf_002',
    title: 'Social Campaign — Summer Drop',
    type: 'social',
    status: 'running',
    created: '12m ago',
    audience: 'Gen Z',
    tone: 'Casual',
  },
  {
    id: 'wf_003',
    title: 'Onboarding Email Sequence v2',
    type: 'email',
    status: 'pending',
    created: 'just now',
    audience: 'New Users',
    tone: 'Friendly',
  },
]

export const MOCK_AGENTS = [
  {
    id: 'planner',
    name: 'Planner',
    icon: '🗺',
    status: 'completed',
    input: 'Blog post about Q3 product launch targeting tech professionals. Tone: Professional.',
    output:
      'Content Plan Created:\n1. Hook: Industry pain points\n2. Problem → Solution narrative\n3. Feature deep-dive (3 key features)\n4. Social proof section\n5. CTA with urgency\n\nTarget word count: 1200–1500 words\nSEO keywords: [product launch, Q3 innovation, enterprise solution]',
  },
  {
    id: 'content',
    name: 'Content Generator',
    icon: '✍',
    status: 'completed',
    input: 'Execute plan: Professional blog post, 1200–1500 words, SEO-optimized.',
    output:
      "# Q3 Innovation: Redefining What's Possible\n\nThe enterprise landscape is shifting. As teams demand more from their tools, the bar for what \"good enough\" means has risen dramatically…\n\n[Full draft generated — 1,342 words]\nReadability score: 72 (Flesch)\nSEO density: 2.1%",
  },
  {
    id: 'compliance',
    name: 'Compliance',
    icon: '🛡',
    status: 'running',
    input: 'Review draft for brand guidelines, legal compliance, and factual accuracy.',
    output: null,
  },
  { id: 'localization', name: 'Localization', icon: '🌐', status: 'pending', input: null, output: null },
  { id: 'strategy',     name: 'Strategy',     icon: '📊', status: 'pending', input: null, output: null },
  { id: 'publisher',    name: 'Publisher',     icon: '🚀', status: 'pending', input: null, output: null },
]

export const MOCK_LOGS = [
  { time: '14:02:01', agent: 'Planner',    msg: 'Analyzing content requirements and target audience' },
  { time: '14:02:04', agent: 'Planner',    msg: 'Content plan created — 5 sections outlined' },
  { time: '14:02:08', agent: 'Content',    msg: 'Initializing draft generation with GPT-4 backbone' },
  { time: '14:02:31', agent: 'Content',    msg: 'Draft complete — 1,342 words, SEO score 87/100' },
  { time: '14:02:33', agent: 'Compliance', msg: 'Starting brand guideline and legal review…' },
]
