import React from 'react'
import './footer-todo-counter.css'
import PropTypes from 'prop-types'

function ToDoCounter({ itemLeftCounter = () => {} }) {
  const space = ' '
  return (
    <span className="todo-count">
      {itemLeftCounter()}
      {space}
      items left
    </span>
  )
}

ToDoCounter.propTypes = {
  itemLeftCounter: PropTypes.func.isRequired,
}

export default ToDoCounter
