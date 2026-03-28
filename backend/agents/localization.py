from services.llm import call_llm

async def localization_agent(compliance_draft: str, target_language: str) -> str:
    prompt = f"""
    Translate the following compliant content into: {target_language}.
    
    Content:
    {compliance_draft}
    
    Ensure cultural nuance and preserve the original tone and intent. Only return the translated text.
    """
    
    system_message = "You are an expert copywriter and translator."
    translated = await call_llm(prompt, system_message)
    return translated
