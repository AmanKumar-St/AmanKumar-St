# React Frontend Service

This service contains a React application built with Vite. It runs inside a Docker container with hot-reloading (HMR) enabled.

## Dev Setup in Docker
The service is automatically started by running `docker compose up`. 

- **Local Port**: Accessible via the gateway at `http://localhost:8080/react/`
- **Container Port**: Runs internally on `5173`
- **HMR WS Tunnel**: Uses the Gateway proxy on port `8080` (configured in `vite.config.js`)

## Dependencies
- React 18+
- Vite 5+
