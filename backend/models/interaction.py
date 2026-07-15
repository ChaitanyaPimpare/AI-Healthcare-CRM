from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Date
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from database.base import Base


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    doctor_name = Column(String(120), nullable=False)

    hospital = Column(String(120))

    specialization = Column(String(120))

    interaction_date = Column(Date)

    products_discussed = Column(Text)

    notes = Column(Text)

    summary = Column(Text)

    sentiment = Column(String(30))

    follow_up = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )