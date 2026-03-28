import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export function useWorkflows() {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchWorkflows() {
      if (!user) {
        setWorkflows([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const { data, error: err } = await supabase
          .from('workflows')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (err) throw err
        setWorkflows(data || [])
      } catch (err) {
        console.error('Error fetching workflows:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflows()
  }, [user])

  return { workflows, loading, error }
}
