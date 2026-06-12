# Supabase Local Development & Docker Integration Guide

This guide details how to setup and run **Supabase** locally alongside your containerized applications (React, Node.js, Python).

---

## Why Use Supabase CLI (Docker-Based)?

Supabase is a collection of 10+ open-source tools (Kong API Gateway, GoTrue Auth, PostgREST, Realtime, Storage, Postgres, and the Studio GUI Dashboard). 

Running Supabase locally using the official **Supabase CLI** is the industry standard. The CLI manages these Docker containers in the background, keeping them separated from your application compose stack. This allows you to update Supabase easily and keep your main `docker-compose.yml` clean and maintainable.

---

## 1. Prerequisites

Make sure you have:
1. **Docker Desktop** running.
2. **Node.js** installed on your host machine to run the CLI command, or you can install the CLI standalone.

---

## 2. Initialize Supabase in your Repository

Run the following command at the root of your project:
```bash
npx supabase init
```
This command creates a new `supabase` folder containing configuration files (`config.toml`) and database migration structures.

---

## 3. Start Supabase Services

To boot the local Supabase stack, run:
```bash
npx supabase start
```
*Note: The first execution will download the official Supabase Docker images, which might take a few minutes.*

Once started, the CLI will output your local credentials, endpoints, and access keys:
```text
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- **Supabase Studio (GUI Database Manager)**: Open `http://localhost:54323` in your browser. This gives you a premium database dashboard (similar to the cloud Supabase platform) where you can build tables, inspect logs, and manage storage.

---

## 4. Hooking Your App Containers Into Supabase

Our containerized architecture makes it easy to switch from the boilerplate PostgreSQL database to your local Supabase database.

Simply update your root `.env` file to point to the Supabase Postgres container:

```env
# Switch database host from 'db' (internal container) to your local Supabase DB
DB_HOST=host.docker.internal # Resolves to host machine localhost from inside Docker
DB_PORT=54322                # Supabase local Postgres port
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
```

By changing these variables, both your Node.js and Python containers will automatically direct their PostgreSQL traffic to the local Supabase database, letting you write SQL queries against it!

---

## 5. Stop Supabase Services

To pause the Supabase services and release resources:
```bash
npx supabase stop
```
