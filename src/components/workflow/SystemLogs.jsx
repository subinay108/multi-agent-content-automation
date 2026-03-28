export default function SystemLogs({ logRef, logs }) {
    return (
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
    );
  }
