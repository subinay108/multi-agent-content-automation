from services.llm import call_llm

async def strategy_agent(localized_content: str, platform: str) -> str:
    prompt = f"""
    Based on the following localized content, provide a complete strategy package:
    1. A catchy headline appropriate for {platform}.
    2. Relevant hashtags.
    3. A brief platform-specific suggestion for publishing.
    
    Content:
    {localized_content}
    
    Output format:
    Headline: ...
    Hashtags: ...
    Platform Suggestions: ...
    
    [Include full original content below the strategy stuff, formatted well.]
    """
    
    system_message = "You are an expert social media and content strategist."
    strategy = await call_llm(prompt, system_message)
    return strategy
