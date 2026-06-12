import os
import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

# We map FastAPI to OpenAPI documentation endpoints under the Gateway path
app = FastAPI(
    title="Portfolio Python API",
    description="FastAPI Service for Aman Kumar's Portfolio",
    version="1.0.0",
    docs_url="/api/python/docs",
    openapi_url="/api/python/openapi.json"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB configurations
DB_HOST = os.getenv("DB_HOST", "db")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_NAME = os.getenv("DB_NAME", "portfolio")
DB_PORT = os.getenv("DB_PORT", "5432")

def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        dbname=DB_NAME,
        port=DB_PORT,
        connect_timeout=3
    )

@app.middleware("http")
async def log_requests(request, call_next):
    print(f"[Python API] {request.method} {request.url.path}")
    response = await call_next(request)
    return response

# Health check route
@app.get("/api/python/health")
def health_check():
    db_connected = False
    db_version = "Unknown"
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT version();")
        db_version = cur.fetchone()[0]
        db_connected = True
        cur.close()
        conn.close()
    except Exception as e:
        print(f"[Python API Error] DB connection failed: {e}")

    return {
        "status": "healthy",
        "engine": "FastAPI (Python)",
        "database": db_connected,
        "db_version": db_version,
        "timestamp": time.time()
    }

# Mock portfolios route (demonstrating FastAPI routes)
@app.get("/api/python/projects")
def read_projects():
    return [
        {
            "id": 1,
            "title": "Machine Learning Image Classifier",
            "tech": "Python, FastAPI, PyTorch",
            "desc": "An image classification service wrapped with FastAPI and containerized."
        },
        {
            "id": 2,
            "title": "Agentic Trading Helper",
            "tech": "Python, LangChain, PostgreSQL",
            "desc": "An autonomous helper reading financial news feeds and analyzing sentiment."
        }
    ]

# Default fallback
@app.get("/api/python/{path:path}")
def fallback(path: str):
    raise HTTPException(status_code=404, detail=f"Python API path '/api/python/{path}' not found")
