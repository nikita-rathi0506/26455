const SchedulerService = require('../services/schedulerService');

class SchedulerController {
    constructor() {
        this.schedulerService = new SchedulerService();
    }
    
    async getOptimizedSchedule(req, res) {
        try {
            const schedules = await this.schedulerService.getAllDepotSchedules();
            const stats = this.schedulerService.calculateStatistics(schedules);
            
            res.json({
                success: true,
                timestamp: new Date().toISOString(),
                schedules: schedules,
                statistics: stats
            });
        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }
    
    async getDepotSchedule(req, res) {
        try {
            const { depotId } = req.params;
            const depots = await this.schedulerService.fetchDepots();
            const vehicles = await this.schedulerService.fetchVehicles();
            
            const depot = depots.find(d => d.ID === parseInt(depotId));
            if (!depot) {
                return res.status(404).json({
                    success: false,
                    error: `Depot ${depotId} not found`
                });
            }
            
            const schedule = await this.schedulerService.optimizeScheduleForDepot(depot, vehicles);
            res.json({
                success: true,
                schedule: schedule
            });
        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
    
    async getVehicles(req, res) {
        try {
            const vehicles = await this.schedulerService.fetchVehicles();
            res.json({
                success: true,
                count: vehicles.length,
                vehicles: vehicles
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
    
    async getDepots(req, res) {
        try {
            const depots = await this.schedulerService.fetchDepots();
            res.json({
                success: true,
                count: depots.length,
                depots: depots
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = SchedulerController;