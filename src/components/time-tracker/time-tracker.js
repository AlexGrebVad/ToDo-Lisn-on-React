import React from 'react'
import { format } from 'date-fns'
import './time-tracker.css'
import PropTypes from 'prop-types'

const TimeTracker = ({ todosList, startTimer, stopTimer, id, editingStates, setTimeValue, toggleEditMode }) => {
  const parseTime = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return format(new Date(0, 0, 0, 0, minutes, remainingSeconds), 'mm:ss')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSaveTime()
    }
  }

  const handleSaveTime = () => {
    const { inputTime } = editingStates[id] || { inputTime: '' }
    const timeInSeconds = parseTime(inputTime)

    if (!isNaN(timeInSeconds)) {
      setTimeValue(id, timeInSeconds)
      toggleEditMode(id, false)
    }
  }

  const task = todosList.find((task) => task.id === id)
  const timeValue = task ? task.timeValue : 0
  const { isEditing, inputTime } = editingStates[id] || { isEditing: false, inputTime: '' }

  return (
    <div className="description">
      <button className="play" onClick={task.done ? () => stopTimer(id) : () => startTimer(id)} disabled={task.done}>
        ▶
      </button>
      <button className="pause" onClick={() => stopTimer(id)}>
        ⏸
      </button>
      {isEditing ? (
        <input
          className="time-input"
          type="text"
          placeholder="мм:сс"
          value={inputTime}
          onChange={(e) => toggleEditMode(id, true, e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={task.done}
        />
      ) : (
        <span className="timer-text" onClick={() => toggleEditMode(id, true)}>
          {formatTime(timeValue)}
        </span>
      )}
    </div>
  )
}

TimeTracker.propTypes = {
  toggleEditMode: PropTypes.func.isRequired,
  setTimeValue: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  todosList: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  editingStates: PropTypes.object.isRequired,
}

export default TimeTracker
