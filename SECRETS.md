# 🔐 GitHub Actions — Required Secrets & Setup Guide

This document explains exactly which secrets to configure in GitHub and **why each one is needed**.
This is the core of the project's security demonstration.

---

## 📋 Secrets to Add in GitHub

Go to: **GitHub Repo → Settings → Secrets and variables → Actions → New repository secret**

### 🐳 Docker Hub Secrets

| Secret Name | Value | Why |
|---|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | Used to tag and push images |
| `DOCKERHUB_TOKEN` | Docker Hub access token (not password) | Authenticate to push images securely |

> **How to get `DOCKERHUB_TOKEN`:**
> Docker Hub → Account Settings → Security → New Access Token
> ⚠️ Never use your actual password — use a scoped token

---

### 🖥️ Server Deployment Secrets (optional — only if deploying)

| Secret Name | Value | Why |
|---|---|---|
| `SERVER_HOST` | Your server IP or domain | SSH target for deployment |
| `SERVER_USER` | SSH username (e.g., `ubuntu`) | SSH login |
| `SERVER_SSH_KEY` | Private SSH key (full content) | Passwordless SSH auth |
| `SERVER_PORT` | SSH port (default: `22`) | Optional |

> **How to create SSH key for CI:**
> ```bash
> ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key
> # Add the PUBLIC key to your server's ~/.ssh/authorized_keys
> # Add the PRIVATE key as SERVER_SSH_KEY secret in GitHub
> ```

---

### 🌿 Runtime App Secrets (on your server)

These are **NOT stored in GitHub Secrets** — they live only on your server in `~/student-hub/backend-student-hub/.env`

```env
PORT=5001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_real_service_role_key
JWT_SECRET=your_strong_random_secret_here
```

> **Why not in GitHub Secrets?**
> GitHub Secrets are for CI/CD automation credentials only.
> App secrets (Supabase, JWT) stay on the server — they're never passed through GitHub.

---

## 🏗️ Pipeline Architecture

```
Push to any branch
        │
        ▼
  ┌─────────────────────────────────┐
  │         CI Workflow              │
  │  1. Frontend: npm ci → lint → build │
  │  2. Backend: npm ci → smoke test    │
  │  3. Docker: build both images       │
  └─────────────────────────────────┘

Push to main only
        │
        ▼
  ┌─────────────────────────────────┐
  │         CD Workflow              │
  │  1. Build Docker images          │
  │  2. Push to Docker Hub           │   ← uses DOCKERHUB_* secrets
  │  3. SSH into server              │   ← uses SERVER_* secrets
  │  4. docker compose pull + up -d  │
  │  5. Health check                 │
  └─────────────────────────────────┘
        │
        ▼
  Server reads .env at runtime       ← app secrets NEVER leave the server
```

---

## 🔒 Security Principles Demonstrated

| Principle | Implementation |
|---|---|
| **Secrets never in code** | `.env` in `.gitignore`, real values only on server |
| **`.env.example` has placeholders only** | Developers know what vars are needed, not the values |
| **Scoped tokens** | Docker Hub token (not password), SSH key (not password) |
| **Secrets injected at runtime** | `env_file` in docker-compose, not baked into Docker image |
| **Environment protection** | GitHub `production` environment requires manual approval |
| **No secrets in CI logs** | `appleboy/ssh-action` masks sensitive values |
| **Multi-stage Docker build** | Frontend: no secrets ever needed; Backend: secrets at runtime only |
