from sqlalchemy.orm import Session
from services.llm_service import summarize_interaction, chat_with_ai
from services.llm_service import summarize_interaction
from services.interaction_service import (
    get_interactions,
    get_interaction,
    update_interaction,
)

def chat_tool(message: str):
    return {
        "tool": "Chat",
        "response": chat_with_ai(message)
    }
def log_interaction_tool(message: str):

    ai = summarize_interaction(message)

    return {
        "tool": "Log Interaction",
        "result": ai
    }


def summarize_tool(message: str):

    ai = summarize_interaction(message)

    return {
        "tool": "Summarize",
        "result": ai
    }


def followup_tool(message: str):

    ai = summarize_interaction(message)

    return {
        "tool": "Follow Up",
        "result": ai
    }


def search_tool(db: Session):

    interactions = get_interactions(db)

    result = []

    for interaction in interactions:

        result.append(
            {
                "id": interaction.id,
                "doctor_name": interaction.doctor_name,
                "hospital": interaction.hospital,
                "summary": interaction.summary,
                "follow_up": interaction.follow_up,
                "date": interaction.interaction_date
            }
        )

    return {
        "tool": "Search",
        "result": result
    }

def edit_interaction_tool(
    db: Session,
    interaction_id: int,
    data
):

    interaction = update_interaction(
        db,
        interaction_id,
        data
    )

    return {
        "tool": "Edit",
        "result": interaction
    }