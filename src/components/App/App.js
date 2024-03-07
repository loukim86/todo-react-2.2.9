import React, { useState } from 'react';
import { formatDistance } from 'date-fns';

import './App.css';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

const App = () => {
  let maxId = 0;

  const createTodoItem = (label, timeStamp, min = 0, sec = 0, done = false) => {
    const timerId = maxId++;

    return {
      label,
      done,
      edit: false,
      id: timerId,
      timeStamp,
      string: formatDistance(new Date(), timeStamp, { addSuffix: true }),
      timer: min * 60 + sec,
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem('Completed task', new Date(), true),
    createTodoItem('Editing task', new Date()),
    createTodoItem('Active Task', new Date()),
  ]);
  const buttons = ['All', 'Active', 'Completed'];
  const [filter, setFilter] = useState('All');

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, new Date(), min, sec);
    setTodoData((prevData) => [...prevData, newItem]);
  };

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const clearCompleted = () => {
    setTodoData((prevData) => prevData.filter((item) => !item.done));
  };

  const editItem = (id, label) => {
    setTodoData((prevData) => prevData.map((item) => (item.id === id ? { ...item, edit: !item.edit, label } : item)));
  };

  const toggleProperty = (arr, id, propName, label) => {
    const idx = arr.findIndex((el) => el.id === id);

    if (!label) {
      label = arr[idx].label;
    }

    const oldItem = arr[idx];

    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
      label: label,
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData((prevData) => toggleProperty(prevData, id, 'done'));
  };

  const onToggleFilter = (i, text) => {
    setFilter(text);
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteItem}
          onEdit={editItem}
          onToggleDone={onToggleDone}
          filter={filter}
        />
        <Footer
          toDo={todoCount}
          onToggleFilter={onToggleFilter}
          clearCompleted={clearCompleted}
          buttons={buttons}
          filter={filter}
        />
      </section>
    </section>
  );
};

export default App;
