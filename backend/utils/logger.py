from services.supabase import supabase

def log_message(workflow_id: str, message: str):
    print(f"[{workflow_id}] {message}")
    try:
        supabase.table("logs").insert({
            "workflow_id": workflow_id,
            "message": message
        }).execute()
    except Exception as e:
        print(f"Failed to save log to DB: {e}")
