import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
    }
    this.handleAddTask = this.handleAddTask.bind(this)
  }

  handleAddTask(e) {
    if (this.state.newTodo) {
      this.props.dispatch({
        type: 'ADD_TODO',
        payload: {
          id: (new Date).toString(),
          value: this.state.newTodo,
          done: false,
          subTasks: [],
        }
      });
      this.setState({
        newTodo: ''
      });
    } else {
      alert('Please enter the task');
    }
  }

  render() {
    return (
      <div>
        <h1>TODO Extension</h1>
        <div>
          <textarea cols="30" rows="10" 
            placeholder="Please enter new task" 
            value={this.state.newTodo}
            onChange={e => this.setState({newTodo: e.target.value})}
          ></textarea>
          <button onClick={this.handleAddTask}>
            Add task
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
