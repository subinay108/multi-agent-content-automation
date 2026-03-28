import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import StatusBadge from '../components/StatusBadge'
import { api } from '../lib/api'

function getIconForAgent(name) {
  const n = (name || '').toLowerCase()
  if (n.includes('plan')) return '🧠'
  if (n.includes('research')) return '🔍'
  if (n.includes('writ') || n.includes('draft')) return '✍️'
  if (n.includes('edit') || n.includes('review') || n.includes('complian')) return '✨'
  return '🤖'
}

export default function WorkflowPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [selectedId,  setSelectedId]  = useState(null)
  const [workflow,    setWorkflow]    = useState(null)
  const [agents,      setAgents]      = useState([])
  const [logs,        setLogs]        = useState([])
  const [approved,    setApproved]    = useState(null)
  const [editText,    setEditText]    = useState('')
  const logRef = useRef(null)

  const wf = workflow || {}
  const activeAgent = agents.find(a => a.id === selectedId) || agents[0] || {}

  useEffect(() => {
    let timeoutId;
    async function fetchData() {
      try {
        const data = await api.getWorkflow(id)
        if (!data) return
        setWorkflow(data)
        
        const mappedAgents = (data.steps || []).map(step => ({
          id: step.id,
          name: step.agent_name,
          status: step.status,
          input: step.input,
          output: step.output,
          icon: getIconForAgent(step.agent_name)
        }))
        setAgents(mappedAgents)
        
        setSelectedId(prev => {
           if (prev && mappedAgents.find(a => a.id === prev)) return prev;
           return mappedAgents.length > 0 ? mappedAgents[0].id : null;
        })
        
        const formattedLogs = (data.logs || []).map(l => {
            const time = new Date(l.timestamp).toLocaleTimeString([], { hour12: false })
            return { time, agent: l.agent_name || 'System', msg: l.message }
        })
        setLogs(formattedLogs)
        
        const isRunning = data.status === 'in_progress' || mappedAgents.some(a => ['running', 'pending', 'in_progress'].includes(a.status));
        if (isRunning) {
          timeoutId = setTimeout(fetchData, 3000)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
    return () => clearTimeout(timeoutId)
  }, [id])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  const handleApprove = async () => {
    if (!activeAgent.id) return
    try {
      await api.approveStep(id, activeAgent.id)
      setApproved('approved')
    } catch(err) {}
  }

  const handleReject = async () => {
    if (!activeAgent.id) return
    try {
      await api.rejectStep(id, activeAgent.id)
      setApproved('rejected')
    } catch(err) {}
  }

  const handleOverride = () => {
    if (!editText.trim()) return
    setEditText('')
  }

  const runningCount   = agents.filter(a => ['running', 'in_progress'].includes(a.status)).length
  const completedCount = agents.filter(a => a.status === 'completed').length

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-paper">
      <TopBar />

      {/* Workflow sub-header */}
      <div className="bg-white border-b border-border px-6 py-3 flex items-center justify-between gap-4 flex-wrap shrink-0">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="font-mono text-[0.72rem] text-muted bg-transparent border-none
                       cursor-pointer hover:text-ink transition-colors block mb-1"
          >
            ← Dashboard
          </button>
          <div className="flex items-center gap-3">
            <span className="font-sans font-semibold text-[0.95rem] text-ink">
              {wf?.title ?? 'Workflow'}
            </span>
            <StatusBadge status="running" />
          </div>
          <p className="font-mono text-[0.67rem] text-muted mt-0.5">
            ID: {id} · Started 12m ago · {wf?.type ?? 'Blog'} · {wf?.audience ?? 'General'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="h-1 bg-gradient-to-r from-accent to-accent2 rounded-full running-bar"
            style={{ width: 100 }}
          />
          <span className="font-mono text-[0.7rem] text-muted">
            {completedCount}/{agents.length} agents
          </span>
        </div>
      </div>

      {/* 3-panel layout + log */}
      <div className="flex-1 grid overflow-hidden" style={{ gridTemplateRows: '1fr 150px' }}>
        <div className="grid overflow-hidden" style={{ gridTemplateColumns: '220px 1fr 230px' }}>

          {/* ── LEFT: Agent Timeline ───────────────────────── */}
          <aside className="bg-ink border-r border-white/5 overflow-y-auto flex flex-col">
            <div className="p-4 shrink-0">
              <p className="panel-heading">Agent Pipeline</p>
              <div className="space-y-1">
                {agents.map((agent, i) => (
                  <div key={agent.id}>
                    <AgentItem
                      agent={agent}
                      active={selectedId === agent.id}
                      onClick={() => setSelectedId(agent.id)}
                    />
                    {i < agents.length - 1 && (
                      <div className="w-px h-3 bg-white/5 ml-[19px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── CENTER: Output Viewer ─────────────────────── */}
          <main className="overflow-y-auto bg-paper p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-sans font-bold text-[1rem] text-ink tracking-tight">
                  {activeAgent.name}
                </h2>
                <p className="font-mono text-[0.68rem] text-muted mt-0.5">
                  {activeAgent.status === 'running'   && 'Agent currently processing…'}
                  {activeAgent.status === 'completed' && 'Processing complete'}
                  {activeAgent.status === 'pending'   && 'Waiting for upstream agents'}
                </p>
              </div>
              <StatusBadge status={activeAgent.status} />
            </div>

            {activeAgent.status === 'running' && (
              <div className="h-0.5 bg-gradient-to-r from-accent to-accent2 rounded running-bar mb-4" />
            )}

            <OutputCard label="Input" content={activeAgent.input} status={activeAgent.status} />
            <OutputCard label="Output" content={activeAgent.output} status={activeAgent.status} isOutput />
          </main>

          {/* ── RIGHT: Controls ───────────────────────────── */}
          <aside className="bg-paper2 border-l border-border overflow-y-auto p-4">
            <p className="panel-heading" style={{ color: 'var(--muted)' }}>Review Controls</p>

            {approved === 'approved' && (
              <div className="bg-status-green/10 border border-status-green/20 text-status-green
                              rounded-md px-3 py-2 font-mono text-[0.72rem] mb-4">
                ✓ Output approved
              </div>
            )}
            {approved === 'rejected' && (
              <div className="bg-status-red/10 border border-status-red/20 text-status-red
                              rounded-md px-3 py-2 font-mono text-[0.72rem] mb-4">
                ✕ Output rejected
              </div>
            )}

            <button
              className="btn-approve"
              onClick={handleApprove}
              disabled={!activeAgent.output || approved === 'approved'}
            >
              ✓ Approve Output
            </button>
            <button
              className="btn-reject"
              onClick={handleReject}
              disabled={!activeAgent.output || approved === 'rejected'}
            >
              ✕ Reject Output
            </button>

            <div className="border-t border-border my-4" />

            <div className="mb-3">
              <label className="form-label">Edit / Override</label>
              <textarea
                className="form-textarea"
                rows={5}
                placeholder="Paste edited content or override instructions…"
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
            </div>
            <button
              className="btn-ghost w-full text-center text-[0.73rem]"
              disabled={!editText.trim()}
              onClick={handleOverride}
            >
              Submit Override →
            </button>

            <div className="border-t border-border my-4" />

            <p className="panel-heading" style={{ color: 'var(--muted)' }}>Stats</p>
            {[
              ['Agents Done',   `${completedCount} / ${agents.length}`],
              ['Est. Remaining','~4 min'],
              ['Content Type',  wf?.type    ?? '—'],
              ['Language',      'English'],
              ['Audience',      wf?.audience ?? '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between mb-2">
                <span className="font-mono text-[0.7rem] text-muted">{k}</span>
                <span className="font-mono text-[0.7rem] text-ink font-medium capitalize">{v}</span>
              </div>
            ))}
          </aside>
        </div>

        {/* ── BOTTOM: Log Panel ─────────────────────────── */}
        <div
          ref={logRef}
          className="bg-ink border-t border-white/5 overflow-y-auto px-5 py-3"
        >
          <p className="font-mono text-[0.62rem] font-medium tracking-[0.12em] uppercase
                        text-[#3a3a4a] mb-2 flex items-center gap-2 sticky top-0 bg-ink py-1">
            <span className="text-status-green">●</span> SYSTEM LOGS
            <span className="text-[#2e2e3a] text-[0.58rem]">Live</span>
          </p>
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 font-mono text-[0.71rem] leading-[1.75]">
              <span className="text-[#2e2e3a] shrink-0">{log.time}</span>
              <span className="text-status-green shrink-0">[{log.agent}]</span>
              <span className="text-[#7a8a7a]">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ───────────────────────────────────────── */

function AgentItem({ agent, active, onClick }) {
  const iconBg = {
    completed: 'bg-status-green/15',
    running:   'bg-status-yellow/15',
    pending:   'bg-white/5',
  }[agent.status]

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                  border transition-colors duration-150 cursor-pointer
                  bg-transparent
                  ${active
                    ? 'bg-white/5 border-white/10'
                    : 'border-transparent hover:bg-white/5'}`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${iconBg}`}>
        {agent.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-sans font-semibold text-[0.78rem] text-paper tracking-tight">
          {agent.name}
        </div>
        <div className={`font-mono text-[0.62rem] uppercase tracking-wide
          ${agent.status === 'completed' ? 'text-status-green' :
            agent.status === 'running'   ? 'text-gold' :
                                           'text-[#4a4a58]'}`}>
          {agent.status}
        </div>
      </div>
      {agent.status === 'completed' && (
        <span className="text-status-green text-[0.7rem]">✓</span>
      )}
      {agent.status === 'running' && (
        <span
          className="inline-block w-3.5 h-3.5 rounded-full border-2 border-[#2a2a35] spin"
          style={{ borderTopColor: 'var(--gold)' }}
        />
      )}
    </button>
  )
}

function OutputCard({ label, content, status, isOutput }) {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2.5 bg-paper2 border-b border-border">
        <span className="font-mono text-[0.65rem] font-medium tracking-[0.1em] uppercase text-muted">
          {label}
        </span>
        {isOutput && status === 'completed' && (
          <span className="tag text-status-green border-status-green/20">✓ Complete</span>
        )}
        {isOutput && status === 'running' && (
          <span className="tag" style={{ color: 'var(--yellow)', borderColor: 'rgba(184,122,16,0.3)' }}>
            ⟳ Processing
          </span>
        )}
      </div>
      <div className="p-4 font-mono text-[0.78rem] text-ink leading-relaxed whitespace-pre-wrap min-h-[80px]">
        {content ? (
          content
        ) : (
          <span className="text-status-gray italic">
            {status === 'running' && isOutput
              ? 'Generating output… Please wait.'
              : status === 'pending'
              ? 'Waiting for upstream agents to complete.'
              : 'No content yet.'}
          </span>
        )}
      </div>
    </div>
  )
}
