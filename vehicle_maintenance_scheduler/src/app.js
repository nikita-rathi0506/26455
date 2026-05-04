const express = require('express');
const cors = require('cors');
const SchedulerController = require('./controllers/schedulerController');

const app = express();
const schedulerController = new SchedulerController();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

app.get('/api/schedule', (req, res) => schedulerController.getOptimizedSchedule(req, res));
app.get('/api/schedule/depot/:depotId', (req, res) => schedulerController.getDepotSchedule(req, res));
app.get('/api/vehicles', (req, res) => schedulerController.getVehicles(req, res));
app.get('/api/depots', (req, res) => schedulerController.getDepots(req, res));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

module.exports = app;