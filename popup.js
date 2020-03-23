const addBtn = document.querySelector(".add_btn");
const newTask = document.querySelector(".new_task")

addBtn.addEventListener("click", function() {
    if (!newTask.value) {
        alert('Please enter task');
        return
    }

    chrome.runtime.sendMessage({
        type: "ADD_TASK",
        task: {
            value: newTask.value,
            done: false
        }
    });

    newTask.value = ''
})