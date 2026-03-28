export default function ReviewControls({ 
    wf, 
    activeAgent, 
    approved, 
    handleApprove, 
    handleReject, 
    editText, 
    setEditText, 
    handleOverride,
    completedCount,
    agentsLength
  }) {
    return (
      <aside className="bg-paper2 border-l border-border overflow-y-auto p-4">
        <p className="panel-heading text-[#4a4a58] text-[0.62rem] uppercase font-bold tracking-[0.12em] mb-4">Review Controls</p>
  
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
          <label className="form-label text-[0.7rem] block mb-1">Edit / Override</label>
          <textarea
            className="form-textarea w-full p-2 text-sm border rounded"
            rows={5}
            placeholder="Paste edited content or override instructions…"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
        </div>
        <button
          className="btn-ghost w-full text-center text-[0.73rem] p-2 border border-dashed rounded hover:bg-white transition"
          disabled={!editText.trim()}
          onClick={handleOverride}
        >
          Submit Override →
        </button>
  
        <div className="border-t border-border my-4" />
  
        <p className="panel-heading text-[#4a4a58] text-[0.62rem] uppercase font-bold tracking-[0.12em] mb-4">Stats</p>
        {[
          ['Agents Done',   `${completedCount} / ${agentsLength}`],
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
    );
  }
