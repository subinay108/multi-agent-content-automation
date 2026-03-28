import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthBrand from '../components/AuthBrand'
import Spinner from '../components/Spinner'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    const { error: err } = await login(email, password)
    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-ink">
      <AuthBrand />

      {/* Form side */}
      <div className="flex items-center justify-center p-8 bg-paper">
        <div className="w-full max-w-md fade-in">
          <h2 className="font-sans font-bold text-[1.7rem] text-ink tracking-tight mb-1">
            Welcome back
          </h2>
          <p className="font-mono text-[0.78rem] text-muted mb-8">
            Sign in to your workspace
          </p>

          {error && (
            <div className="bg-status-red/10 border border-status-red/20 text-status-red
                            rounded-md px-3.5 py-2.5 font-mono text-[0.75rem] mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn-primary mt-2" disabled={loading}>
              {loading ? <><Spinner />&nbsp;Signing in…</> : 'Sign In →'}
            </button>
          </form>

          <p className="text-center font-mono text-[0.78rem] text-muted mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-accent hover:underline font-medium">
              Create one
            </Link>
          </p>

          <div className="border-t border-border mt-6 pt-4 text-center font-mono text-[0.68rem] text-muted">
            Demo: any valid email + password (6+ chars)
          </div>
        </div>
      </div>
    </div>
  )
}
