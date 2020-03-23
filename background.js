let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "ADD_TASK") {
        tasks.push(request.task);
        localStorage.setItem("tasks", JSON.stringify(tasks))
        // send message to content script
        setTasks(tasks);
    } else if (request.type === "TASK_DONE") {
        tasks = tasks.filter(task => task.value !== request.task.value);
        // update LocalStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setTasks(tasks);
    } else if (request.type === "GET_TASKS") {
        setTasks(tasks);
    }
});

function setTasks(tasks) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "TASKS_UPDATE",
            tasks
        });
    });
}