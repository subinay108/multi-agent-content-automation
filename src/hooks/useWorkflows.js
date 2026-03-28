import { useState, useEffect } from 'react'
import { MOCK_WORKFLOWS } from '../lib/mockData'

/**
 * Hook to fetch workflows for the current user.
 * Currently returns mock data — wire to Supabase when your
 * `workflows` table is ready:
 *
 *   const { data, error } = await supabase
 *     .from('workflows')
 *     .select('*')
 *     .eq('user_id', user.id)
 *     .order('created_at', { ascending: false })
 */
export function useWorkflows() {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    // Simulate async fetch
    const timer = setTimeout(() => {
      setWorkflows(MOCK_WORKFLOWS)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return { workflows, loading, error }
}
