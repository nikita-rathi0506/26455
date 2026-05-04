require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n=================================`);
    console.log(`Vehicle Maintenance Scheduler`);
    console.log(`=================================`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`\nAPI Endpoints:`);
    console.log(`  GET  http://localhost:${PORT}/api/schedule`);
    console.log(`  GET  http://localhost:${PORT}/api/schedule/depot/:depotId`);
    console.log(`  GET  http://localhost:${PORT}/api/vehicles`);
    console.log(`  GET  http://localhost:${PORT}/api/depots`);
    console.log(`=================================\n`);
    console.log("Server ready! Waiting for requests...");
});