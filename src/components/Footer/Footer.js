import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

import './Footer.css';

const Footer = ({ toDo, onToggleFilter, clearCompleted, buttons, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter
        onToggleFilter={onToggleFilter}
        clearCompleted={clearCompleted}
        buttonsText={buttons}
        filter={filter}
      />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  toDo: 0,
  buttons: [],
  filter: 'All',
};

Footer.propTypes = {
  toDo: PropTypes.number.isRequired,
  onToggleFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Footer;
