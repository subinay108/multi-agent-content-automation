import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = AsyncOpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=OPENAI_API_KEY
)

async def call_llm(prompt: str, system_message: str = "You are a helpful assistant.") -> str:
    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
