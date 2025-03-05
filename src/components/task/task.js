import React from 'react'
import PropTypes from 'prop-types'

import TaskEditTools from '../task-edit-tools/task-edit-tools'
import TaskValueTime from '../task-value-time/task-value-time'

function Task({
  label = 'text',
  done = false,
  onDeleted = () => {},
  toggleDone = () => {},
  id = 0,
  createdAt = () => {},
}) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={() => toggleDone(id)} />
      <TaskValueTime
        createdAt={createdAt}
        toggleDone={toggleDone}
        id={id}
        todoValue={label}
        activeClass={done ? 'completed' : 'usual'}
      />
      <TaskEditTools onDeleted={onDeleted} id={id} />
    </div>
  )
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.func.isRequired,
}

export default Task
