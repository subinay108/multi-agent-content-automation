export function AgentItem({ agent, active, onClick }) {
    const iconBg = {
      completed: 'bg-status-green/15',
      running:   'bg-status-yellow/15',
      in_progress: 'bg-status-yellow/15',
      pending:   'bg-white/5',
    }[agent.status] || 'bg-white/5';
  
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
              (['running', 'in_progress'].includes(agent.status)) ? 'text-gold' :
                                             'text-[#4a4a58]'}`}>
            {agent.status}
          </div>
        </div>
        {agent.status === 'completed' && (
          <span className="text-status-green text-[0.7rem]">✓</span>
        )}
        {['running', 'in_progress'].includes(agent.status) && (
          <span
            className="inline-block w-3.5 h-3.5 rounded-full border-2 border-[#2a2a35] spin"
            style={{ borderTopColor: 'var(--gold)' }}
          />
        )}
      </button>
    );
  }
  
  export default function AgentPipeline({ agents, selectedId, setSelectedId }) {
    return (
      <aside className="bg-ink border-r border-white/5 overflow-y-auto flex flex-col">
        <div className="p-4 shrink-0">
          <p className="panel-heading text-[#4a4a58] text-[0.62rem] uppercase font-bold tracking-[0.12em] mb-4">Agent Pipeline</p>
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
    );
  }
