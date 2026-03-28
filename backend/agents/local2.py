from services.llm import call_llm

# Map common names to full language names for better LLM prompting
LANG_MAP = {
    'hi': 'Hindi',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'pt': 'Portuguese',
    'ja': 'Japanese',
    'zh-CN': 'Chinese (Simplified)',
    'en': 'English'
}

async def localization_agent(draft_content: str, target_language: str) -> str:
    """
    Translates English draft content to the target language using Llama-3.1 via Groq.
    This replaces the unreliable Google Translate web wrapper.
    """
    try:
        if not draft_content:
            return ""

        # Normalize language name
        full_lang = LANG_MAP.get(target_language.lower(), target_language)
        
        # Don't translate if already in English
        if full_lang.lower() == 'english' or target_language.lower() == 'en':
            return draft_content

        prompt = f"""
        Translate the following content into: {full_lang}.
        
        RULES:
        1. Maintain the exact Markdown formatting (bolding, headers, lists).
        2. Keep technical terms or names in English where appropriate.
        3. Ensure the tone (professional/casual) is preserved.
        4. Return ONLY the translated text.
        
        CONTENT TO TRANSLATE:
        {draft_content}
        """
        
        system_message = f"You are a professional translator specializing in localizing content into {full_lang}."
        
        translated = await call_llm(prompt, system_message)
        return translated
        
    except Exception as e:
        print(f"Translation error: {e}")
        # Fallback to original content on failure
        return draft_content
