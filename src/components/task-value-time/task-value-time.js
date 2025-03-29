import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task-value-time.css'

const TaskValueTime = ({
  todoValue,
  activeClass,
  toggleDone,
  id,

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
