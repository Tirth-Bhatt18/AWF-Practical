const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

let cacheHits = 0;
let cacheMisses = 0;

function getCached(key) {
    const value = cache.get(key);

    if (value === undefined) {
        cacheMisses += 1;
        return undefined;
    }

    cacheHits += 1;
    return value;
}

function setCached(key, value) {
    cache.set(key, value);
}

function invalidateUserTasks(userId, taskId) {
    cache.del(`all_tasks:${userId}`);
    if (taskId) {
        cache.del(`task:${userId}:${taskId}`);
    }
}

function getCacheStats() {
    return { hits: cacheHits, misses: cacheMisses };
}

module.exports = {
    getCached,
    setCached,
    invalidateUserTasks,
    getCacheStats
};
