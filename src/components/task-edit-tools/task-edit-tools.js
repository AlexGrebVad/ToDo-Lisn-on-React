import React from 'react'
import PropTypes from 'prop-types'

function TaskEditTools({ onDeleted = () => {}, id = 0, stopTimer = () => {} }) {
  return (
    <>
      <button className="icon icon-edit" type="button" />
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

TaskEditTools.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

export default TaskEditTools
