import { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import uuidv4 from "../node_modules/uuid/dist/v4"

const LOCAL_STORAGE_KEY = 'todo.todo'

function App() {
  const [todo, settodo] = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const localTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (localTodo) settodo(localTodo)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo))
  }, [todo])

  function toggleTodo(id){
    const currentTodo = [...todo]
    const ctodo = currentTodo.find(ctodo =>ctodo.id === id)
    ctodo.complete = !ctodo.complete
    settodo(currentTodo)

  }

  function handleAddtodo(e){
    const name = todoNameRef.current.value
    if (name === ""){
      return
    }
    else{
      console.log(name)
      settodo(prevtodo =>{ 
        return[...prevtodo, {id:uuidv4(), name:name, complete: true, }]
      })
      todoNameRef.current.value = null
    }
  }

  function handleCleartodo(e){
    settodo([])
  }

  function handleCompletetodo(){
    const newtodo = todo.filter(todo =>!todo.complete)
    settodo(newtodo)
  }



  return (
    <>
    <ToDoList todoList = {todo} toggletodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddtodo}> Add Todo</button>
    <button onClick={handleCleartodo}>  Clear ALL</button>
    <button onClick={handleCompletetodo}>  Clear Complete Todo</button>
    <div>{todo.filter(todo =>(!todo.complete)).length} Left to do</div>
    </>
  );
}

export default App;
