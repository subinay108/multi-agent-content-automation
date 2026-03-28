from deep_translator import GoogleTranslator

# Map full language names to ISO 639-1 codes for Google Translate
LANG_MAP = {
    'english': 'en',
    'spanish': 'es',
    'french': 'fr',
    'german': 'de',
    'portuguese': 'pt',
    'hindi': 'hi',
    'japanese': 'ja',
    'chinese': 'zh-CN',
    'tagalog': 'tl',
    'arabic': 'ar',
    'russian': 'ru',
}

async def localization_agent(draft_content: str, target_language: str) -> str:
    """
    Translates draft content to the target language using Google Translate.
    Chunks content to avoid the 5000-character limit.
    """
    try:
        if not draft_content:
            return ""

        # Normalize language name to code
        target_lang = target_language.lower()
        lang_code = LANG_MAP.get(target_lang, target_lang)
        
        # Don't translate if already in English (or same target)
        if lang_code == 'en' or lang_code == 'english':
            return draft_content

        translator = GoogleTranslator(source='auto', target=lang_code)
        
        # Split content into chunks of 4500 characters to be safe (limit is 5000)
        chunk_size = 4500
        chunks = [draft_content[i:i + chunk_size] for i in range(0, len(draft_content), chunk_size)]
        
        translated_chunks = []
        for chunk in chunks:
            translated_chunks.append(translator.translate(chunk))
            
        return "".join(translated_chunks)
        
    except Exception as e:
        print(f"Translation error: {e}")
        return draft_content
