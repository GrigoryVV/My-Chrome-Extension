import React, {Component} from 'react';
import {connect} from 'react-redux';

const styles = {
  container: {
    zIndex: 1000,
    position: 'fixed',
    bottom: "100px",
    left: '50px',
    width: '300px',
    backgroundColor: '#dadada',
    padding: '20px'
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
    justifyContent: 'space-between'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleToggleTodoDone = this.handleToggleTodoDone.bind(this);
  }

  handleToggleTodoDone(id) {
    this.props.dispatch({
      type: 'TOGGLE_TODO_DONE',
      payload: id
    })
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>TODO list</h1>
        <div>
          <h2>Current tasks:</h2>
          <ul style={styles.list}>
            {this.props.todos.filter(todo => !todo.done).map(todo => {
              return (
                <li style={styles.listItem} key={todo.id}>
                  <span>{todo.value}</span>
                  <button 
                    onClick={() => this.handleToggleTodoDone(todo.id)}
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
                  <button 
                    onClick={() => this.handleToggleTodoDone(todo.id)}
                  >
                    restart
                  </button>
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
    todos: state.todo.todos
  };
};

export default connect(mapStateToProps)(App);
