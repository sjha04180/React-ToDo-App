import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiSave } from "react-icons/fi";



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
  }, [])


  const saveToLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const toggleFinished = (params) => {
    setShowFinished(!ShowFinished)
  }




  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLocalStorage(newTodos)

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(newTodos)
    saveToLocalStorage(newTodos)

  }

  const handleAdd = (e) => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocalStorage(newTodos);

  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage(newTodos)


  }



  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 bg-stone-50 py-2 md:px-6 rounded-xl min-h-[80vh] ">
        <div className="title p-5 text-5xl font-bold text-gray-500 text-center">TODO LIST</div>
        <div className="main flex flex-col justify-center items-center">
          <div className="addTodo w-[86vw] md:w-[51vw] my-3">
            <h2 className=" text-xl md:text-lg font-bold pl-1 ">Add Task</h2>
            <div className='flex flex-col md:flex-row gap-5'>
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                placeholder="Enter your task..."
                className='bg-gray-200 rounded-md md:w-2xl p-4 md:p-3 '
              />
              <button
                onClick={() => {
                  if (todo.trim() === "") {
                    alert("⚠️ Please enter a task before saving!");
                    return;
                  }
                  handleAdd();
                }}
                className='bg-indigo-400 text-white flex items-center justify-center pl-4 pr-8  py-[8px] md:px-4 md:py-1 rounded-md hover:cursor-pointer hover:bg-indigo-700'
              >
                <span className=" text-3xl md:text-2xl">
                  <FiSave />
                </span>
              </button>
            </div>
          </div>

          <div className="display flex flex-col w-[80vw] md:w-[51vw] mx-0">
            <div className="flex items-center justify-between w-[80vw] md:w-[51vw] md:gap-5">
              <h2 className="text-xl md:text-lg font-bold">Your Todos</h2>
              <div className="flex gap-2 items-center">
                <input onChange={toggleFinished} type="checkbox" checked={ShowFinished} name="" id="" />Show Finished
              </div>
            </div>
            <div className="todos">
              {todos.length === 0 && <div className='text-center py-10 xl:px-60 xl:py-40 text-xl'>No tasks to display</div>}
              {todos.map(item => {

                return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex ml-0 gap-6 m-3 w-[80vw] md:w-[51vw] items-center justify-between">
                  <div className="flex gap-3 items-center justify-center">
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} id="" />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="btns flex gap-4">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-indigo-400 text-white px-4 py-1 rounded-md hover:cursor-pointer hover:bg-indigo-700'><FaEdit /></button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-indigo-400 text-white px-4 py-1 rounded-md hover:cursor-pointer hover:bg-indigo-700'><RiDeleteBin5Fill /></button>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
