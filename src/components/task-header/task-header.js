import React from 'react'
import './task-header.css'
import PropTypes from 'prop-types'

export default class TaskHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { addItem } = this.props
    const { label } = this.state

    if (label.trim() === '') {
      this.setState({
        label: '',
      })
      return
    }
    addItem(label)

    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>Todos</h1>
        <label htmlFor="taskInput">
          ToDo
          <input
            id="taskInput"
            className="new-todo"
            placeholder="What needs to be done?"
            type="text"
            onChange={this.onLabelChange}
            value={label}
          />
        </label>
      </form>
    )
  }
}

TaskHeader.defaultProps = {
  addItem: () => {},
}

TaskHeader.propTypes = {
  addItem: PropTypes.func,
}
