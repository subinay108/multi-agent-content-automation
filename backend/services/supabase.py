import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://xyzcompany.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "public-anon-key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def create_workflow(user_id: str, input_data: dict) -> str:
    response = supabase.table("workflows").insert({
        "user_id": user_id,
        "input": input_data.get("input", ""),
        "type": input_data.get("type", "blog"),
        "audience": input_data.get("audience", "general"),
        "tone": input_data.get("tone", "professional"),
        "status": "in_progress"
    }).execute()
    return response.data[0]["id"]

def update_workflow_status(workflow_id: str, status: str):
    supabase.table("workflows").update({"status": status}).eq("id", workflow_id).execute()

def insert_workflow_step(workflow_id: str, agent_name: str, step_input: str, step_output: str, status: str = "completed") -> str:
    response = supabase.table("workflow_steps").insert({
        "workflow_id": workflow_id,
        "agent_name": agent_name,
        "input": step_input,
        "output": step_output,
        "status": status
    }).execute()
    return response.data[0]["id"]

def update_step_status(step_id: str, status: str):
    supabase.table("workflow_steps").update({"status": status}).eq("id", step_id).execute()

def fetch_workflow(workflow_id: str):
    return supabase.table("workflows").select("*").eq("id", workflow_id).execute()

def fetch_workflow_steps(workflow_id: str):
    return supabase.table("workflow_steps").select("*").eq("workflow_id", workflow_id).order("created_at").execute()

def fetch_workflow_logs(workflow_id: str):
    return supabase.table("logs").select("*").eq("workflow_id", workflow_id).order("timestamp").execute()
