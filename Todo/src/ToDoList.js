import React from 'react'
import Todo from './todo'

export default function ToDoList({todoList, toggletodo}) {
    return (
        todoList.map(todo => {
            return <Todo key={todo.id} todo={todo} toggletodo={toggletodo}/>
        }) 
    )
}
