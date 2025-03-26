import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'
import ToDoCounter from '../footer-todo-counter/footer-todo-counter'
import FooterTaskFilter from '../footer-task-filter/footer-task-filter'
import ClearCompleted from '../footer-clear-completed/footer-clear-completed'

const TaskList = ({
  todos,
  onDeleted,
  toggleDone,
  startTimer,
  stopTimer,
  todosList,
  toggleEditMode,
  editingStates,
  setTimeValue,
  handleResetTimer,
  setNewTaskValue,
  itemLeftCounter,
  activeItem,
  completedItem,
  allItem,
  activeTab,
  deleteCompleted,
}) => {
  const renderTasks = () =>
    todos.map(({ id, createdAt, ...item }) => (
      <li key={id}>
        <Task
          {...item}
          createdAt={createdAt}
          onDeleted={onDeleted}
          toggleDone={toggleDone}
          id={id}
          startTimer={startTimer}
          stopTimer={stopTimer}
          todosList={todosList}
          toggleEditMode={toggleEditMode}
          editingStates={editingStates}
          setTimeValue={setTimeValue}
          handleResetTimer={handleResetTimer}
          setNewTaskValue={setNewTaskValue}
        />
      </li>
    ))

  return (
    <>
      <section className="main">
        <ul className="todo-list">{renderTasks()}</ul>
      </section>
      <footer className="footer">
        <ToDoCounter itemLeftCounter={itemLeftCounter} />
        <FooterTaskFilter
          activeItem={activeItem}
          completedItem={completedItem}
          allItem={allItem}
          activeTab={activeTab}
        />
        <ClearCompleted deleteCompleted={deleteCompleted} />
      </footer>
    </>
  )
}

TaskList.defaultProps = {
  todos: [],
  toggleDone: () => {},
  onDeleted: () => {},
  itemLeftCounter: () => {},
  activeItem: () => {},
  completedItem: () => {},
  allItem: () => {},
  activeTab: 'All',
  deleteCompleted: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  toggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  itemLeftCounter: PropTypes.func,
  activeItem: PropTypes.func,
  completedItem: PropTypes.func,
  allItem: PropTypes.func,
  activeTab: PropTypes.string,
  deleteCompleted: PropTypes.func,
}

export default TaskList
