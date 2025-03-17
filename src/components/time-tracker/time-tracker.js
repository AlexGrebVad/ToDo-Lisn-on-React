import React from 'react'
import { format } from 'date-fns'
import './time-tracker.css'

export default class TimeTracker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { todosList, startTimer, stopTimer, id } = this.props

    const task = todosList.find((task) => task.id === id)

    const timeValue = task ? task.timeValue : 0

    const formatTime = (seconds) => {
      console.log(task)
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return format(new Date(0, 0, 0, 0, minutes, remainingSeconds), 'mm:ss')
    }

    return (
      <div className="description">
        <button className="play" onClick={task.done ? () => stopTimer(id) : () => startTimer(id)}>
          ▶
        </button>
        <button className="pause" onClick={() => stopTimer(id)}>
          ⏸
        </button>
        <span className="timer-text">{formatTime(timeValue)}</span>
      </div>
    )
  }
}
