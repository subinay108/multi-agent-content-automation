from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import workflow

app = FastAPI(title="Multi-Agent Content Automation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workflow.router, prefix="/workflow", tags=["Workflow"])

@app.get("/")
def root():
    return {"message": "Backend API is running. Check /docs for Swagger UI."}
