# Python FastAPI Service

This is the Python API service powered by FastAPI and Uvicorn. It is configured to auto-reload upon file changes when running inside the Docker container.

## Local Dev Setup
Uvicorn is started with the `--reload` flag, watching for any changes to Python files.

- **Gateway URL**: `/api/python/` (proxied via gateway on `http://localhost:8080/api/python/`)
- **API Documentation**: Interactive documentation (Swagger UI) is available at `/api/python/docs`
- **Container Port**: Runs internally on port `8000`

## Endpoints
- `GET /api/python/health` - Checks PostgreSQL database connectivity and reports server details.
- `GET /api/python/projects` - Returns mock portfolio projects showing JSON data delivery.
