import ReactMarkdown from 'react-markdown';
import StatusBadge from '../StatusBadge';

export function OutputCard({ label, content, status, isOutput }) {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2.5 bg-paper2 border-b border-border">
        <span className="font-mono text-[0.65rem] font-medium tracking-[0.1em] uppercase text-muted">
          {label}
        </span>
        {isOutput && status === 'completed' && (
          <span className="tag text-status-green border-status-green/20">✓ Complete</span>
        )}
        {isOutput && ['running', 'in_progress'].includes(status) && (
          <span className="tag" style={{ color: 'var(--yellow)', borderColor: 'rgba(184,122,16,0.3)' }}>
            ⟳ Processing
          </span>
        )}
      </div>
      <div className="p-4 font-sans text-[0.85rem] text-ink leading-relaxed prose prose-sm max-w-none min-h-[80px]">
        {content ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <span className="text-status-gray italic font-mono text-[0.78rem]">
            {status === 'running' && isOutput
              ? 'Generating output… Please wait.'
              : status === 'pending'
              ? 'Waiting for upstream agents to complete.'
              : 'No content yet.'}
          </span>
        )}
      </div>
    </div>
  );
}

export default function OutputViewer({ activeAgent }) {
  return (
    <main className="overflow-y-auto bg-paper p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-sans font-bold text-[1rem] text-ink tracking-tight">
            {activeAgent.name || 'Select an Agent'}
          </h2>
          <p className="font-mono text-[0.68rem] text-muted mt-0.5">
            {activeAgent.status === 'running'   && 'Agent currently processing…'}
            {activeAgent.status === 'completed' && 'Processing complete'}
            {activeAgent.status === 'pending'   && 'Waiting for upstream agents'}
          </p>
        </div>
        <StatusBadge status={activeAgent.status || 'pending'} />
      </div>

      {['running', 'in_progress'].includes(activeAgent.status) && (
        <div className="h-0.5 bg-gradient-to-r from-accent to-accent2 rounded running-bar mb-4" />
      )}

      <OutputCard label="Input" content={activeAgent.input} status={activeAgent.status} />
      <OutputCard label="Output" content={activeAgent.output} status={activeAgent.status} isOutput />
    </main>
  );
}
