import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

const TaskList = ({ todos, onDeleted, onEdit, onToggleDone, filter }) => {
  const filteredTodos = filterTodos(todos, filter);

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo, index) => (
        <Task
          key={index}
          done={todo.done}
          id={todo.id}
          onToggleDone={() => onToggleDone(todo.id)}
          onDeleted={() => onDeleted(todo.id)}
          onEdit={onEdit}
          string={todo.string}
          itemProps={todo}
        />
      ))}
    </ul>
  );
};

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'Active':
      return todos.filter((todo) => !todo.done);
    case 'Completed':
      return todos.filter((todo) => todo.done);
    default:
      return todos;
  }
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
