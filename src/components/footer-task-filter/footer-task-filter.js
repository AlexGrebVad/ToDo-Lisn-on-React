import React from 'react'
import './footer-task-filter.css'
import PropTypes from 'prop-types'

function FooterTaskFilter({
  activeItem = () => {},
  completedItem = () => {},
  allItem = () => {},
  activeTab = () => {},
}) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className={activeTab === 'All' ? 'selected' : ''} onClick={allItem}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={activeTab === 'Active' ? 'selected' : ''} onClick={activeItem}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className={activeTab === 'Completed' ? 'selected' : ''} onClick={completedItem}>
          Completed
        </button>
      </li>
    </ul>
  )
}

FooterTaskFilter.propTypes = {
  activeItem: PropTypes.func.isRequired,
  completedItem: PropTypes.func.isRequired,
  allItem: PropTypes.func.isRequired,
  activeTab: PropTypes.func.isRequired,
}
export default FooterTaskFilter
