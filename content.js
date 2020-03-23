const container = document.createElement('div');
container.innerHTML = `
    <h1>Tasks TO DO:</h1>
`;

container.style = "position: fixed; left: 20px; bottom: 100px"

document.querySelector('body').append(container);

chrome.runtime.sendMessage({
    type: "GET_TASKS",
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "TASKS_UPDATE") {
            document.querySelectorAll(".task_element").forEach(node => node.remove());
            for (let task of request.tasks) {
                const taskElement = document.createElement('div');
                taskElement.className = "task_element"
                taskElement.innerHTML = `<span>${task.value}</span>`;
                const doneButton = document.createElement('button');
                doneButton.className = "done_button";
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

// chrome.runtime.sendMessage({task: 'hello', done: true});

