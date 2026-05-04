function solveKnapsackOptimized(tasks, capacity) {
    if (!tasks || tasks.length === 0 || capacity <= 0) {
        return {
            maxImpact: 0,
            selectedTasks: [],
            totalDuration: 0
        };
    }
    
    const dp = Array(capacity + 1).fill(0);
    const selected = Array(capacity + 1).fill().map(() => []);
    
    for (const task of tasks) {
        for (let w = capacity; w >= task.Duration; w--) {
            const newImpact = dp[w - task.Duration] + task.Impact;
            if (newImpact > dp[w]) {
                dp[w] = newImpact;
                selected[w] = [...selected[w - task.Duration], task];
            }
        }
    }
    
    return {
        maxImpact: dp[capacity],
        selectedTasks: selected[capacity],
        totalDuration: selected[capacity].reduce((sum, task) => sum + task.Duration, 0)
    };
}

module.exports = { solveKnapsackOptimized };