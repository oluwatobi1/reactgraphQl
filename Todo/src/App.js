import { useState } from "react";
import ToDoList from "./ToDoList";

function App() {
  const [todo, settodo] = useState([{ id:1, name:'Todo 1', complete:false}])
  return (
    <>
    <ToDoList todoList = {todo}/>
    <input type="text"/>
    <button> Add Todo</button>
    <button> Clear Todo</button>
    <div>0 Left to do</div>
    </>
  );
}

export default App;
