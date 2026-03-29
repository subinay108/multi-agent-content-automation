import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

LLM_BASE_URL = os.getenv("LLM_BASE_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

client = AsyncOpenAI(
    base_url=LLM_BASE_URL,
    api_key=LLM_API_KEY
)

async def call_llm(prompt: str, system_message: str = "You are a helpful assistant.") -> str:
    response = await client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
