import React, { useState, useRef } from 'react'

import TaskHeader from '../task-header/task-header'
import TaskList from '../task-list/task-list'
import './new-task-form.css'

const NewTaskForm = () => {
  const [todoData, setTodoData] = useState([])
  const [activeTab, setActiveTab] = useState('All')
  const [editingStates, setEditingStates] = useState({})
  const intervals = useRef({})
  let maxId = useRef(100)

  const itemLeftCounter = () => todoData.filter((el) => !el.done).length

  const toggleDone = (id) => {
    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id))

    if (intervals.current[id]) {
      clearInterval(intervals.current[id])
      delete intervals.current[id]
    }
  }

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'Active':
        return todoData.filter((task) => !task.done)
      case 'Completed':
        return todoData.filter((task) => task.done)
      default:
        return todoData
    }
  }

  const deleteCompleted = () => {
    setTodoData((prevData) => prevData.filter((task) => !task.done))
  }

  const addItem = (text) => {
    const newItem = {
      label: text,
      done: false,
      id: maxId.current++,
      createdAt: new Date(),
      timeValue: 0,
    }
    setTodoData((prevData) => [...prevData, newItem])
  }

  const setTimeValue = (id, time) => {
    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, timeValue: time } : task)))
  }

  const startTimer = (id) => {
    if (intervals.current[id]) return

    intervals.current[id] = setInterval(() => {
      setTodoData((prevData) =>
        prevData.map((task) => {
          if (task.id === id && task.timeValue > 0) {
            return { ...task, timeValue: task.timeValue - 1 }
          }
          if (task.id === id && task.timeValue === 0) {
            clearInterval(intervals.current[id])
            delete intervals.current[id]
          }
          return task
        })
      )
    }, 1000)
  }

  const stopTimer = (id) => {
    if (intervals.current[id]) {
      clearInterval(intervals.current[id])
      delete intervals.current[id]
    }
  }

  const toggleEditMode = (id, isEditing, inputTime = '') => {
    setEditingStates((prevState) => ({
      ...prevState,
      [id]: {
        isEditing,
        inputTime,
      },
    }))
  }

  const handleResetTimer = (id) => {
    stopTimer(id)
    setTimeValue(id, 0)
  }

  const setNewTaskValue = (id, todosList, newTaskValue = 'fuck') => {
    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, label: newTaskValue } : task)))
  }

  const filteredTasks = getFilteredTasks()

  return (
    <>
      <TaskHeader addItem={addItem} />
      <TaskList
        key={activeTab}
        todosList={todoData}
        todos={filteredTasks}
        onDeleted={deleteItem}
        toggleDone={toggleDone}
        itemLeftCounter={itemLeftCounter}
        activeItem={() => setActiveTab('Active')}
        completedItem={() => setActiveTab('Completed')}
        allItem={() => setActiveTab('All')}
        activeTab={activeTab}
        deleteCompleted={deleteCompleted}
        startTimer={startTimer}
        stopTimer={stopTimer}
        setTimeValue={setTimeValue}
        toggleEditMode={toggleEditMode}
        editingStates={editingStates}
        handleResetTimer={handleResetTimer}
        setNewTaskValue={setNewTaskValue}
      />
    </>
  )
}

export default NewTaskForm
