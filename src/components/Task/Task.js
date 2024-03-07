import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Timer from '../Timer/Timer';

import './Task.css';

const Task = ({ done, id, onToggleDone, onDeleted, onEdit, string, itemProps }) => {
  const [label, setLabel] = useState(itemProps.label);
  const [newValue, setNewValue] = useState('');
  const [editing, setEditing] = useState(false);

  const taskClassName = editing ? 'hidden' : 'view';
  const editClassName = editing ? 'view' : 'hidden';

  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const onLabelChange = (event) => {
    setNewValue(event.target.value);
    setLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onEdit(id, label);
    setEditing(false);
  };

  return (
    <div>
      <li className={done ? 'completed' : ''}>
        <div className={taskClassName}>
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label>
            <span className="title" onClick={onToggleDone}>
              {label}
            </span>
            <span className="description">
              <Timer timer={itemProps.timer} />
            </span>
            <span className="description">{string}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              setEditing(true);
              onEdit(id, newValue);
            }}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
      <li className="editing">
        <div className={editClassName}>
          <form onSubmit={onSubmit}>
            <input ref={inputRef} className="edit" type="text" onChange={onLabelChange} value={label} autoFocus />
          </form>
        </div>
      </li>
    </div>
  );
};

Task.propTypes = {
  done: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  string: PropTypes.string.isRequired,
  itemProps: PropTypes.object.isRequired,
};

export default Task;
