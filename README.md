# 🔐 Secure Secret & Environment Management Showcase

A professional demonstration of how to manage sensitive credentials, API keys, and environment variables in a modern full-stack application. This project uses a Student ERP system as the vehicle to showcase **enterprise-grade security patterns** for password and secret storage.

## 🎯 The Core Objective
The primary goal of this project is to prove that an application can be deployed to the cloud without ever exposing a single password, API key, or sensitive credential in the source code.

### 🛡️ Security Pillars
1. **Zero-Leak Policy**: No secrets in `.git` or source code.
2. **Layered Access**: Separation of Build-time vs. Runtime vs. Deployment secrets.
3. **Environment Isolation**: Production secrets live only on the production server.

---

## 📸 Proof of Secure Implementation

### 1. Centralized Secret Vault (GitHub)
I used **GitHub Repository Secrets** to store automation credentials. These are encrypted and can only be accessed by the deployment pipeline, never by unauthorized users.
![GitHub Secrets](./screenshot/git%20secreets.png)

### 2. Secure Database Integration
The connection to **Supabase** is managed through protected API keys. I showcase how to authenticate with a remote database without hardcoding the connection string.
![Supabase Integration](./screenshot/supabase.png)

### 3. Automated & Encrypted Pipeline
The **GitHub Actions** workflow uses these secrets to securely build and push Docker images. Every step is logged, but sensitive values are automatically masked (hidden) by the system.
![CI/CD Pipeline](./screenshot/Action.png)

### 4. Server-Side Environment Protection
The production server uses a **Protected `.env` file** that exists only in the server's local file system. This ensures that even if the codebase is compromised, the production passwords remain safe.
![Server SSH & Config](./screenshot/AWS%20server.png)

### 5. Runtime Container Security
Using **Docker Compose**, I demonstrate how to map local environment files into isolated containers. This ensures the application can read its passwords at runtime without storing them inside the Docker image.
![Docker Container Runtime](./screenshot/docker%20ps.png)

---

## 🔑 The Three-Tier Secret Architecture

I implemented a three-tier system to ensure maximum security across the application lifecycle:

### Tier 1: Deployment Secrets (Automation)
- **Stored In**: GitHub Actions Secrets.
- **Example**: `SERVER_SSH_KEY`, `DOCKERHUB_TOKEN`.
- **Purpose**: Allows the system to deploy code without human intervention.

### Tier 2: Build-Time Variables (Frontend)
- **Stored In**: Injected via Docker Build-Args.
- **Example**: `VITE_API_URL`.
- **Purpose**: Since frontend JS is public, we only inject non-sensitive routing data here.

### Tier 3: Runtime Secrets (Backend/Database)
- **Stored In**: Server-local `.env` files.
- **Example**: `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`.
- **Purpose**: These are the "Master Keys". They never leave the production server and are never passed through CI/CD logs.

---

## 🛡️ The First Line of Defense: `.gitignore`

The `.gitignore` file is the most critical tool for preventing accidental secret leaks. In this project, it is configured to ensure that sensitive files never enter the version control history.

- **`.env` and `*.env`**: Explicitly ignored to prevent local development secrets from being pushed to GitHub.
- **`node_modules` and `dist`**: Ignored to keep the repository clean and focus only on source code.
- **Editor-Specific Files**: (e.g., `.vscode`) are ignored to maintain a clean workspace for all collaborators.

By using a strict `.gitignore` policy, I ensure that **"what is private stays private."**

---

## 🛠️ Security Toolchain
| Tool | Usage |
| :--- | :--- |
| **GitHub Secrets** | Encrypted vault for CI/CD automation. |
| **Docker Build-Args** | Safe injection of environment-specific routing. |
| **Linux Permissions** | Protecting `.env` files on the EC2 instance. |
| **Supabase Vault** | Secure storage for PostgreSQL credentials. |

---

## 👤 Author
**Shivam Patil**
*DevOps & Full Stack Developer*
