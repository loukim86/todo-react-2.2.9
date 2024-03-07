import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onChangeMin = (e) => {
    setMin(e.target.value);
  };

  const onChangeSec = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const seconds = sec !== '' ? parseInt(sec, 10) : null;
    onItemAdded(label, parseInt(min, 10), seconds);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
        autoFocus
      />
      <input className="new-todo-form__timer" placeholder="Min" autoFocus value={min} onChange={onChangeMin} />
      <input className="new-todo-form__timer" placeholder="Sec" autoFocus value={sec} onChange={onChangeSec} />

      <input className="new-todo-form__submit" type="submit" />
    </form>
  );
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;
