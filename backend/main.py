from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.base import Base
from database.config import engine

import models.interaction

from api.interaction import router as interaction_router
from api.agent import router as agent_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI CRM HCP API",
    version="1.0.0",
    description="AI First CRM Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)
app.include_router(agent_router)


@app.get("/")
def home():

    return {
        "status": "success",
        "message": "AI CRM Backend Running"
    }