const { EventEmitter } = require("events");

const taskEvents = new EventEmitter();

taskEvents.on("error", (err) => {
    console.error(`[Events] ${err.message}`);
});

module.exports = taskEvents;
