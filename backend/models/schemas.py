from pydantic import BaseModel, Field
from typing import List, Optional, Any
from datetime import datetime

class WorkflowStartRequest(BaseModel):
    input: str
    content_type: str = Field(alias="type")
    audience: str
    tone: str
    language: str
    
    class Config:
        populate_by_name = True

class WorkflowStartResponse(BaseModel):
    workflow_id: str

class StepLogResponse(BaseModel):
    id: str
    message: str
    timestamp: datetime

class WorkflowStepResponse(BaseModel):
    id: str
    agent_name: str
    input: Optional[str] = None
    output: Optional[str] = None
    status: str
    created_at: datetime

class WorkflowDetailResponse(BaseModel):
    id: str
    user_id: str
    input: str
    status: str
    created_at: datetime
    steps: List[WorkflowStepResponse]
    logs: List[StepLogResponse]
