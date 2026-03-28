import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage    from './pages/LoginPage'
import SignupPage   from './pages/SignupPage'
import Dashboard    from './pages/Dashboard'
import CreatePage   from './pages/CreatePage'
import WorkflowPage from './pages/WorkflowPage'
import ProfilePage  from './pages/ProfilePage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard"      element={<Dashboard />} />
          <Route path="/create"         element={<CreatePage />} />
          <Route path="/workflow/:id"   element={<WorkflowPage />} />
          <Route path="/profile"        element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}
