# OBDII-Dashboard

A lightweight, modular, offline-first dashboard for automotive OBDII live data visualization.

## Docker Setup

This project supports two Docker environments: **development** and **production**, managed with Docker Compose.

### 🧪 Development

Run a hot-reloading Vite dev server inside Docker. Perfect for local development.

```bash
docker compose up dev --build
```

- Exposes the app at http://localhost:5173

- Watches local file changes (with polling) and reloads automatically

- Mounts local files into the container for live editing

### 📦 Production

Builds and serves the static dashboard using a minimal image.

```bash
docker compose up production --build
```

- Exposes the app at http://localhost:3000

- Builds the app once using vite build

- Uses a clean, optimized image with no development tools