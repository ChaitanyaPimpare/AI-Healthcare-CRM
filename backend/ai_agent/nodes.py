from ai_agent.tools import (
    log_interaction_tool,
    edit_interaction_tool,
    summarize_tool,
    followup_tool,
    search_tool,
    chat_tool,
)


def detect_tool(state):

    message = state["message"].lower()

    if "edit" in message:
        state["tool"] = "edit"

    elif "search" in message or "history" in message:
        state["tool"] = "search"

    elif "summary" in message:
        state["tool"] = "summary"

    elif "follow" in message:
        state["tool"] = "followup"

    elif (
        "log" in message
        or "meeting" in message
        or "doctor" in message
        or "interaction" in message
    ):
        state["tool"] = "log"

    else:
        state["tool"] = "chat"

    return state


def execute_tool(state):

    tool = state["tool"]

    if tool == "log":
        state["response"] = log_interaction_tool(state["message"])

    elif tool == "edit":
        state["response"] = edit_interaction_tool(state["message"])

    elif tool == "summary":
        state["response"] = summarize_tool(state["message"])

    elif tool == "followup":
        state["response"] = followup_tool(state["message"])

    elif tool == "search":
        state["response"] = search_tool(state["message"])

    elif tool == "chat":
        state["response"] = chat_tool(state["message"])

    return state