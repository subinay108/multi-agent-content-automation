from services.llm import call_llm

async def content_agent(plan: str) -> str:
    prompt = f"""
    Based on the following content plan, draft the comprehensive content.
    
    Content Plan:
    {plan}
    
    Ensure you follow the structure from the plan. DO NOT add headlines or hashtags yet, focus solely on the primary body content. Keep the tone as specified in the plan (if accessible) or just professional by default.
    """
    
    system_message = "You are an expert content writer."
    draft = await call_llm(prompt, system_message)
    return draft
