import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './task-header.css'

const TaskHeader = ({ addItem }) => {
  const [label, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (label.trim() === '') {
      setLabel('')
      return
    }

    addItem(label)
    setLabel('')
  }

  return (
    <form className="header" onSubmit={onSubmit}>
      <h1>Todos</h1>
      <label htmlFor="taskInput">
        ToDo
        <input
          id="taskInput"
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          onChange={onLabelChange}
          value={label}
        />
      </label>
    </form>
  )
}

TaskHeader.defaultProps = {
  addItem: () => {},
}

TaskHeader.propTypes = {
  addItem: PropTypes.func,
}

export default TaskHeader
