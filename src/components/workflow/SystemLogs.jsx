import { useState } from 'react';

export default function SystemLogs({ logRef, logs }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      ref={logRef}
      className={`bg-ink border-t border-white/10 overflow-y-auto px-5 pb-3 transition-all duration-300 relative ${isCollapsed ? 'h-10' : 'h-40'}`}
    >
      <div className="flex items-center justify-between sticky top-0 bg-ink py-1 mb-2">
        <p className="font-mono text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#a1a1aa] flex items-center gap-2">
          <span className="text-status-green pulse-dot">●</span> SYSTEM LOGS
          <span className="text-[#52525b] text-[0.58rem] font-medium tracking-normal border border-[#27272a] px-1 rounded">Live</span>
        </p>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#71717a] hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/5"
          title={isCollapsed ? "Expand Logs" : "Collapse Logs"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      {!isCollapsed && logs.map((log, i) => (
        <div key={i} className="flex gap-4 font-mono text-[0.71rem] leading-[1.75] border-b border-white/[0.02] py-0.5 last:border-0">
          <span className="text-[#52525b] shrink-0">{log.time}</span>
          <span className="text-status-green/90 shrink-0 font-bold">[{log.agent}]</span>
          <span className="text-[#d4d4d8]">{log.msg}</span>
        </div>
      ))}
    </div>
  );
}
