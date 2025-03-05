import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'
import ToDoCounter from '../footer-todo-counter/footer-todo-counter'
import FooterTaskFilter from '../footer-task-filter/footer-task-filter'
import ClearCompleted from '../footer-clear-completed/footer-clear-completed'

export default class TaskList extends React.Component {
  ArrayOfToDoList = () => {
    const { todos, onDeleted, toggleDone } = this.props

    return todos.map((elem) => {
      const { id, createdAt, ...item } = elem
      return (
        <li key={id}>
          <Task {...item} createdAt={createdAt} onDeleted={onDeleted} toggleDone={toggleDone} id={id} />
        </li>
      )
    })
  }

  render() {
    const { itemLeftCounter, activeItem, completedItem, allItem, activeTab, deleteCompleted } = this.props
    return (
      <>
        <section className="main">
          <ul className="todo-list">{this.ArrayOfToDoList()}</ul>
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
}

TaskList.defaultProps = {
  todos: () => {},
  toggleDone: () => {},
  onDeleted: () => {},
  itemLeftCounter: () => {},
  activeItem: () => {},
  completedItem: () => {},
  allItem: () => {},
  activeTab: () => {},
  deleteCompleted: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.func,
  toggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  itemLeftCounter: PropTypes.func,
  activeItem: PropTypes.func,
  completedItem: PropTypes.func,
  allItem: PropTypes.func,
  activeTab: PropTypes.func,
  deleteCompleted: PropTypes.func,
}
