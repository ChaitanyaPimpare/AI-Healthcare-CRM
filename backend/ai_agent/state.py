from typing import TypedDict, Optional


class AgentState(TypedDict):
    message: str
    tool: Optional[str]
    response: Optional[dict]