import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';

import './App.css';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

export default class App extends Component {
  static defaultProps = {
    todoData: [],
    buttons: [],
    filter: 'All',
    edit: false,
  };

  static propTypes = {
    todoData: PropTypes.array.isRequired,
    buttons: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
  };

  maxId = 0;

  state = {
    todoData: [
      this.createTodoItem('Completed task', new Date(), true),
      this.createTodoItem('Editing task', new Date()),
      this.createTodoItem('Active Task', new Date()),
    ],
    buttons: ['All', 'Active', 'Completed'],
    filter: 'All',
    edit: false,
  };

  createTodoItem(label, timeStamp, min = 0, sec = 0, done = false) {
    const timerId = this.maxId++;
    this.setState((prevState) => {
      const newTimers = { ...prevState.timers, [timerId]: min * 60 + sec };
      return { timers: newTimers };
    });

    return {
      label,
      done,
      edit: false,
      id: timerId,
      timeStamp,
      string: this.formatDistanceToNow(timeStamp),
      timer: min * 60 + sec,
    };
  }

  formatDistanceToNow(timeStamp) {
    return formatDistance(new Date(), timeStamp, {
      addSuffix: true,
    });
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, new Date(), min, sec);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  clearCompleted = () => {
    this.state.todoData.forEach((item) => {
      if (item.done) {
        this.deleteItem(item.id);
      }
    });
  };

  editItem = (id, label) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'edit', label),
      };
    });
  };

  toggleProperty(arr, id, propName, label) {
    const idx = arr.findIndex((el) => el.id === id);

    if (!label) {
      label = this.state.todoData[idx].label;
    }

    const oldItem = arr[idx];

    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
      label: label,
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  onToggleFilter = (i, text) => {
    this.setState({ filter: text });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onEdit={this.editItem}
            onToggleDone={this.onToggleDone}
            filter={this.state.filter}
          />
          <Footer
            toDo={todoCount}
            onToggleFilter={this.onToggleFilter}
            clearCompleted={this.clearCompleted}
            buttons={this.state.buttons}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
