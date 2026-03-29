# Multi-Agent Content Automation System (Backend)

This is the **FastAPI** backend for the Multi-Agent Content Automation System. It orchestrates complex AI agent workflows, leveraging multiple specialized agents to generate, localize, and publish content.

---

## 🛠️ Prerequisites

- **Python**: v3.13 or higher
- **Package Manager**: [uv](https://github.com/astral-sh/uv) (recommended) or `pip`
- **Supabase**: Access to a Supabase project for data persistence

---

## 🚀 Setup & Installation

### 1. Clone & Navigate

```bash
cd backend
```

### 2. Set up Virtual Environment

Using **uv** (recommended):
```bash
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

Using **pip**:
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

### 3. Install Dependencies

Using **uv**:
```bash
uv sync
```

Using **pip**:
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key

LLM_BASE_URL=your_llm_base_url
LLM_API_KEY=your_llm_api_key
LLM_MODEL=your_llm_model

# Note: All the llm which are compatible with the openai library in python works here
# Example: 
# LLM_BASE_URL=https://api.groq.com/openai/v1
# LLM_API_KEY=your_groq_api_key
# LLM_MODEL=llama-3.1-8b-instant
```

---

## 🏃 Running the Server

Start the FastAPI server with auto-reload enabled:

```bash
uvicorn main:app --reload
```

The backend API will be available at [http://localhost:8000](http://localhost:8000).

- **Interactive API Docs**: View the Swagger UI at [http://localhost:8000/docs](http://localhost:8000/docs).
- **Alternative Docs**: View ReDoc at [http://localhost:8000/redoc](http://localhost:8000/redoc).

---

## 📁 Project Structure

```text
backend/
├── agents/             # Dedicated agent logic (Planner, Content, Localization, etc.)
├── models/             # Pydantic data models
├── orchestrator/       # Workflow execution and agent coordination
├── routes/             # FastAPI route definitions (e.g., /workflow)
├── services/           # External service integrations (Supabase, LLMs)
├── utils/              # Helper functions and utilities
├── main.py             # Application entry point
└── pyproject.toml      # Dependency management (uv)
```

---

## 🤖 Agent Workflow

The system uses a multi-agent architectural pattern where each agent has a specific role:
1. **Planner**: Breaks down the content request into actionable steps.
2. **Strategy**: Refines the approach based on goals.
3. **Content**: Generates the primary content.
4. **Localization**: Translates or adapts content for target regions.
5. **Compliance**: Checks content against guidelines.
6. **Publisher**: Formats and prepares final output.

---

## 🔗 Integration with Frontend

The backend provides the API endpoints that the React frontend calls to:
- Create and trigger new workflows.
- Monitor real-time status of agents.
- Retrieve historical workflow results.

> [!TIP]
> To set up the UI, refer to the [Frontend README](../README.md).

Make sure both the **frontend** and **backend** are running concurrently to ensure full functionality.
