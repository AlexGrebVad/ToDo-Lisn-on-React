import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './task-value-time.css'
import PropTypes from 'prop-types'

class TaskValueTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeAgo: formatDistanceToNow(new Date(props.createdAt), { addSuffix: true }),
    }
  }

  componentDidMount() {
    const { createdAt } = this.props
    this.intervalId = setInterval(() => {
      this.setState({
        timeAgo: formatDistanceToNow(new Date(createdAt), { addSuffix: true }),
      })
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { todoValue, activeClass, toggleDone, id } = this.props
    const { timeAgo } = this.state
    const space = ' '

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label>
        <span className={activeClass} onClick={() => toggleDone(id)}>
          {todoValue}
        </span>
        <span className="created">
          created
          {space + timeAgo}
        </span>
      </label>
    )
  }
}

TaskValueTime.defaultProps = {
  todoValue: ' ',
  activeClass: ' ',
  toggleDone: () => {},
  id: 0,
}

TaskValueTime.propTypes = {
  todoValue: PropTypes.string,
  activeClass: PropTypes.string,
  toggleDone: PropTypes.func,
  id: PropTypes.number,
}

export default TaskValueTime
