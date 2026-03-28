import StatusBadge from '../StatusBadge';

export default function WorkflowHeader({ wf, id, agents, completedCount, navigate }) {
  return (
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
          <StatusBadge status={wf?.status || 'running'} />
        </div>
        <p className="font-mono text-[0.67rem] text-muted mt-0.5">
          ID: {id} · Started {wf?.created_at ? new Date(wf.created_at).toLocaleString() : '—'} · {wf?.type ?? 'Blog'}
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
  );
}
