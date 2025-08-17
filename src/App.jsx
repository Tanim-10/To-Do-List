import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
// import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])  //array that holds all the todos
  const [todo, setTodo] = useState("")    //individual todo
  const [editingId, setEditingId] = useState(null) // track which todo is being edited

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    }, [])
  

  const save = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleadd = () => {
    if (editingId) {
      let newtodos = todos.map(item =>
        item.id === editingId ? { ...item, todo } : item
      )
      setTodos(newtodos)
      setEditingId(null)  
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("")
    save()
  }

  const handleedit = (e, id) => {
    let t = todos.find(i => i.id === id)
    setTodo(t.todo)
    setEditingId(id)
    save()
  }

  const handledelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    save()
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    save()
  }


  return (
    <>
      <Navbar />
      <div className="bg-[#A08963] text-white m-4 p-4 rounded-2xl">
        <div className="addtodo mb-4">
          <h2 className='font-bold mb-1'>Add a ToDo</h2>
          <input onChange={handlechange} value={todo} className='text-black w-96 h-7 rounded-2xl px-2' type="text" />
          <button onClick={handleadd} className='bg-[#C9B194] mx-2 px-2 rounded-lg transition-transform duration-200 hover:scale-105'>{editingId ? "Update" : "Add"}</button>
        </div>
        <h2 className='font-bold'>Your ToDo(s)</h2>
        <div className="todos">
          {todos.length == 0 && <div className='mx-32 animate-pulse text-2xl'>No ToDos</div>}
          {todos.map((item) => {
            return <div key={item.id} className="todo my-2 flex w-1/4 justify-between">
              <div className='flex gap-4'>
                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleedit(e, item.id) }} className='bg-[#C9B194] mx-2 px-2 rounded-lg transition-transform duration-200 hover:scale-105'>Edit</button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-[#C9B194] mx-2 px-2 rounded-lg transition-transform duration-200 hover:scale-105'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App