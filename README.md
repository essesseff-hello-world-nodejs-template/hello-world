# hello-world Application (Node.js)

Node.js Express implementation with trunk-based development and event-driven deployments via essesseff platform.

## Architecture

* **Branch Strategy**: Single `main` branch (trunk-based)
* **Auto-Deploy**: DEV only
* **Manual Deploy**: QA, STAGING, PROD (via essesseff)

## Development Workflow

```
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git commit -am "Add feature"

# 3. Push and create PR
git push origin feature/my-feature

# 4. After review, merge to main
# This triggers automatic build and deploy to DEV

# 5. Use essesseff UI for promotions:
#    - Developer declares Release Candidate
#    - QA accepts RC → deploys to QA (or alternatively rejects the promotion of the RC to QA)
#    - QA marks as Stable (or alternatively rejects the promotion to Stable)
#    - Release Engineer deploys from Stable Release to STAGING/PROD
```

## Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Or run with auto-reload during development
npm run dev
```

## Docker

```bash
# Build container
docker build -t hello-world-nodejs:local .

# Run container
docker run -p 8080:8080 hello-world-nodejs:local
```

## Endpoints

* `/` - Main page with version information
* `/health` - Health check (returns JSON)
* `/ready` - Readiness check (returns JSON)

## Environment Variables

* `PORT` - Port to run the application on (default: 8080)
* `NODE_ENV` - Node environment (default: development)

## Project Structure

```
.
├── app.js             # Main Express application
├── package.json       # Node.js dependencies
├── Dockerfile         # Container definition
├── semver.txt         # Version tracking
├── .dockerignore      # docker ignore patterns
├── .gitignore         # Git ignore patterns
├── .github/workflows/build.yml # GitHub Actions build automation
└── README.md          # This file
```

## Related Repositories

* Source: hello-world (this repo)
* Config DEV: hello-world-config-dev
* Config QA: hello-world-config-qa
* Config STAGING: hello-world-config-staging
* Config PROD: hello-world-config-prod
* Argo CD Config DEV: hello-world-argocd-dev
* Argo CD Config QA: hello-world-argocd-qa
* Argo CD Config STAGING: hello-world-argocd-staging
* Argo CD Config PROD: hello-world-argocd-prod

## Testing

```bash
# Test health endpoint
curl http://localhost:8080/health

# Test readiness endpoint
curl http://localhost:8080/ready

# Test main page
curl http://localhost:8080/
```

## Dependencies

* **express**: Web framework for Node.js
* **nodemon**: Development tool for auto-reloading (dev dependency)

## Requirements

* Node.js >= 18.0.0
* npm or yarn
