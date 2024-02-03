import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer'

import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    done: false,
    id: 0,
    onToggleDone: () => {},
    onDeleted: () => {},
    onEdit: () => {},
    string: '',
    itemProps: {},
  };

  static propTypes = {
    done: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    string: PropTypes.string.isRequired,
    itemProps: PropTypes.object.isRequired,
  };

  state = {
    label: this.props.itemProps.label,
  };

  newValue = '';
  editing = false;
  taskClassName = 'view';
  editClassName = 'view';

  onLabelChange = (event) => {
    this.newValue = event.target.value;
    this.setState({ label: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onEdit(this.props.id, this.state.label);
    this.editing = false;
    this.setState({
      label: this.state.label,
    });
  };

  componentDidMount() {
    document.getElementById('edit').focus();
  }

  render() {
    const { done, id } = this.props;
    if (done) {
      this.classNames = 'completed';
      this.checked = true;
    } else {
      this.checked = false;
      this.classNames = '';
    }

    if (this.editing === true) {
      this.taskClassName = 'hidden';
      this.editClassName = 'view';
    } else {
      this.taskClassName = 'view';
      this.editClassName = 'hidden';
    }

    return (
      <div>
        <li id={id} className={this.classNames}>
          <div className={this.taskClassName}>
            <input className="toggle" type="checkbox" onChange={this.props.onToggleDone} checked={this.checked}></input>
            <label>
              <span className="title" onClick={this.props.onToggleDone}>
                {this.state.label}
              </span>
              <span className="description">
              <Timer timer={this.props.itemProps.timer} />
        </span>
              <span className="description">{this.props.string}</span>
             
            </label>
            <button
              className="icon icon-edit"
              onClick={() => {
                this.editing = true;
                this.props.onEdit(this.props.id, this.newValue);
              }}
            ></button>
            <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
          </div>
        </li>
        <li className="editing">
          <div className={this.editClassName}>
            <form onSubmit={this.onSubmit}>
              <input
                id="edit"
                className="edit"
                type="text"
                onChange={this.onLabelChange}
                value={this.state.label}
                ref={(input) => input && input.focus()}
                autoFocus
              ></input>
            </form>
          </div>
        </li>
      </div>
    );
  }
}