import os
import json

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = os.getenv(
    "GROQ_MODEL",
    "llama-3.1-8b-instant"
)
def chat_with_ai(message: str):

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """
You are AIVOA AI, an AI Assistant for a Healthcare CRM.

Your job is to help Medical Representatives log interactions with Healthcare Professionals (HCPs).

You should:
- Talk professionally.
- Ask follow-up questions if information is missing.
- Help capture:
  • Doctor Name
  • Hospital
  • Specialization
  • Products Discussed
  • Interaction Summary
  • Sentiment
  • Follow-up

Never answer like a generic chatbot.
Always guide the user toward recording a healthcare interaction.
"""
            },
            {
                "role": "user",
                "content": message
            }
        ]
    )

    return completion.choices[0].message.content

def summarize_interaction(notes: str):

    prompt = f"""
You are an AI assistant for a Healthcare CRM.

Analyze the interaction below.

Extract all important information.

Return ONLY valid JSON.

{{
    "doctor_name":"",
    "hospital":"",
    "specialization":"",
    "products_discussed":"",
    "summary":"",
    "sentiment":"",
    "follow_up":""
}}

Interaction:

{notes}

Rules:

- Return only JSON.
- Do not return markdown.
- If any field is missing, return an empty string.
"""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

    try:
        return json.loads(content)

    except Exception:

        return {
            "summary": content,
            "sentiment": "Neutral",
            "follow_up": "No recommendation"
        }