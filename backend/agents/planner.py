from services.llm import call_llm
import json

async def planner_agent(input_data: dict) -> str:
    prompt = f"""
    Create a detailed, structured content plan based on the following:
    Raw Input: {input_data.get('input')}
    Content Type: {input_data.get('content_type')}
    Target Audience: {input_data.get('audience')}
    Tone: {input_data.get('tone')}
    Language: {input_data.get('language')}

    Output a clean, highly structured plan with sections for the main objectives, an outline of the content, and key takeaways.
    """
    
    system_message = "You are an expert content planner. Output the plan clearly without any markdown boilerplate (e.g., skip ```), or just use normal markdown structure."
    plan = await call_llm(prompt, system_message)
    return plan
