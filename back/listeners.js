const taskEvents = require("./events");

function registerTaskListeners() {
    if (taskEvents.listenerCount("task-created") > 0) {
        return;
    }

    taskEvents.on("task-created", ({ taskId, title, timestamp }) => {
        console.log(`[Notification] Processing started at ${new Date().toISOString()} for task "${title}" (${taskId})`);

        setTimeout(() => {
            try {
                console.log(`[Notification] Processing completed at ${new Date().toISOString()} for task "${title}" (${taskId}), created at ${timestamp}`);
            } catch (err) {
                taskEvents.emit("error", err);
            }
        }, 2000);
    });

    taskEvents.on("task-deleted", ({ taskId, timestamp }) => {
        console.log(`[Notification] Task deletion processing started at ${new Date().toISOString()} for task ${taskId}`);

        setTimeout(() => {
            try {
                console.log(`[Notification] Task deletion processing completed at ${new Date().toISOString()} for task ${taskId}, deleted at ${timestamp}`);
            } catch (err) {
                taskEvents.emit("error", err);
            }
        }, 2000);
    });
}

module.exports = { registerTaskListeners };
