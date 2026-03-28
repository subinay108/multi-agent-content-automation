const MAP = {
  completed: 'badge-completed',
  running:   'badge-running',
  pending:   'badge-pending',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${MAP[status] ?? 'badge-pending'}`}>
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full bg-current ${
          status === 'running' ? 'pulse-dot' : ''
        }`}
      />
      {status}
    </span>
  )
}
