# AI First Healthcare CRM

## Overview

This project is an AI-powered Healthcare CRM built as part of the AIVOA.AI assignment.

The application allows Medical Representatives to record Healthcare Professional (HCP) interactions using AI. It automatically extracts structured information, generates summaries, detects sentiment, and recommends follow-up actions.

---

# Features

## Dashboard

- Total Interactions
- Today's Meetings
- Pending Follow-ups
- Recent Interactions

## AI Assistant

- AI Chat
- AI-powered interaction analysis
- Summary generation
- Sentiment analysis
- Follow-up generation

## Interaction Management

- Log HCP interactions
- AI-assisted extraction
- View interaction history
- Search interactions

---

# Technology Stack

## Frontend

- React
- Vite
- Material UI
- Redux Toolkit
- Axios
- React Router

## Backend

- FastAPI
- PostgreSQL
- SQLAlchemy
- LangGraph
- Groq LLM

---

# Project Structure

backend/
frontend/

---

# Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

POST /agent/chat

POST /agent/save-chat

GET /interactions

POST /interactions

PUT /interactions/{id}

DELETE /interactions/{id}

---

# AI Workflow

User

↓

React Frontend

↓

FastAPI

↓

LangGraph

↓

Groq LLM

↓

Structured Response

↓

PostgreSQL

---

# Future Improvements

- Authentication
- Role Based Access
- Calendar Integration
- Analytics Dashboard

---

# Author

Chaitanya Pimpare
