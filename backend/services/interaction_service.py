from sqlalchemy.orm import Session

from models.interaction import Interaction

from services.llm_service import summarize_interaction


def create_interaction(
    db: Session,
    data
):

    ai = summarize_interaction(
        data.notes
    )

    interaction = Interaction(

        doctor_name=data.doctor_name,

        hospital=data.hospital,

        specialization=data.specialization,

        interaction_date=data.interaction_date,

        products_discussed=data.products_discussed,

        notes=data.notes,

        summary=ai.get("summary"),

        sentiment=ai.get("sentiment"),

        follow_up=ai.get("follow_up")
    )

    db.add(interaction)

    db.commit()

    db.refresh(interaction)

    return interaction


def get_interactions(db: Session):

    return db.query(
        Interaction
    ).order_by(
        Interaction.id.desc()
    ).all()


def get_interaction(
    db: Session,
    interaction_id: int
):

    return db.query(
        Interaction
    ).filter(
        Interaction.id == interaction_id
    ).first()


def update_interaction(
    db: Session,
    interaction_id: int,
    data
):

    interaction = db.query(
        Interaction
    ).filter(
        Interaction.id == interaction_id
    ).first()

    if interaction is None:
        return None

    interaction.doctor_name = data.doctor_name
    interaction.hospital = data.hospital
    interaction.specialization = data.specialization
    interaction.interaction_date = data.interaction_date
    interaction.products_discussed = data.products_discussed
    interaction.notes = data.notes

    ai = summarize_interaction(
        data.notes
    )

    interaction.summary = ai.get("summary")
    interaction.sentiment = ai.get("sentiment")
    interaction.follow_up = ai.get("follow_up")

    db.commit()

    db.refresh(interaction)

    return interaction


def delete_interaction(
    db: Session,
    interaction_id: int
):

    interaction = db.query(
        Interaction
    ).filter(
        Interaction.id == interaction_id
    ).first()

    if interaction is None:
        return False

    db.delete(interaction)

    db.commit()

    return True