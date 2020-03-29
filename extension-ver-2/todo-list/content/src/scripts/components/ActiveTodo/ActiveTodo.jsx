import React from 'react';

const ActiveTodo = ({
    todo,
    addSubTask,
    doneSubTask,
    subTask,
    setSubTask
}) => {

    const handleAddSubTask = (todoId) => {
        if (!subTask) {
            alert('Please enter a subtask');
            return
        }
        addSubTask(subTask, todoId);
        setSubTask('');
    }
    const handleDoneSubTask = (todoId, subTask) => {
        doneSubTask(subTask, todoId)
    }

    return (
        <div>
            <h2>{todo.value}</h2>
            {
                todo.subTasks.map((task, id) => (
                    <div key={task + id}>
                        <span>{task}</span>
                        <button
                            onClick={() => handleDoneSubTask(todo.id, task)}
                        >
                            done
                        </button>
                    </div>
                ))
            }
            <div>
                <input type="text" 
                    placeholder="add subtask"
                    value={subTask}
                    onChange={e => setSubTask(e.target.value)}
                />
                <button onClick={() => handleAddSubTask(todo.id)}>
                    add
                </button>
            </div>
        </div>
    );
}

export default ActiveTodo;