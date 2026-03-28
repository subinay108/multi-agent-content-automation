import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

const CONTENT_TYPES = [
  { value: 'blog',       label: 'Blog Post' },
  { value: 'social',     label: 'Social Media' },
  { value: 'email',      label: 'Email Campaign' },
  { value: 'press',      label: 'Press Release' },
  { value: 'whitepaper', label: 'Whitepaper' },
]

const AUDIENCES = [
  { value: 'general',    label: 'General Public' },
  { value: 'tech',       label: 'Tech Professionals' },
  { value: 'executives', label: 'C-Suite / Executives' },
  { value: 'genz',       label: 'Gen Z' },
  { value: 'millennials',label: 'Millennials' },
  { value: 'smb',        label: 'Small Business Owners' },
]

const TONES = [
  { value: 'professional',  label: 'Professional' },
  { value: 'casual',        label: 'Casual' },
  { value: 'friendly',      label: 'Friendly' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'playful',       label: 'Playful' },
  { value: 'empathetic',    label: 'Empathetic' },
]

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese (Simplified)' },
]

export default function CreatePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [form, setForm] = useState({
    input:    '',
    type:     'blog',
    audience: 'general',
    tone:     'professional',
    language: 'en',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.input.trim()) { setError('Please enter a content brief.'); return }
    if (!user) { setError('User not authenticated.'); return }
    setError('')
    setLoading(true)

    try {
      const res = await api.startWorkflow(user.id, form)
      navigate(`/workflow/${res.workflow_id}`)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to start workflow')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <TopBar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 fade-in">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-muted
                     bg-transparent border-none cursor-pointer mb-6 hover:text-ink transition-colors"
        >
          ← Back to Dashboard
        </button>

        <h1 className="font-sans font-bold text-[1.6rem] text-ink tracking-tight mb-1">
          New Workflow
        </h1>
        <p className="font-mono text-[0.75rem] text-muted mb-8">
          Configure your content automation pipeline
        </p>

        {error && (
          <div className="bg-status-red/10 border border-status-red/20 text-status-red
                          rounded-md px-3.5 py-2.5 font-mono text-[0.75rem] mb-5">
            {error}
          </div>
        )}

        <div className="bg-white border border-border rounded-xl p-7 space-y-6">
          {/* Brief */}
          <div>
            <label className="form-label">Content Brief / Raw Input</label>
            <textarea
              className="form-textarea min-h-[130px]"
              placeholder="Describe what content you need. Be as specific as possible — topic, key points, audience, purpose, desired outcome…"
              value={form.input}
              onChange={set('input')}
              rows={6}
            />
          </div>

          <div className="border-t border-border" />

          {/* 2-col grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="form-label">Content Type</label>
              <select className="form-select" value={form.type} onChange={set('type')}>
                {CONTENT_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Target Audience</label>
              <select className="form-select" value={form.audience} onChange={set('audience')}>
                {AUDIENCES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Tone</label>
              <select className="form-select" value={form.tone} onChange={set('tone')}>
                {TONES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Output Language</label>
              <select className="form-select" value={form.language} onChange={set('language')}>
                {LANGUAGES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={loading || !form.input.trim()}
            >
              {loading ? <><Spinner />&nbsp;Starting workflow…</> : '⚡ Start Workflow'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
