from datetime import date

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database.session import get_db

from ai_agent.agent import graph

from models.interaction import Interaction

from services.interaction_service import get_interactions
from services.llm_service import summarize_interaction


router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    text = request.message.lower()

    if "search" in text or "history" in text:

        interactions = get_interactions(db)

        return interactions

    state = {

        "message": request.message,

        "tool": None,

        "response": None

    }

    result = graph.invoke(state)

    return result["response"]


@router.post("/save-chat")
def save_chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    ai = summarize_interaction(request.message)

    interaction = Interaction(

        doctor_name=ai.get("doctor_name", "Unknown"),

        hospital=ai.get("hospital", ""),

        specialization=ai.get("specialization", ""),

        interaction_date=date.today(),

        products_discussed=ai.get("products_discussed", ""),

        notes=request.message,

        summary=ai.get("summary", ""),

        sentiment=ai.get("sentiment", ""),

        follow_up=ai.get("follow_up", "")

    )

    db.add(interaction)

    db.commit()

    db.refresh(interaction)

    return {
        "id": interaction.id,
        "doctor_name": interaction.doctor_name,
        "hospital": interaction.hospital,
        "specialization": interaction.specialization,
        "interaction_date": str(interaction.interaction_date),
        "products_discussed": interaction.products_discussed,
        "notes": interaction.notes,
        "summary": interaction.summary,
        "sentiment": interaction.sentiment,
        "follow_up": interaction.follow_up,
        "created_at": interaction.created_at.isoformat() if interaction.created_at else None
    }