from services.llm import call_llm

async def compliance_agent(draft: str) -> str:
    prompt = f"""
    Review the following content draft for compliance, safety, and brand alignment.
    Fix any inappropriate tone, biased language, or policy-violating statements.
    
    Draft:
    {draft}
    
    Provide the corrected and polished content below without any meta-commentary.
    """
    
    system_message = "You are a strict compliance and policy reviewer."
    compliant_draft = await call_llm(prompt, system_message)
    return compliant_draft
