import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import StatusBadge from '../components/StatusBadge'
import Spinner from '../components/Spinner'
import { useWorkflows } from '../hooks/useWorkflows'

export default function Dashboard() {
  const navigate = useNavigate()
  const { workflows, loading } = useWorkflows()

  const running   = workflows.filter(w => w.status === 'running').length
  const completed = workflows.filter(w => w.status === 'completed').length

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <TopBar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 fade-in">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
          <div>
            <h1 className="font-sans font-bold text-[1.8rem] text-ink tracking-tight">
              Workflows
            </h1>
            <p className="font-mono text-[0.75rem] text-muted mt-1">
              {workflows.length} total · {running} running · {completed} completed
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-md
                       font-sans font-semibold text-sm cursor-pointer border-none
                       hover:bg-[#d03f1f] transition-colors duration-150 whitespace-nowrap"
            onClick={() => navigate('/create')}
          >
            + New Workflow
          </button>
        </div>

        {/* Workflow list */}
        <p className="section-label">Recent Workflows</p>

        {loading ? (
          <div className="flex items-center gap-3 py-16 justify-center text-muted font-mono text-sm">
            <Spinner size={18} color="var(--muted)" /> Loading…
          </div>
        ) : workflows.length === 0 ? (
          <EmptyState onAction={() => navigate('/create')} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map(wf => (
              <WorkflowCard key={wf.id} workflow={wf} onClick={() => navigate(`/workflow/${wf.id}`)} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function WorkflowCard({ workflow, onClick }) {
  const { title, type, status, created, audience, tone } = workflow
  return (
    <div
      onClick={onClick}
      className="bg-white border border-border rounded-xl p-5 cursor-pointer
                 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent
                 hover:shadow-lg group relative overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-border group-hover:bg-accent transition-colors duration-200" />

      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-sans font-semibold text-[0.92rem] text-ink tracking-tight leading-snug">
          {title}
        </h3>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center gap-2 font-mono text-[0.7rem] text-muted mb-4">
        <span>{created}</span>
        <span>·</span>
        <span className="capitalize">{type}</span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <span className="tag">{audience}</span>
        <span className="tag">{tone}</span>
      </div>
    </div>
  )
}

function EmptyState({ onAction }) {
  return (
    <div className="text-center py-20 border-2 border-dashed border-border rounded-xl bg-white">
      <div className="text-4xl mb-4 opacity-30">⚡</div>
      <h3 className="font-sans font-semibold text-ink mb-1">No workflows yet</h3>
      <p className="font-mono text-[0.75rem] text-muted mb-6">
        Create your first workflow to get started
      </p>
      <button
        className="px-6 py-2.5 bg-accent text-white rounded-md font-sans font-semibold
                   text-sm border-none cursor-pointer hover:bg-[#d03f1f] transition-colors"
        onClick={onAction}
      >
        + New Workflow
      </button>
    </div>
  )
}
