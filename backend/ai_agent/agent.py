from langgraph.graph import StateGraph, END

from ai_agent.state import AgentState
from ai_agent.nodes import detect_tool, execute_tool

builder = StateGraph(AgentState)

builder.add_node(
    "detect_tool",
    detect_tool
)

builder.add_node(
    "execute_tool",
    execute_tool
)

builder.set_entry_point(
    "detect_tool"
)

builder.add_edge(
    "detect_tool",
    "execute_tool"
)

builder.add_edge(
    "execute_tool",
    END
)

graph = builder.compile()