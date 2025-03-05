import React from 'react'

import TaskHeader from '../task-header/task-header'
import TaskList from '../task-list/task-list'
import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  maxId = 100

  constructor(props) {
    super(props)
    this.state = {
      todoData: [],
      activeTab: 'All',
    }
  }

  itemLeftCounter = () => {
    const { todoData } = this.state
    return todoData.filter((el) => el.done === false).length
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, done: !oldItem.done }

      return {
        todoData: [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)],
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const deleteItem = todoData.findIndex((el) => el.id === id)
      return {
        todoData: todoData.toSpliced(deleteItem, 1),
      }
    })
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab })
  }

  getFilteredTasks = () => {
    const { todoData, activeTab } = this.state

    switch (activeTab) {
      case 'Active':
        return todoData.filter((task) => !task.done)
      case 'Completed':
        return todoData.filter((task) => task.done)
      default:
        return todoData
    }
  }

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoList = todoData.filter((element) => element.done === false)
      return {
        todoData: newTodoList,
      }
    })
  }

  addItem = (text) => {
    const newItem = {
      label: text,
      done: false,
      id: this.maxId,
      createdAt: new Date(),
    }

    this.maxId += 1

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  render() {
    const { activeTab, todoData } = this.state
    const filteredTasks = this.getFilteredTasks()

    return (
      <>
        <TaskHeader addItem={this.addItem} />
        <TaskList
          todosList={todoData}
          todos={filteredTasks}
          onDeleted={this.deleteItem}
          toggleDone={this.toggleDone}
          itemLeftCounter={this.itemLeftCounter}
          activeItem={() => this.setActiveTab('Active')}
          completedItem={() => this.setActiveTab('Completed')}
          allItem={() => this.setActiveTab('All')}
          activeTab={activeTab}
          deleteCompleted={this.deleteCompleted}
        />
      </>
    )
  }
}
