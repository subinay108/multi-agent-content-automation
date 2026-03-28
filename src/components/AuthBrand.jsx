const AGENTS = ['Planner', 'Content Generator', 'Compliance', 'Localization', 'Strategy', 'Publisher']

export default function AuthBrand() {
  return (
    <div className="hidden md:flex flex-col justify-between bg-ink border-r border-white/5 p-12 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(232,77,42,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(42,110,232,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Logo */}
      <div className="font-sans font-extrabold text-sm tracking-[0.15em] uppercase text-paper flex items-center gap-2 relative z-10">
        <span className="w-2 h-2 rounded-full bg-accent inline-block" />
        MACAS
      </div>

      {/* Headline */}
      <div className="relative z-10">
        <h1
          className="font-serif text-paper leading-[1.15]"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontStyle: 'italic' }}
        >
          Content at<br />the speed of<br />
          <span className="text-accent not-italic">agents.</span>
        </h1>
        <p className="font-mono text-[0.78rem] text-[#4a4a58] mt-5 leading-relaxed">
          Six specialized AI agents. One seamless workflow.<br />
          From brief to publish in minutes.
        </p>
      </div>

      {/* Agent pills */}
      <div className="flex flex-col gap-2 relative z-10">
        {AGENTS.map(agent => (
          <div
            key={agent}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/5
                       rounded-full font-mono text-[0.7rem] text-[#4a4a58] w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-status-green pulse-dot inline-block" />
            {agent}
          </div>
        ))}
      </div>
    </div>
  )
}
