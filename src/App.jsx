import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [editingId, setEditingId] = useState(null)

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

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
  }

  const handleedit = (e, id) => {
    let t = todos.find(i => i.id === id)
    setTodo(t.todo)
    setEditingId(id)
  }

  const handledelete = (e, id) => {
    setTodos(todos.filter(item => item.id !== id))
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    let newtodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(newtodos)
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#A08963] text-white m-4 p-4 rounded-2xl">
        <div className="addtodo mb-4">
          <h2 className='font-bold mb-1'>Add a ToDo</h2>
          <input 
            onChange={handlechange} 
            value={todo} 
            className='text-black w-96 h-7 rounded-2xl px-2' 
            type="text" 
          />
          <button 
            onClick={handleadd} 
            className='bg-[#C9B194] mx-2 px-2 rounded-lg transition-transform duration-200 hover:scale-105'
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
        <h2 className='font-bold'>Your ToDo(s)</h2>
        <div className="todos">
          {todos.length === 0 && <div className='mx-32 animate-pulse text-2xl'>No ToDos</div>}
          {todos.map((item) => {
            return <div key={item.id} className="todo my-2 flex w-1/4 justify-between">
              <div className='flex gap-4'>
                <input 
                  name={item.id} 
                  onChange={handlecheckbox} 
                  type="checkbox" 
                  checked={item.isCompleted} 
                />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button 
                  onClick={(e) => { handleedit(e, item.id) }} 
                  className='bg-[#C9B194] mx-2 px-2 rounded-lg transition-transform duration-200 hover:scale-105'
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => { handledelete(e, item.id) }} 
                  className='bg-[#C9B194] mx-2 px-2 rounded-lg transition-transform duration-200 hover:scale-105'
                >
                  Delete
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
