from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.session import get_db
from schemas.interaction import InteractionCreate
from services.interaction_service import (
    create_interaction,
    get_interactions,
    get_interaction,
    update_interaction,
    delete_interaction,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


@router.post("/")
def add_interaction(
    data: InteractionCreate,
    db: Session = Depends(get_db)
):
    return create_interaction(db, data)


@router.get("/")
def get_all(
    db: Session = Depends(get_db)
):
    return get_interactions(db)


@router.get("/{interaction_id}")
def get_one(
    interaction_id: int,
    db: Session = Depends(get_db)
):

    interaction = get_interaction(
        db,
        interaction_id
    )

    if interaction is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return interaction


@router.put("/{interaction_id}")
def update(
    interaction_id: int,
    data: InteractionCreate,
    db: Session = Depends(get_db)
):

    interaction = update_interaction(
        db,
        interaction_id,
        data
    )

    if interaction is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return interaction


@router.delete("/{interaction_id}")
def delete(
    interaction_id: int,
    db: Session = Depends(get_db)
):

    success = delete_interaction(
        db,
        interaction_id
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return {
        "message": "Interaction deleted successfully"
    }