
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // localStorage se initial data load
  let [todolist, setTodolist] = useState(() => {
    const saved = localStorage.getItem("todolist")
    return saved ? JSON.parse(saved) : []
  })

  // localStorage update
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todolist))
  }, [todolist])

  let saveToDoList = (event) => {
    event.preventDefault()
    let toname = event.target.toname.value.trim()
    if (!toname) return

    // check duplicate
    if (!todolist.some(item => item.text === toname)) {
      let finalDolist = [...todolist, { text: toname, completed: false }]
      setTodolist(finalDolist)
      event.target.toname.value = ""
    } else {
      alert("ToDo Name Already Exists....")
    }
  }

  let list = todolist.map((item, index) => (
    <ToDoListItems
      key={index}
      indexNumber={index}
      item={item}
      todolist={todolist}
      setTodolist={setTodolist}
    />
  ))

  return (
    <div className='app-bg'>
      <div className='App'>
        <h1>ToDo List</h1>
        <form onSubmit={saveToDoList}>
          <input type='text' name='toname' />
          <button>Save</button>
        </form>
        <div className="outerDiv">
          <ul>{list}</ul>
        </div>
      </div>
    </div>
  )
}

export default App

function ToDoListItems({ item, indexNumber, todolist, setTodolist }) {
  let toggleStatus = () => {
    const newList = todolist.map((v, i) =>
      i === indexNumber ? { ...v, completed: !v.completed } : v
    )
    setTodolist(newList)
  }

  let deleteRow = (e) => {
    e.stopPropagation()
    const newList = todolist.filter((_, i) => i !== indexNumber)
    setTodolist(newList)
  }

  return (
    <li
      className={item.completed ? 'completetodo' : ''}
      onClick={toggleStatus}
    >
      {indexNumber + 1} {item.text}
      <span onClick={deleteRow}>&times;</span>
    </li>
  )
}
