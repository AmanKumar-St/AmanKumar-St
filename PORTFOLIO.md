# Portfolio Multi-Stack Developer Workspace

Welcome to your containerized portfolio development environment! This workspace is structured as a modular, multi-service monorepo that runs entirely inside Docker with network isolation and unified routing. You can develop, test, and deploy multiple tech stacks simultaneously without configuration headaches.

## Table of Contents

- [Workspace Architecture](#workspace-architecture)
- [Service Port Map](#service-port-map)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Guide](#development-guide)
- [Database Management](#database-management)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Adding New Tech Stacks](#adding-new-tech-stacks)

---

## Workspace Architecture

All your client and API requests are routed through a single **Nginx Gateway Proxy** on port `8080`. This centralized proxy routes incoming traffic to the appropriate container, preventing CORS issues and simplifying your development workflow.

```mermaid
graph TD
    User([Your Browser]) -->|Port 8080| Gateway[Nginx Gateway Proxy]
    Gateway -->|/| Landing[HTML Landing Page]
    Gateway -->|/react/| ReactApp[React Vite Frontend]
    Gateway -->|/api/node/| NodeAPI[Node.js Express API]
    Gateway -->|/api/python/| PythonAPI[Python FastAPI API]
    
    NodeAPI -->|pg Pool| DB[(PostgreSQL Database)]
    PythonAPI -->|psycopg2| DB
```

---

## Service Port Map

| Public URL Path | Host Port | Container Port | Technology Stack | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`http://localhost:8080/`** | `8080` | `80` | Nginx (Alpine) | Your gateway proxy & landing page |
| **`http://localhost:8080/react/`** | `8080` | `5173` | React 18 & Vite | Your frontend dashboard with live reload |
| **`http://localhost:8080/api/node/`** | `8080` | `5000` | Node.js & Express | Your Node backend for database operations |
| **`http://localhost:8080/api/python/`** | `8080` | `8000` | Python 3.12 & FastAPI | Your Python backend for data logic |
| *Internal Only* | — | `5432` | PostgreSQL 16 | Your relational database |

---

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Docker Desktop** (v24.0+) – [Download here](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (v2.0+) – Usually included with Docker Desktop
- **Git** – For cloning and version control
- **Node.js** (v18+) – For local frontend/backend development (optional, but recommended)
- **A code editor** – VS Code, WebStorm, or your preferred IDE

> **Note**: On Windows, use WSL 2 for optimal Docker performance.

---

## Quick Start

### 1. Build and Start the Environment

Navigate to the root of your workspace and run:

```bash
docker compose up --build
```

You'll see logs from all services. Wait until you see messages like:
```
gateway_1        | ... listening on 0.0.0.0:80
frontend-react_1 | VITE v5.x ready in XXX ms
backend-node_1   | Server running on port 5000
backend-python_1 | Uvicorn running on 0.0.0.0:8000
postgres_1       | PostgreSQL started
```

### 2. Verify Your Services Are Running

Open your browser and check these endpoints:

- **Landing Page**: http://localhost:8080/ — You should see your portfolio landing page
- **React Dashboard**: http://localhost:8080/react/ — Your Vite frontend
- **Node.js Health**: http://localhost:8080/api/node/health — Returns `{"status":"ok"}`
- **Python Health**: http://localhost:8080/api/python/health — Returns `{"status":"ok"}`
- **FastAPI Docs**: http://localhost:8080/api/python/docs — Interactive API documentation

### 3. Stop Your Containers

When you're done developing, stop and remove all containers:

```bash
docker compose down
```

For a full cleanup (including volumes), use:

```bash
docker compose down -v
```

---

## Development Guide

### 1. Hot-Reloading (HMR)

You don't need to rebuild containers when you make code changes. Each service watches your files and automatically reloads:

- **React frontend** (Vite): Changes in `frontend-react/src/` reload instantly in your browser
- **Node.js backend** (nodemon): Changes in `backend-node/server.js` restart the server automatically
- **Python backend** (uvicorn): Changes in `backend-python/main.py` reload the API server

**Pro tip**: Keep your browser DevTools open and watch the console for HMR messages.

### 2. Tailwind CSS for Your Landing Page

Your landing page is pre-configured to compile Tailwind CSS. Here's how to use it:

1. **Edit your styles**: Open `landing-page/src/input.css` to add custom Tailwind rules
2. **Link the compiled CSS**: In `landing-page/index.html`, add:
   ```html
   <link href="/dist/output.css" rel="stylesheet">
   ```
3. **Rebuild the styles**: Run:
   ```bash
   docker compose build landing-page
   ```
4. **Watch for changes locally** (optional, during development):
   ```bash
   cd landing-page
   npm install
   npm run watch:css
   ```

### 3. Integrating Supabase

Want to use Supabase for authentication, storage, or edge functions? Follow the detailed setup guide in `supabase/README.md` in your workspace. This will help you:

- Connect your local containers to a Supabase project
- Configure environment variables
- Set up authentication flows
- Enable real-time features

### 4. Understanding Your Backend APIs

**Node.js Express API** (`backend-node/`):
- Handles RESTful endpoints for database writes
- Uses PostgreSQL connection pooling
- Perfect for CRUD operations and business logic

**Python FastAPI API** (`backend-python/`):
- Provides high-performance async endpoints
- Auto-generates interactive API docs at `/docs`
- Ideal for data processing and ML workloads

Both backends connect to the same PostgreSQL database, so they share your data seamlessly.

---

## Database Management

### Connecting to PostgreSQL

You can access your database from outside the containers using:

```bash
psql -h localhost -U postgres -d portfolio
```

Default credentials (set in `docker-compose.yml`):
- **Host**: `localhost`
- **Port**: `5432`
- **User**: `postgres`
- **Database**: `portfolio`
- **Password**: Check your `.env` file or `docker-compose.yml`

### Running Database Migrations

If you have migration scripts, place them in a `migrations/` folder and run:

```bash
docker compose exec postgres psql -U postgres -d portfolio -f /migrations/001_init.sql
```

### Viewing Logs

To see what's happening in any container, use:

```bash
docker compose logs -f postgres       # PostgreSQL logs
docker compose logs -f backend-node   # Node.js logs
docker compose logs -f backend-python # Python logs
docker compose logs -f frontend-react # React logs
```

---

## Deployment Guide

### Deploying Your React Frontend to Vercel

Your Vite-based React app deploys seamlessly to Vercel:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
2. **Deploy from your frontend directory**:
   ```bash
   cd frontend-react
   vercel
   ```
3. **Or connect your GitHub repo** to Vercel for automatic deployments on push

### Deploying Your Node.js Backend to Vercel

Express apps deploy as Serverless Functions on Vercel:

1. **Create a `vercel.json`** in your `backend-node/` directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```
2. **Deploy**:
   ```bash
   cd backend-node
   vercel
   ```

### Deploying Your Python Backend to Vercel

Python FastAPI apps also deploy as Serverless Functions:

1. **Create a `vercel.json`** in your `backend-python/` directory with proper routing
2. **Deploy**:
   ```bash
   cd backend-python
   vercel
   ```

### Environment Variables for Production

Remember to set production environment variables in your deployment platform (Vercel, Heroku, etc.) for:
- Database connection strings
- API keys
- Supabase credentials
- Any secrets referenced in your services

---

## Troubleshooting

### "Port 8080 is already in use"

You have another service running on port 8080. Either:
- Stop the other service
- Change your port in `docker-compose.yml`:
  ```yaml
  gateway:
    ports:
      - "8081:80"  # Use 8081 instead
  ```

### "Cannot connect to Docker daemon"

Make sure Docker Desktop is running. On Mac/Windows, check the system tray. On Linux, run:

```bash
sudo systemctl start docker
```

### One service won't start or crashes immediately

Check its logs:

```bash
docker compose logs backend-node  # Replace with service name
```

Common issues:
- **Port conflict**: Another service is already using that port
- **Missing dependencies**: Run `npm install` or `pip install -r requirements.txt` locally
- **Environment variables**: Check your `.env` file has all required variables

### React frontend won't hot-reload

1. Ensure you're accessing the app via `http://localhost:8080/react/` (not direct port 5173)
2. Check browser console for WebSocket errors
3. Restart the container:
   ```bash
   docker compose restart frontend-react
   ```

### Database connection errors

1. Verify PostgreSQL container is running:
   ```bash
   docker compose ps
   ```
2. Check credentials in `docker-compose.yml`
3. Try connecting manually:
   ```bash
   docker compose exec postgres psql -U postgres -c "SELECT 1"
   ```

### Need a fresh start?

Remove everything and rebuild:

```bash
docker compose down -v
docker system prune -a
docker compose up --build
```

---

## Adding New Tech Stacks

You can easily scale this workspace to include new technologies like Go, Ruby, Rust, etc. Here's how:

### Step 1: Create Your Service Directory

Create a new folder for your service:

```bash
mkdir backend-go
```

### Step 2: Add a Dockerfile

Write a `backend-go/Dockerfile` that exposes a port (in this example, port 8080 inside the container):

```dockerfile
FROM golang:1.21-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o server .

EXPOSE 8080

CMD ["./server"]
```

### Step 3: Update docker-compose.yml

Add your service to your `docker-compose.yml`:

```yaml
backend-go:
  build:
    context: ./backend-go
  ports:
    - "8001:8080"  # Optional: expose for debugging
  networks:
    - portfolio-network
  environment:
    - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/portfolio
```

### Step 4: Configure Nginx Routing

Open `gateway/nginx.conf` and add a location block for your new service:

```nginx
location /api/go/ {
    proxy_pass http://backend-go:8080/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Step 5: Restart Your Environment

Rebuild and restart all containers:

```bash
docker compose up --build
```

Your new Go backend is now accessible at `http://localhost:8080/api/go/` ✅

**Repeat these steps for any other technologies** you want to add (Ruby, Rust, Java, etc.).

---

## Tips for Success

- **Use `.env` files** to manage secrets and keep sensitive data out of version control
- **Keep your Dockerfiles minimal** to reduce build times and image sizes
- **Test locally first** with hot reload before pushing to production
- **Monitor your logs** regularly to catch errors early
- **Document your API endpoints** with comments or OpenAPI specs
- **Commit your `docker-compose.yml`** to version control so your team uses the same setup
- **Use meaningful container names** so you can identify them in logs and dashboards

---

## Need Help?

- Check the **Troubleshooting** section above
- Review Docker Compose documentation: https://docs.docker.com/compose/
- Explore individual service docs (React, Express, FastAPI, PostgreSQL)
- Check container logs: `docker compose logs [service-name]`

Happy coding! 🚀
