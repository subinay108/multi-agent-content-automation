import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TABS = [
  { label: 'Dashboard',    path: '/dashboard' },
  { label: 'New Workflow', path: '/create' },
  { label: 'Profile',      path: '/profile' },
]

export default function TopBar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Main bar */}
      <div className="h-13 bg-ink border-b border-white/5 flex items-center justify-between px-6 pt-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="font-sans font-extrabold text-sm tracking-[0.12em] uppercase text-paper
                     flex items-center gap-2 bg-transparent border-none cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          MACAS
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.7rem] text-muted hidden sm:block">
            {user?.email}
          </span>
          <button className="btn-ghost py-1.5 px-3 text-[0.7rem]" onClick={() => navigate('/profile')}>
            Profile
          </button>
          <button className="btn-danger py-1.5 px-3 text-[0.7rem]" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="flex gap-0.5 px-6 bg-ink border-b border-white/5">
        {TABS.map(tab => {
          const active = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`font-mono text-[0.73rem] px-4 py-2.5 border-b-2 transition-colors duration-150
                          bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer tracking-wide
                          ${active
                            ? 'text-accent border-b-accent'
                            : 'text-[#818192] border-b-transparent hover:text-paper'}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
