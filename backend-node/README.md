# Node.js Express API Service

This is the Node.js/Express API service. It is designed to run in a Docker container and connect to a PostgreSQL database container.

## Local Dev Setup
This container runs `nodemon` which watches for file changes on the host computer and restarts automatically.

- **Gateway URL**: `/api/node/` (proxied via gateway on `http://localhost:8080/api/node/`)
- **Container Port**: Exposes port `5000` internally.

## Endpoints
- `GET /api/node/health` - Checks PostgreSQL database connectivity and returns server statistics.
- `POST /api/node/contact` - Saves landing-page contact form submissions to the database.
- `GET /api/node/contacts` - Returns a history of contact requests.
