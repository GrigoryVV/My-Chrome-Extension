const container = document.createElement('div');
container.className = "container_MY_EXTENSION-ABC";
container.innerHTML = `
    <h1>Tasks TO DO:</h1>
`;

document.querySelector('body').append(container);

chrome.runtime.sendMessage({
    type: "GET_TASKS",
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "TASKS_UPDATE") {
            document.querySelectorAll(".task_element_MY_EXTENSION-ABC").forEach(node => node.remove());
            for (let task of request.tasks) {
                const taskElement = document.createElement('div');
                taskElement.className = "task_element_MY_EXTENSION-ABC"
                taskElement.innerHTML = `<span>${task.value}</span>`;
                const doneButton = document.createElement('button');
                doneButton.className = "done_button_MY_EXTENSION-ABC";
                doneButton.innerText = "done"
                doneButton.onclick = function() {
                    chrome.runtime.sendMessage({
                        type: "TASK_DONE",
                        task
                    });
                }
                taskElement.append(doneButton);
                container.append(taskElement);
            }
        }
});
