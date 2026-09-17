# Docker Assets

This folder holds additional Docker resources.

## Contents

- **nginx.conf** — optional reverse-proxy config for production deployments
- **prod.docker-compose.yml** — production-oriented compose overrides (build only, no volumes)

## Production Deployment

```bash
docker-compose -f docker-compose.yml -f docker/prod.docker-compose.yml up --build -d
```

> In production, set `ENVIRONMENT=production` and `DEBUG=false` in `.env`.
> Use a managed PostgreSQL/Qdrant or mount persistent volumes.

