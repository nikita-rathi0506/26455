# 🚗 Vehicle Maintenance Scheduler

A microservice that optimizes vehicle maintenance scheduling using the **0/1 Knapsack algorithm** to maximize operational impact within available mechanic-hour budgets.

## 📋 Problem Statement

Each depot has a limited number of mechanic-hours per day. Each vehicle maintenance task has:
- **Duration** (hours required)
- **Impact Score** (operational importance)

The goal is to select a subset of tasks that:
- Total time ≤ available mechanic-hours
- Total impact score is **maximized**

## 🛠️ Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client
- **Knapsack Algorithm** - Optimization logic

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schedule` | Optimized schedule for all depots |
| GET | `/api/schedule/depot/:depotId` | Schedule for specific depot |
| GET | `/api/depots` | List of all depots |
| GET | `/api/vehicles` | List of all vehicles |
| GET | `/health` | Health check |

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start the server
npm run dev

# Server runs on http://localhost:3000