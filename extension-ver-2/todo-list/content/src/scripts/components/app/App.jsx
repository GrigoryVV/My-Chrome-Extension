import React, {Component} from 'react';
import ActiveTodo from '../ActiveTodo/ActiveTodo'
import {connect} from 'react-redux';

const styles = {
  container: {
    zIndex: 1000,
    position: 'fixed',
    bottom: "100px",
    left: '50px',
    width: '300px',
    backgroundColor: '#dadada',
    padding: '20px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.5)'
  },
  list: {
    listStyle: 'none',
    margin: '20px 0',
    padding: 0
  },
  doneTasks: {
    textDecoration: 'line-through'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subTask: ''
    }

    this.handleToggleTodoDone = this.handleToggleTodoDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenActive = this.handleOpenActive.bind(this);
    this.setSubTask = this.setSubTask.bind(this)
    this.addSubTask = this.addSubTask.bind(this)
    this.doneSubTask = this.doneSubTask.bind(this)
  }

  setSubTask(value) {
    this.setState({
      subTask: value
    })
  }
  addSubTask(subTask, todoId) {
    this.props.dispatch({
      type: 'ADD_SUB_TASK',
      payload: {subTask, todoId}
    })
  }
  doneSubTask(subTask, todoId) {
    this.props.dispatch({
      type: 'DONE_SUB_TASK',
      payload: {subTask, todoId}
    })
  }

  handleToggleTodoDone(id, e) {
    e.stopPropagation();
    this.props.dispatch({
      type: 'TOGGLE_TODO_DONE',
      payload: id
    })
  }
  handleDelete(id) {
    this.props.dispatch({
      type: 'DELETE_TODO',
      payload: id
    })
  }
  handleOpenActive(id) {
    this.props.dispatch({
      type: 'OPEN_ACTIVE_TODO',
      payload: id
    })
  }

  render() {
    if (this.props.activeTodo) {
      return (
        <div style={styles.container}>
          <ActiveTodo 
            todo={this.props.todos.find(todo => (
              todo.id === this.props.activeTodo
            ))} 
            addSubTask={this.addSubTask}
            doneSubTask={this.doneSubTask}
            subTask={this.state.subTask}
            setSubTask={this.setSubTask}
          />
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <h1>TODO list</h1>
        <div>
          <h2>Current tasks:</h2>
          <ul style={styles.list}>
            {this.props.todos.filter(todo => !todo.done).map(todo => {
              return (
                <li style={styles.listItem}
                  key={todo.id}
                  onClick={(e) => this.handleOpenActive(todo.id)}
                >
                  <span>{todo.value}</span>
                  <button 
                    onClick={(e) => this.handleToggleTodoDone(todo.id, e)}
                  >
                    done
                  </button>
                </li>
              );
            })}
          </ul>
          <h2>Done tasks:</h2>
          <ul style={styles.list}>
            {this.props.todos.filter(todo => todo.done).map(todo => {
              return (
                <li style={styles.listItem} key={todo.id}>
                  <span style={styles.doneTasks}>{todo.value}</span>
                  <span>
                    <button 
                      onClick={(e) => this.handleToggleTodoDone(todo.id, e)}
                    >
                      restart
                    </button>
                    <button 
                      onClick={() => this.handleDelete(todo.id)}
                    >
                      delete
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
    activeTodo: state.todo.activeTodo
  };
};

export default connect(mapStateToProps)(App);
