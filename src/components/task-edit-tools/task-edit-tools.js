import React, { useState, useRef } from 'react'
import './task-edit-tools.css'

function TaskEditTools({ onDeleted = () => {}, id = 0, stopTimer = () => {}, setNewTaskValue, todosList }) {
  const extractTaskValue = (id, todosList) => {
    const newInputValue = todosList.find((elem) => elem.id === id)
    return newInputValue.label
  }

  const [newInputValue, changedInputValue] = useState(extractTaskValue(id, todosList))
  const [inputClassNameToggle, setInputClassNameToggle] = useState(false)

  const inputRef = useRef(null)

  const toggleClassName = () => {
    setInputClassNameToggle((prev) => !prev)

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const handleInputChange = (event) => {
    changedInputValue(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      toggleClassName()
    }

    if (event.key === 'Enter') {
      setNewTaskValue(id, todosList, newInputValue)
      toggleClassName()
    }
  }

  return (
    <>
      <button className={'icon icon-edit'} type="button" onClick={() => toggleClassName()} />

      <input
        ref={inputRef}
        className={inputClassNameToggle ? 'newTaskValue' : ' newTaskValueDisabled'}
        type="text"
        placeholder="Write new task"
        value={newInputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button
        className="icon icon-destroy"
        type="button"
        onClick={() => {
          onDeleted(id)
          stopTimer(id)
        }}
      />
    </>
  )
}

export default TaskEditTools
