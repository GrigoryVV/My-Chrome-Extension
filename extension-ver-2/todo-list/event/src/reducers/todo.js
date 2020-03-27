const initialState = {
    todos: [],
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
      default:
        return state;
    }
  };