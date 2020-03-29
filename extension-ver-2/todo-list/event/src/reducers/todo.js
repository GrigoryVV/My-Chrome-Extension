const initialState = {
    todos: [
      {
        id: "1",
        value: "Make an extension",
        done: false,
        subTasks: ["Learn How", "Make"],
      }
    ],
    activeTodo: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
            ...state,
            todos: [...state.todos, action.payload]
        };
      case 'TOGGLE_TODO_DONE':
        return {
          ...state,
          todos: state.todos.map(todo => {
            if (todo.id === action.payload) {
              return {...todo, done: !todo.done};
            } else return todo;
          })
        }
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
        }
      case 'OPEN_ACTIVE_TODO':
        return {
          ...state,
          activeTodo: action.payload
        }
      case 'ADD_SUB_TASK':
        return {
          ...state,
          todos: state.todos.map(todo => {
            if (todo.id === action.payload.todoId) {
              return {
                ...todo,
                subTasks: [...todo.subTasks, action.payload.subTask]
              };
            } else return todo;
          })
        }
      case 'DONE_SUB_TASK':
        return {
          ...state,
          todos: state.todos.map(todo => {
            if (todo.id === action.payload.todoId) {
              return {
                ...todo,
                subTasks: todo.subTasks.filter(task => (
                  task !== action.payload.subTask
                ))
              };
            } else return todo;
          })
        }
      default:
        return state;
    }
  };