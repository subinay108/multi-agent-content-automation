import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TopBar from '../components/TopBar'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const name    = user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? 'User'
  const initial = name[0].toUpperCase()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <TopBar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 fade-in">
        <h1 className="font-sans font-bold text-[1.6rem] text-ink tracking-tight mb-1">Profile</h1>
        <p className="font-mono text-[0.75rem] text-muted mb-8">Your account details</p>

        <div className="bg-white border border-border rounded-xl p-7 max-w-md">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center
                          font-sans font-bold text-xl text-paper mb-5">
            {initial}
          </div>

          <h2 className="font-sans font-bold text-[1.15rem] text-ink tracking-tight">{name}</h2>
          <p className="font-mono text-[0.78rem] text-muted mb-6">{user?.email}</p>

          <div className="border-t border-border mb-5" />

          {[
            ['User ID',      user?.id ? user.id.slice(0, 20) + '…' : '—'],
            ['Account Type', 'Pro'],
            ['Workflows',    '3'],
            ['Member Since', 'May 2025'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between mb-3">
              <span className="font-mono text-[0.75rem] text-muted">{k}</span>
              <span className="font-mono text-[0.75rem] text-ink">{v}</span>
            </div>
          ))}

          <div className="border-t border-border mt-5 mb-5" />

          <button
            className="btn-danger w-full py-2.5 text-sm"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </main>
    </div>
  )
}
