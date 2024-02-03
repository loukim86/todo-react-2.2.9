import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  };

  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (event) => {
    this.setState({ label: event.target.value });
  };

  onChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    })
  }
  onChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (event) => {
    const { label, min, sec } = this.state;
    event.preventDefault();
    const seconds = sec !== '' ? parseInt(sec, 10) : null
    this.props.onItemAdded(label, parseInt(min, 10), seconds);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
          autoFocus
        ></input>
          <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.state.min}
          onChange={this.onChangeMin}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.state.sec}
          onChange={this.onChangeSec}
        />

        <input className="new-todo-form__submit" type="submit" />
      </form>
    );
  }
}