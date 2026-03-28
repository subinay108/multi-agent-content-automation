from services.llm import call_llm

async def publisher_agent(strategy_content: str) -> str:
    prompt = f"""
    Perform the final formatting of the content below before it gets published.
    Ensure good spacing, legible layout, emojis where appropriate, and perfectly clean execution.
    
    Content + Strategy:
    {strategy_content}
    """
    
    system_message = "You are a professional publisher formatting the final deliverable."
    final_output = await call_llm(prompt, system_message)
    return final_output
