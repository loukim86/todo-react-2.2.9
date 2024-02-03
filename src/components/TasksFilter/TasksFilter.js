import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

const TasksFilter = ({ onToggleFilter, buttonsText, filter }) => {
  const buttons = buttonsText.map((text, i) => {
    let className = '';
    if (text === filter) {
      className = 'selected';
    }
    return (
      <li key={i}>
        <button className={className} onClick={() => onToggleFilter(i, text)}>
          {text}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

TasksFilter.defaultProps = {
  buttonsText: [],
  filter: 'All',
};

TasksFilter.propTypes = {
  onToggleFilter: PropTypes.func.isRequired,
  buttonsText: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TasksFilter;
