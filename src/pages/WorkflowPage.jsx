import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import WorkflowHeader from '../components/workflow/WorkflowHeader'
import AgentPipeline from '../components/workflow/AgentPipeline'
import OutputViewer from '../components/workflow/OutputViewer'
import ReviewControls from '../components/workflow/ReviewControls'
import SystemLogs from '../components/workflow/SystemLogs'
import { api } from '../lib/api'

function getIconForAgent(name) {
  const n = (name || '').toLowerCase()
  if (n.includes('plan')) return '🧠'
  if (n.includes('research')) return '🔍'
  if (n.includes('writ') || n.includes('draft')) return '✍️'
  if (n.includes('edit') || n.includes('review') || n.includes('complian')) return '✨'
  return '🤖'
}

export default function WorkflowPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [selectedId,  setSelectedId]  = useState(null)
  const [workflow,    setWorkflow]    = useState(null)
  const [agents,      setAgents]      = useState([])
  const [logs,        setLogs]        = useState([])
  const [approved,    setApproved]    = useState(null)
  const [editText,    setEditText]    = useState('')
  const logRef = useRef(null)

  const wf = workflow || {}
  const activeAgent = agents.find(a => a.id === selectedId) || agents[0] || {}

  useEffect(() => {
    let timeoutId;
    async function fetchData() {
      try {
        const data = await api.getWorkflow(id)
        if (!data) return
        setWorkflow(data)
        
        const mappedAgents = (data.steps || []).map(step => ({
          id: step.id,
          name: step.agent_name,
          status: step.status,
          input: step.input,
          output: step.output,
          icon: getIconForAgent(step.agent_name)
        }))
        setAgents(mappedAgents)
        
        setSelectedId(prev => {
           if (prev && mappedAgents.find(a => a.id === prev)) return prev;
           return mappedAgents.length > 0 ? mappedAgents[0].id : null;
        })
        
        const formattedLogs = (data.logs || []).map(l => {
            const time = new Date(l.timestamp).toLocaleTimeString([], { hour12: false })
            return { time, agent: l.agent_name || 'System', msg: l.message }
        })
        setLogs(formattedLogs)
        
        const isRunning = data.status === 'in_progress' || mappedAgents.some(a => ['running', 'pending', 'in_progress', 'scheduled'].includes(a.status));
        if (isRunning) {
          timeoutId = setTimeout(fetchData, 3000)
        }
      } catch (err) {
        console.error('Workflow poll error:', err)
      }
    }
    fetchData()
    return () => clearTimeout(timeoutId)
  }, [id])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  const handleApprove = async () => {
    if (!activeAgent.id) return
    try {
      await api.approveStep(id, activeAgent.id)
      setApproved('approved')
    } catch(err) {}
  }

  const handleReject = async () => {
    if (!activeAgent.id) return
    try {
      await api.rejectStep(id, activeAgent.id)
      setApproved('rejected')
    } catch(err) {}
  }

  const handleOverride = () => {
    if (!editText.trim()) return
    setEditText('')
  }

  const completedCount = agents.filter(a => a.status === 'completed').length

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-paper">
      <TopBar />

      <WorkflowHeader 
        wf={wf} 
        id={id} 
        agents={agents} 
        completedCount={completedCount} 
        navigate={navigate} 
      />

      <div className="flex-1 grid overflow-hidden" style={{ gridTemplateRows: '1fr auto' }}>
        <div className="grid overflow-hidden" style={{ gridTemplateColumns: '220px 1fr 230px' }}>
          
          <AgentPipeline 
            agents={agents} 
            selectedId={selectedId} 
            setSelectedId={setSelectedId} 
          />

          <OutputViewer activeAgent={activeAgent} />

          <ReviewControls 
            wf={wf}
            activeAgent={activeAgent}
            approved={approved}
            handleApprove={handleApprove}
            handleReject={handleReject}
            editText={editText}
            setEditText={setEditText}
            handleOverride={handleOverride}
            completedCount={completedCount}
            agentsLength={agents.length}
          />

        </div>

        <SystemLogs logRef={logRef} logs={logs} />
      </div>
    </div>
  )
}
