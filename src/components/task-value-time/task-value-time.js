import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task-value-time.css'

import TimeTracker from '../time-tracker/time-tracker'

const TaskValueTime = ({
  todoValue,
  activeClass,
  toggleDone,
  id,
  startTimer,
  stopTimer,
  todosList,
  setTimeValue,
  toggleEditMode,
  editingStates,
  createdAt,
}) => {
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(createdAt), { addSuffix: true }))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(createdAt), { addSuffix: true }))
    }, 60000)

    return () => clearInterval(intervalId)
  }, [createdAt])

  return (
    <label>
      <span className={activeClass} onClick={() => toggleDone(id)}>
        {todoValue}
      </span>
      <TimeTracker
        startTimer={startTimer}
        stopTimer={stopTimer}
        setTimeValue={setTimeValue}
        todosList={todosList}
        id={id}
        toggleEditMode={toggleEditMode}
        editingStates={editingStates}
      />
      <span className="created">created {timeAgo}</span>
    </label>
  )
}

TaskValueTime.defaultProps = {
  todoValue: ' ',
  activeClass: ' ',
  toggleDone: () => {},
  id: 0,
  createdAt: new Date(),
}

TaskValueTime.propTypes = {
  todoValue: PropTypes.string,
  activeClass: PropTypes.string,
  toggleDone: PropTypes.func,
  id: PropTypes.number,
  createdAt: PropTypes.instanceOf(Date),
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  todosList: PropTypes.array.isRequired,
  setTimeValue: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  editingStates: PropTypes.object.isRequired,
}

export default TaskValueTime
