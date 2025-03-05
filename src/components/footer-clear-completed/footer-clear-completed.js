import React from 'react'
import PropTypes from 'prop-types'

function ClearCompleted({ deleteCompleted = () => {} }) {
  return (
    <button className="clear-completed" type="button" onClick={deleteCompleted}>
      Clear completed
    </button>
  )
}

ClearCompleted.propTypes = {
  deleteCompleted: PropTypes.func.isRequired,
}

export default ClearCompleted
