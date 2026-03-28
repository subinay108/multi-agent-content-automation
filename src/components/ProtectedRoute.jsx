import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <Spinner size={24} color="var(--accent)" />
          <p className="font-mono text-xs text-muted mt-3">Restoring session…</p>
        </div>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
