from fastapi import APIRouter, BackgroundTasks, HTTPException, Request
from models.schemas import WorkflowStartRequest, WorkflowStartResponse, WorkflowDetailResponse
from services.supabase import create_workflow, fetch_workflow, fetch_workflow_steps, fetch_workflow_logs, update_step_status
from orchestrator.pipeline import run_pipeline

router = APIRouter()

def get_user_id(request: Request) -> str:
    # MVP: Read from headers if present, else use an anonymous ID.
    # In production, extract user_id from Supabase JWT Authorization header.
    return request.headers.get("x-user-id", "anon-user-123")

@router.post("/start", response_model=WorkflowStartResponse)
async def start_workflow(req: WorkflowStartRequest, request: Request, background_tasks: BackgroundTasks):
    user_id = get_user_id(request)
    
    input_data = req.model_dump()
    workflow_id = create_workflow(user_id, input_data)
    
    # Run the pipeline sequentially in the background
    background_tasks.add_task(run_pipeline, workflow_id, input_data)
    
    return WorkflowStartResponse(workflow_id=workflow_id)

@router.get("/{workflow_id}")
async def get_workflow(workflow_id: str):
    wf_res = fetch_workflow(workflow_id)
    if not wf_res.data:
        raise HTTPException(status_code=404, detail="Workflow not found")
        
    steps_res = fetch_workflow_steps(workflow_id)
    logs_res = fetch_workflow_logs(workflow_id)
    
    wf_data = wf_res.data[0]
    wf_data["steps"] = steps_res.data
    wf_data["logs"] = logs_res.data
    
    return wf_data

@router.post("/{workflow_id}/step/{step_id}/approve")
async def approve_step(workflow_id: str, step_id: str):
    update_step_status(step_id, "approved")
    return {"message": "Step approved"}

@router.post("/{workflow_id}/step/{step_id}/reject")
async def reject_step(workflow_id: str, step_id: str):
    update_step_status(step_id, "rejected")
    return {"message": "Step rejected"}

@router.post("/{workflow_id}/step/{step_id}/rerun")
async def rerun_step(workflow_id: str, step_id: str):
    update_step_status(step_id, "pending")
    return {"message": "Step marked for rerun. (Rerun functionality pending full implementation)"}
