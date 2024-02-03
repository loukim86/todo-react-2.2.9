import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

const TaskList = (props) => {
  const { todos, onDeleted, onEdit, onToggleDone, filter } = props;

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        {...item}
        key={id}
        id={id}
        onDeleted={() => onDeleted(id)}
        onEdit={onEdit}
        onToggleDone={() => onToggleDone(id)}
        done={item.done}
        itemProps={itemProps}
      />
    );
  });

  const elementsDone = elements.filter((element) => {
    if (element) {
      return element.props.done;
    }
  });

  const elementsActive = elements.filter((element) => {
    if (element) {
      return !element.props.done;
    }
  });

  let arrayFiltetered;

  if (filter === 'Completed') {
    arrayFiltetered = elementsDone;
  } else if (filter === 'Active') {
    arrayFiltetered = elementsActive;
  } else {
    arrayFiltetered = elements;
  }

  return <ul className="todo-list">{arrayFiltetered}</ul>;
};

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TaskList;
