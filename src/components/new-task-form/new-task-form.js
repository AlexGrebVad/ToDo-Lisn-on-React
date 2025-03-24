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
      editingStates: {},
    }
    this.intervals = {} // Хранение интервалов таймера по ID задач
  }

  itemLeftCounter = () => {
    return this.state.todoData.filter((el) => !el.done).length
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    }))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.id !== id),
    }))
    if (this.intervals[id]) {
      clearInterval(this.intervals[id])
      delete this.intervals[id]
    }
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
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => !task.done),
    }))
  }

  addItem = (text) => {
    const newItem = {
      label: text,
      done: false,
      id: this.maxId++,
      createdAt: new Date(),
      timeValue: 0,
    }

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  setTimeValue = (id, time) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => (task.id === id ? { ...task, timeValue: time } : task)),
    }))
  }

  startTimer = (id) => {
    if (this.intervals[id]) return

    this.intervals[id] = setInterval(() => {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((task) => {
          if (task.id === id && task.timeValue > 0) {
            return { ...task, timeValue: task.timeValue - 1 }
          }
          if (task.id === id && task.timeValue === 0) {
            clearInterval(this.intervals[id])
            delete this.intervals[id]
          }
          return task
        }),
      }))
    }, 1000)
  }

  stopTimer = (id) => {
    if (this.intervals[id]) {
      clearInterval(this.intervals[id])
      delete this.intervals[id]
    }
  }

  toggleEditMode = (id, isEditing, inputTime = '') => {
    this.setState(({ editingStates }) => ({
      editingStates: {
        ...editingStates,
        [id]: {
          isEditing,
          inputTime,
        },
      },
    }))
  }

  handleResetTimer = (id) => {
    this.stopTimer(id)
    this.setTimeValue(id, 0)
  }

  setNewTaskValue = (id, todosList, newTaskValue = 'fuck') => {
    const changedTask = todosList.filter((elem) => elem.id === id).shift()
    changedTask.label = newTaskValue

    this.setState(({ todoData }) => ({
      todoData: todoData.map((elem) => {
        if (elem.id === id) {
          return (elem = changedTask)
        }
        return elem
      }),
    }))
  }

  render() {
    const { activeTab, todoData, editingStates } = this.state
    const filteredTasks = this.getFilteredTasks()

    return (
      <>
        <TaskHeader addItem={this.addItem} />
        <TaskList
          key={activeTab} // Принудительный рендеринг при переключении вкладок
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
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          setTimeValue={this.setTimeValue}
          toggleEditMode={this.toggleEditMode}
          editingStates={editingStates}
          handleResetTimer={this.handleResetTimer}
          setNewTaskValue={this.setNewTaskValue}
        />
      </>
    )
  }
}
