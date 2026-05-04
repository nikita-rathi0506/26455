const { solveKnapsackOptimized } = require('../utils/knapsack');

class SchedulerService {
    async fetchDepots() {
        // Mock depot data from the API response shown in the problem
        return [
            { ID: 1, MechanicHours: 60 },
            { ID: 2, MechanicHours: 135 },
            { ID: 3, MechanicHours: 188 }
        ];
    }
    
    async fetchVehicles() {
        // Mock vehicle data from the sample provided in the problem images
        return [
            { TaskID: "264e638f-1c7a-4d67-9f9c-53f3d1766d37", Duration: 1, Impact: 5 },
            { TaskID: "73ce9dca-1536-4a7a-9f1e-c67083afad61", Duration: 6, Impact: 2 },
            { TaskID: "4b6e22ee-b4ed-45a4-a6af-5294b0d69f37", Duration: 1, Impact: 3 },
            { TaskID: "d6372f32-852b-46a9-8e8c-e730fecc3c22", Duration: 5, Impact: 5 },
            { TaskID: "ec40b581-bdfc-43e0-a047-871fdafe8167", Duration: 7, Impact: 3 },
            { TaskID: "fb1e3165-67c9-4e96-a5c3-2d20085d293b", Duration: 6, Impact: 3 },
            { TaskID: "330065c0-3815-4e10-a18a-b93b117e30a8", Duration: 5, Impact: 1 },
            { TaskID: "72a91abc-4ed7-492c-9e99-348e7437953b", Duration: 5, Impact: 9 },
            { TaskID: "8a7ff5b1-335c-4a2f-96d8-09c4a362e781", Duration: 6, Impact: 10 },
            { TaskID: "08d00114-9506-463d-ba2e-3343ec4e2e89", Duration: 6, Impact: 6 },
            { TaskID: "a1e0b8e6-1076-4a2f-b83b-5e6017900033", Duration: 6, Impact: 1 },
            { TaskID: "52635341-7c5f-475a-9839-4676f8fe5fd4", Duration: 1, Impact: 5 },
            { TaskID: "9e08defa-7bb5-4a83-9e29-417165922894", Duration: 6, Impact: 9 },
            { TaskID: "f92b0f39-35ec-47c3-a465-3e49c22185b6", Duration: 2, Impact: 5 },
            { TaskID: "65c0d74a-82ef-4fcc-9d85-9b082bb85310", Duration: 5, Impact: 7 },
            { TaskID: "68ee2f8d-4145-4472-bce9-1d0968a8092a", Duration: 1, Impact: 1 },
            { TaskID: "0bf780cb-1099-4f61-99bf-dec95a7063b6", Duration: 3, Impact: 10 },
            { TaskID: "e716fb11-1064-4db7-9d76-06d19f4f6f67", Duration: 5, Impact: 5 },
            { TaskID: "60586e47-ab9c-407d-85ca-1215084f3f41", Duration: 8, Impact: 8 },
            { TaskID: "08635e52-dad5-4b78-8ab1-e55db53c0c18", Duration: 8, Impact: 5 },
            { TaskID: "871ddcf5-0bba-4233-bf12-c776c496e314", Duration: 7, Impact: 10 },
            { TaskID: "b57f17dc-db77-42bf-a7e9-8fec596ce498", Duration: 7, Impact: 8 },
            { TaskID: "1d893de7-fbba-4c77-927b-e3076fe805d5", Duration: 1, Impact: 8 },
            { TaskID: "1743e1b5-9dfd-450b-9905-98c3e054aee1", Duration: 5, Impact: 8 },
            { TaskID: "48851915-eaf5-48ec-a20c-5074d7050c5f", Duration: 8, Impact: 8 },
            { TaskID: "7d81e6ca-8f03-4c4a-9ec0-701f820c5655", Duration: 7, Impact: 8 }
        ];
    }
    
    async optimizeScheduleForDepot(depot, vehicles) {
        const validVehicles = vehicles.filter(v => 
            v.Duration !== undefined && 
            v.Impact !== undefined &&
            v.Duration > 0
        );
        
        if (validVehicles.length === 0) {
            return {
                depotId: depot.ID,
                mechanicHours: depot.MechanicHours,
                message: 'No valid vehicles available',
                selectedVehicles: [],
                totalImpact: 0,
                totalDuration: 0,
                utilization: '0%',
                vehiclesCount: 0
            };
        }
        
        console.log(`Optimizing for Depot ${depot.ID} with ${depot.MechanicHours} hours available`);
        console.log(`Processing ${validVehicles.length} vehicles`);
        
        const result = solveKnapsackOptimized(validVehicles, depot.MechanicHours);
        
        return {
            depotId: depot.ID,
            mechanicHours: depot.MechanicHours,
            selectedVehicles: result.selectedTasks,
            totalImpact: result.maxImpact,
            totalDuration: result.totalDuration,
            utilization: ((result.totalDuration / depot.MechanicHours) * 100).toFixed(2) + '%',
            vehiclesCount: result.selectedTasks.length
        };
    }
    
    async getAllDepotSchedules() {
        const depots = await this.fetchDepots();
        const vehicles = await this.fetchVehicles();
        
        console.log(`Fetched ${depots.length} depots and ${vehicles.length} vehicles`);
        
        const schedules = [];
        for (const depot of depots) {
            const schedule = await this.optimizeScheduleForDepot(depot, vehicles);
            schedules.push(schedule);
        }
        
        return schedules;
    }
    
    calculateStatistics(schedules) {
        const stats = {
            totalDepots: schedules.length,
            totalImpact: 0,
            totalUtilization: 0,
            totalVehiclesServiced: 0,
            averageUtilization: 0,
            depotPerformance: []
        };
        
        schedules.forEach(schedule => {
            stats.totalImpact += schedule.totalImpact;
            stats.totalVehiclesServiced += schedule.vehiclesCount || 0;
            const utilization = parseFloat(schedule.utilization);
            stats.totalUtilization += isNaN(utilization) ? 0 : utilization;
            stats.depotPerformance.push({
                depotId: schedule.depotId,
                utilization: schedule.utilization,
                totalImpact: schedule.totalImpact,
                tasksCompleted: schedule.vehiclesCount || 0,
                mechanicHoursUsed: schedule.totalDuration,
                mechanicHoursAvailable: schedule.mechanicHours
            });
        });
        
        stats.averageUtilization = (stats.totalUtilization / stats.totalDepots).toFixed(2) + '%';
        
        return stats;
    }
}

module.exports = SchedulerService;