# 26455 - Backend Track Submission

## Repository Structure
├── vehicle_maintenance_scheduler/ # Vehicle Maintenance Scheduler Microservice
├── logging_middleware/ # Logging Middleware (from previous task)
├── notification_app_be/ # Notification App Backend (placeholder)
├── notification_system_design.md # Notification System Design (Stages 1-6)
└── .gitignore # Git ignore file

## Vehicle Maintenance Scheduler

A microservice that optimizes vehicle maintenance scheduling using the **0/1 Knapsack algorithm** to maximize operational impact within available mechanic-hour budgets.

### Features
- Fetches depot and vehicle data from external APIs
- Solves 0/1 knapsack problem for optimal task selection
- REST API endpoints for schedule optimization
- Request logging middleware included

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schedule` | Optimized schedule for all depots |
| GET | `/api/schedule/depot/:depotId` | Schedule for specific depot |
| GET | `/api/depots` | List of all depots |
| GET | `/api/vehicles` | List of all vehicles |
| GET | `/health` | Health check |

### How to Run

```bash
cd vehicle_maintenance_scheduler
npm install
npm run dev

### API Screenshots (from Insomnia)
Depots API Response
https://screenshots/depot.png

Vehicles API Response
https://screenshots/vechiles.png
https://screenshots/vechiles1.png
https://screenshots/vechiles2.png
https://screenshots/vechiles3.png
https://screenshots/vechiles4.png

Schedule API Response
https://screenshots/schedule.png
https://screenshots/schedule1.png
https://screenshots/schedule2.png
https://screenshots/schedule3.png
https://screenshots/schedule4.png
Sample Output
Depot 1 (60 hours)
Utilization: 100%

Total Impact: 107

Vehicles Serviced: 15

Depot 2 (135 hours)
Utilization: 94.81%

Total Impact: 153

Vehicles Serviced: 26

Depot 3 (188 hours)
Utilization: 68.09%

Total Impact: 153

Vehicles Serviced: 26

Project Structure
vehicle_maintenance_scheduler/
├── src/
│   ├── config/
│   │   └── apiConfig.js
│   ├── controllers/
│   │   └── schedulerController.js
│   ├── services/
│   │   └── schedulerService.js
│   ├── utils/
│   │   └── knapsack.js
│   └── app.js
├── screenshots/
│   ├── depot.png
│   ├── vechiles.png
│   ├── vechiles1.png
│   ├── vechiles2.png
│   ├── vechiles3.png
│   ├── vechiles4.png
│   ├── schedule.png
│   ├── schedule1.png
│   ├── schedule2.png
│   ├── schedule3.png
│   └── schedule4.png
├── server.js
├── package.json
└── README.md 
