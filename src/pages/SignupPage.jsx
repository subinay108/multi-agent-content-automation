import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthBrand from '../components/AuthBrand'
import Spinner from '../components/Spinner'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')

    const { data, error: err } = await signup(name, email, password)

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    // Supabase may require email confirmation depending on project settings
    if (data?.user && !data?.session) {
      setSuccess('Check your email to confirm your account, then sign in.')
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-ink">
      <AuthBrand />

      <div className="flex items-center justify-center p-8 bg-paper">
        <div className="w-full max-w-md fade-in">
          <h2 className="font-sans font-bold text-[1.7rem] text-ink tracking-tight mb-1">
            Create account
          </h2>
          <p className="font-mono text-[0.78rem] text-muted mb-8">
            Start automating your content workflow
          </p>

          {error && (
            <div className="bg-status-red/10 border border-status-red/20 text-status-red
                            rounded-md px-3.5 py-2.5 font-mono text-[0.75rem] mb-5">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-status-green/10 border border-status-green/20 text-status-green
                            rounded-md px-3.5 py-2.5 font-mono text-[0.75rem] mb-5">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Jane Smith"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
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
                placeholder="min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn-primary mt-2" disabled={loading}>
              {loading ? <><Spinner />&nbsp;Creating account…</> : 'Create Account →'}
            </button>
          </form>

          <p className="text-center font-mono text-[0.78rem] text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
