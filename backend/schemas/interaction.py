from datetime import date
from typing import Optional

from pydantic import BaseModel


class InteractionCreate(BaseModel):

    doctor_name: str

    hospital: str

    specialization: Optional[str] = None

    interaction_date: date

    products_discussed: Optional[str] = None

    notes: str


class InteractionResponse(BaseModel):

    id: int

    doctor_name: str

    hospital: str

    specialization: Optional[str]

    interaction_date: date

    products_discussed: Optional[str]

    notes: str

    summary: Optional[str]

    sentiment: Optional[str]

    follow_up: Optional[str]

    class Config:
        from_attributes = True